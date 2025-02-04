package spreadsheets

import (
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"slices"
	"strings"
	"sync"
	"time"

	"github.com/marianop9/stocker/app/csv"
	"github.com/marianop9/stocker/app/stocker"
	"github.com/marianop9/stocker/app/stocker/utils"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
)

const collectionProductSpreadsheetProcesses = "product_spreadsheet_processes"

const (
	productSpreadsheetProcessStateParsed    = "PARSED"
	productSpreadsheetProcessStateRunning   = "RUNNING"
	productSpreadsheetProcessStateCompleted = "COMPLETED"
	productSpreadsheetProcessStateFailed    = "FAILED"
	productSpreadsheetProcessStateCanceled  = "CANCELED"
)

func RegisterSpreadsheetsHandlers(app *stocker.StockerApp) {
	app.AddCustomHandler(stocker.ModuleSpreadsheets, "load", http.MethodPost, func(e *core.RequestEvent) error {
		e.Request.ParseMultipartForm(5 << 20) // 5MB

		description := e.Request.PostFormValue("description")

		file, _, err := e.Request.FormFile("productsSpreadsheet")
		if err != nil {
			return e.JSON(http.StatusInternalServerError, utils.NewErrorResponse(fmt.Errorf("failed to retrieve file: %w", err)))
		}
		defer file.Close()

		process := csv.NewProductSheetProcess(file)

		if err := process.ProcessCSV(); err != nil {
			return e.JSON(http.StatusInternalServerError, utils.NewErrorResponse(fmt.Errorf("failed to process file: %w", err)))
		}

		contents, err := process.ExportJSON()
		if err != nil {
			return e.JSON(http.StatusInternalServerError, utils.NewErrorResponse(fmt.Errorf("failed to export json: %w", err)))
		}

		// insert
		collection, err := e.App.FindCollectionByNameOrId("product_spreadsheet_processes")
		if err != nil {
			return e.JSON(http.StatusInternalServerError, utils.NewErrorResponse(err))
		}
		record := core.NewRecord(collection)

		record.Set("description", description)
		record.Set("data", contents)
		record.Set("state", productSpreadsheetProcessStateParsed)

		if err := e.App.Save(record); err != nil {
			return e.JSON(http.StatusInternalServerError, utils.NewErrorResponse(err))
		}

		return e.JSON(http.StatusOK, utils.NewSuccessResponse())
	})

	app.AddCustomHandler(stocker.ModuleSpreadsheets, "process/{id}", http.MethodPost, func(e *core.RequestEvent) error {
		recordId := e.Request.PathValue("id")
		if recordId == "" {
			return e.JSON(http.StatusBadRequest, utils.NewErrorResponseMessage("no id provided"))
		}

		record, err := e.App.FindRecordById(collectionProductSpreadsheetProcesses, recordId)
		if err != nil {
			return e.JSON(http.StatusBadRequest, utils.NewErrorResponse(fmt.Errorf("failed to retrieve record: %w", err)))
		}

		state := record.GetString("state")
		if state != productSpreadsheetProcessStateParsed && state != productSpreadsheetProcessStateFailed {
			return e.JSON(http.StatusBadRequest, utils.NewErrorResponseMessage("invalid process state"))
		}

		go processSpreadsheetRecord(e.App, record)

		return e.JSON(http.StatusOK, utils.NewSuccessResponse())
	})
}

/* New process states:
	- running
	- failed
* New colums:
	- error
	- executed (date) (on success)
*/

type (
	nameIdMap        map[string]string
	auxRecordsResult struct {
		key string
		m   nameIdMap
		err error
	}
)

