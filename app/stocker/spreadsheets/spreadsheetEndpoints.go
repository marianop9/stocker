package spreadsheets

import (
	"fmt"
	"net/http"

	"github.com/marianop9/stocker/app/csv"
	"github.com/marianop9/stocker/app/stocker"
	"github.com/marianop9/stocker/app/stocker/utils"
	"github.com/pocketbase/pocketbase/core"
)

func RegisterSpreadsheetsHandlers(app *stocker.StockerApp) {
	app.AddCustomHandler("spreadsheets", "processProducts", http.MethodPost, func(e *core.RequestEvent) error {
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
		record.Set("output", contents)
		record.Set("state", "PENDINGs")

		if err := e.App.Save(record); err != nil {
			return e.JSON(http.StatusInternalServerError, utils.NewErrorResponse(err))
		}

		return e.JSON(http.StatusOK, utils.NewSuccessResponse())
	})
}
