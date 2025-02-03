package spreadsheets

import (
	"fmt"
	"log/slog"
	"net/http"
	"strings"
	"time"

	"github.com/marianop9/stocker/app/csv"
	"github.com/marianop9/stocker/app/stocker"
	"github.com/marianop9/stocker/app/stocker/utils"
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

		file, _, err := e.Request.FormFile("productsSpreadSheet")
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

func processSpreadsheetRecord(app core.App, record *core.Record) {
	logger := app.Logger().WithGroup("product-spreadsheet-process").With("id", record.Id)
	logger.Info("starting process")

	processStart := time.Now()

	products := make([]csv.ProductSheetDto, 0, 10)
	if err := record.UnmarshalJSONField("data", &products); err != nil {
		processSpreadsheetError(app, record, logger, fmt.Errorf("failed to unmarshall json: %w", err))
		return
	}

	// set execution time and update process state: 'processing'
	record.Set("executed", processStart.Format(time.RFC3339))
	record.Set("state", productSpreadsheetProcessStateRunning)
	record.Set("error", "")
	if err := app.Save(record); err != nil {
		processSpreadsheetError(app, record, logger, fmt.Errorf("failed to update process state: %w", err))
		return
	}

	// collection, err := app.FindCollectionByNameOrId(collectionProductSpreadsheetProcesses)
	// if err != nil {
	// 	processSpreadsheetError(app, record, logger, fmt.Errorf("failed to retrieve collection: %w", err))
	// 	return
	// }

	type nameIdMap map[string]string
	// retrieve or create auxiliary product records (category, provider, etc)
	// opt 1: get all db records and create the new ones
	// opt 2: get all records in json data, retrieve the ids of existing ones and create new ones
	// categories
	chCategories := make(chan nameIdMap)
	func() {
		records, err := app.FindAllRecords(stocker.CollectionCategories)
		if err != nil {
			processSpreadsheetError(app, record, logger, fmt.Errorf("categories query: %w", err))
		}

		collection, err := app.FindCollectionByNameOrId(stocker.CollectionCategories)
		if err != nil {
			processSpreadsheetError(app, record, logger, fmt.Errorf("failed to retrieve collection: %w", err))
		}

		m := make(nameIdMap, len(records))

		for _, r := range records {
			name := strings.ToLower(r.GetString("name"))
			m[name] = m[r.Id]
		}

		for _, p := range products {
			if _, exists := m[strings.ToLower(p.CategoryName)]; !exists {
				newRec := core.NewRecord(collection)
				// newRec.
			}
		}

		chCategories <- nameIdMap{}
	}()

	// providers
	// materials
	// clothing_types

	// retrive or create auxiliary product_unit records
	// colors
	// sizes

	// (TODO): Add fields to products table:
	// 	- 	UnitCost
	// 	- 	TotalCost
	// 	- 	CashPrice
	// 	- 	RetailPrice

	// insert product and product_units records
	// for _, p := range products {
	// 	r := core.NewRecord(collection)

	// 	// create map of record
	// 	pmap := map[string]any{
	// 		"name": p.Name,

	// 	}
	// }

	// update process state: 'completed'
}

func processSpreadsheetError(app core.App, record *core.Record, logger *slog.Logger, err error) {
	errorMsg := err.Error()
	logger.Error(errorMsg)

	record.Set("state", productSpreadsheetProcessStateFailed)
	// should't exceed len of 300:
	record.Set("error", errorMsg)

	if err := app.Save(record); err != nil {
		logger.Error("failed to set process error: %v", err)
	}
}