func processSpreadsheetRecord(app core.App, record *core.Record) {
	logger := app.Logger().WithGroup("product-spreadsheet-process").With("id", record.Id)
	logger.Info("starting process")

	processStart := time.Now()

	products := make([]csv.ProductSheetDto, 0, 10)
	if err := record.UnmarshalJSONField("data", &products); err != nil {
		processSpreadsheetErrors(app, record, logger, fmt.Errorf("failed to unmarshall json: %w", err))
		return
	}

	// set execution time and update process state: 'processing'
	record.Set("executed", processStart.Format(time.RFC3339))
	record.Set("state", productSpreadsheetProcessStateRunning)
	record.Set("error", "")
	if err := app.Save(record); err != nil {
		processSpreadsheetErrors(app, record, logger, fmt.Errorf("failed to update process state: %w", err))
		return
	}

	// retrieve or create auxiliary product records (category, provider, etc)
	// opt 1: get all existing db records (even if not in json data) and create the new ones
	// opt 2: get all records in json data, retrieve the ids of existing ones and create new ones
	// going with opt 1

	chResult := make(chan auxRecordsResult, 3)
	wg := sync.WaitGroup{}

	// categories
	// clothing_types depend on categories, so they are processed in the same go routine
	wg.Add(1)
	go func() {
		defer wg.Done()

		collection := stocker.CollectionCategories

		categoryNameIds, err := getOrCreateRecords(app, collection, products, func(psd csv.ProductSheetDto) string { return psd.CategoryName })
		chResult <- auxRecordsResult{
			key: collection,
			m:   categoryNameIds,
			err: err,
		}

		clothingTypeNameIds, err := getOrCreateClothingTypes(app, products, categoryNameIds)
		chResult <- auxRecordsResult{
			key: stocker.CollectionClothingTypes,
			m:   clothingTypeNameIds,
			err: err,
		}
	}()

	// providers
	wg.Add(1)
	go func() {
		defer wg.Done()

		collection := stocker.CollectionProviders

		recordNameIds, err := getOrCreateRecords(app, collection, products, func(psd csv.ProductSheetDto) string { return psd.ProviderName })
		chResult <- auxRecordsResult{
			key: collection,
			m:   recordNameIds,
			err: err,
		}
	}()

	// materials
	wg.Add(1)
	go func() {
		defer wg.Done()

		collection := stocker.CollectionMaterials

		recordNameIds, err := getOrCreateRecords(app, collection, products, func(psd csv.ProductSheetDto) string { return psd.Material })
		chResult <- auxRecordsResult{
			key: collection,
			m:   recordNameIds,
			err: err,
		}
	}()

	// retrive or create auxiliary product_unit records
	// (there always is at least a variant for each product)
	productVariants := make([]*csv.ProductSheetVariantDto, 0, len(products))
	for i := range products {
		for j := range products[i].Variants {
			productVariants = append(productVariants, &products[i].Variants[j])
		}
	}

	// colors
	wg.Add(1)
	go func() {
		defer wg.Done()

		collection := stocker.CollectionColors

		recordNameIds, err := getOrCreateRecords(app, collection, productVariants, func(v *csv.ProductSheetVariantDto) string { return v.ColorName })
		chResult <- auxRecordsResult{
			key: collection,
			m:   recordNameIds,
			err: err,
		}
	}()

	// sizes
	wg.Add(1)
	go func() {
		defer wg.Done()

		collection := stocker.CollectionSizes

		recordNameIds, err := getOrCreateRecords(app, collection, productVariants, func(v *csv.ProductSheetVariantDto) string { return v.SizeName })
		chResult <- auxRecordsResult{
			key: collection,
			m:   recordNameIds,
			err: err,
		}
	}()

	go func() {
		wg.Wait()
		close(chResult)
	}()

	var (
		categoriesMap    nameIdMap
		providersMap     nameIdMap
		materialsMap     nameIdMap
		clothingTypesMap nameIdMap
		colorsMap        nameIdMap
		sizesMap         nameIdMap
	)

	errors := make([]error, 0)
	for result := range chResult {
		if result.err != nil {
			errors = append(errors, result.err)
			continue
		}

		switch result.key {
		case stocker.CollectionCategories:
			categoriesMap = result.m
		case stocker.CollectionProviders:
			providersMap = result.m
		case stocker.CollectionMaterials:
			materialsMap = result.m
		case stocker.CollectionClothingTypes:
			clothingTypesMap = result.m
		case stocker.CollectionColors:
			colorsMap = result.m
		case stocker.CollectionSizes:
			sizesMap = result.m
		}
	}
	if len(errors) > 0 {
		processSpreadsheetErrors(app, record, logger, errors...)
		return
	}

	// log.Printf("categories:\n\t%#v\n", categoriesMap)
	// log.Printf("providers:\n\t%#v\n", providersMap)
	// log.Printf("materials:\n\t%#v\n", materialsMap)
	// log.Printf("clothingTypes:\n\t%#v\n", clothingTypesMap)

	// insert product and product_units records
	productsColection, err := app.FindCollectionByNameOrId(stocker.CollectionProducts)
	if err != nil {
		processSpreadsheetErrors(app, record, logger, err)
		return
	}

	productUnitsCollection, err := app.FindCollectionByNameOrId(stocker.CollectionProductUnits)
	if err != nil {
		processSpreadsheetErrors(app, record, logger, err)
		return
	}

	// group product names by category
	productsByCategory := make(map[string][]interface{}, len(categoriesMap))
	for _, p := range products {
		name := normalizeName(p.Name)
		categoryId := categoriesMap[normalizeName(p.CategoryName)]

		productsByCategory[categoryId] = append(productsByCategory[categoryId], name)
	}

	// get existing products for each category
	existingProductsByCategory := make(map[string][]string)
	for categoryId, names := range productsByCategory {
		existingProducts, err := app.FindAllRecords(stocker.CollectionProducts, dbx.HashExp{
			"categoryId": categoryId,
			"name":       names,
		})

		if err != nil {
			processSpreadsheetErrors(app, record, logger, err)
			return
		}

		for _, existing := range existingProducts {
			existingProductsByCategory[categoryId] = append(existingProductsByCategory[categoryId], normalizeName(existing.GetString("name")))
		}
	}

	err = app.RunInTransaction(func(txApp core.App) error {
		for _, p := range products {
			name := normalizeName(p.Name)
			categoryId := categoriesMap[normalizeName(p.CategoryName)]

			if slices.Contains(existingProductsByCategory[categoryId], name) {
				continue
			}

			r := core.NewRecord(productsColection)
			r.Load(map[string]any{
				"name":           name,
				"description":    "",
				"categoryId":     categoryId,
				"providerId":     providersMap[normalizeName(p.ProviderName)],
				"sku":            "sku-todo",
				"unitCost":       p.UnitCost,
				"totalCost":      p.TotalCost,
				"cashPrice":      p.CashPrice,
				"retailPrice":    p.RetailPrice,
				"materialId":     materialsMap[normalizeName(p.Material)],
				"clothingTypeId": clothingTypesMap[normalizeName(p.ClothingType)],
			})

			if err := txApp.Save(r); err != nil {
				return fmt.Errorf("failed to save product '%s': %w", name, err)
			}
			productId := r.Id

			for _, variant := range p.Variants {
				rv := core.NewRecord(productUnitsCollection)
				rv.Load(map[string]any{
					"detail":    variant.Detail,
					"productId": productId,
					"colorId":   colorsMap[normalizeName(variant.ColorName)],
					"sizeId":    sizesMap[normalizeName(variant.SizeName)],
					"sku":       "todo",
					"quantity":  variant.AvailableQty,
				})

				if err := txApp.Save(rv); err != nil {
					return fmt.Errorf("failed to save variant for '%s': %w", name, err)
				}
			}
		}

		return err
	})

	if err != nil {
		processSpreadsheetErrors(app, record, logger, err)
		return
	}

	logger.Info("process completed succesfuly")
	// update process state: 'completed'
	record.Set("state", productSpreadsheetProcessStateCompleted)
	if err := app.Save(record); err != nil {
		processSpreadsheetErrors(app, record, logger, fmt.Errorf("failed to update process state (completed): %w", err))
		return
	}
}

func processSpreadsheetErrors(app core.App, record *core.Record, logger *slog.Logger, errors ...error) {
	logMessages := make([]string, 0, len(errors)+1)
	logMessages = append(logMessages, "process encountered errors:")
	for _, e := range errors {
		logMessages = append(logMessages, e.Error())
	}
		
	logger.Error(strings.Join(logMessages, "\n"))

	record.Set("state", productSpreadsheetProcessStateFailed)
	// should't exceed len of 300:
	// record.Set("error", errorMsg)

	if err := app.Save(record); err != nil {
		logger.Error("failed to set process error: " + err.Error())
	}

}

func insertRecord(name string, collection *core.Collection, app core.App) (string, error) {
	if name == "" {
		return name, errors.New("name cannot be blank") 
	}
	record := core.NewRecord(collection)
	record.Set("name", name)

	err := app.Save(record)
	return record.Id, err
}

func getOrCreateRecords[T any](
	app core.App,
	collectionName string,
	products []T,
	nameAccessor func(T) string) (nameIdMap, error) {

	records, err := app.FindAllRecords(collectionName)
	if err != nil {
		return nil, fmt.Errorf("%s query: %w", collectionName, err)
	}

	collection, err := app.FindCollectionByNameOrId(collectionName)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve collection '%s': %w", collectionName, err)
	}

	// map has at least len(records) keys
	m := make(nameIdMap, len(records))

	for _, r := range records {
		name := normalizeName(r.GetString("name"))
		m[name] = r.Id
	}

	for _, p := range products {
		name := normalizeName(nameAccessor(p))

		if _, exists := m[name]; !exists {
			id, err := insertRecord(name, collection, app)
			if err != nil {
				return nil, fmt.Errorf("(%s) failed to create record: %w", collectionName, err)
			}

			m[name] = id
		}
	}

	return m, nil
}

func getOrCreateClothingTypes(
	app core.App,
	products []csv.ProductSheetDto,
	categories nameIdMap,
) (nameIdMap, error) {
	collectionName := stocker.CollectionClothingTypes

	records, err := app.FindAllRecords(collectionName)
	if err != nil {
		return nil, fmt.Errorf("%s query: %w", collectionName, err)
	}

	collection, err := app.FindCollectionByNameOrId(collectionName)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve collection '%s': %w", collectionName, err)
	}

	// map has at least len(records) keys
	m := make(nameIdMap, len(records))

	for _, r := range records {
		name := normalizeName(r.GetString("name"))
		m[name] = r.Id
	}

	for _, p := range products {
		name := normalizeName(p.ClothingType)

		if _, exists := m[name]; !exists {
			categoryId := categories[normalizeName(p.CategoryName)]
			if categoryId == "" {
				return nil, fmt.Errorf("category id not found for '%s'", p.CategoryName)
			}

			record := core.NewRecord(collection)
			record.Set("name", name)
			record.Set("categoryId", categoryId)

			err := app.Save(record)
			if err != nil {
				return nil, fmt.Errorf("(%s) failed to create record: %w", stocker.CollectionClothingTypes, err)
			}

			m[name] = record.Id
		}
	}

	return m, nil
}

var normalizeName = strings.ToLower
