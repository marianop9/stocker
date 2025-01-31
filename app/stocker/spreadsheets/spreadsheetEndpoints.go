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

		file, _, err := e.Request.FormFile("productsSpreadSheet")
		if err != nil {
			return e.JSON(http.StatusInternalServerError, utils.NewErrorResponse(fmt.Errorf("failed to retrieve file: %w", err)))
		}
		defer file.Close()

		process := csv.NewProductSheetProcess(file)

		if err := process.ProcessCSV(); err != nil {
			return e.JSON(http.StatusInternalServerError, utils.NewErrorResponse(fmt.Errorf("failed to process file: %w", err)))
		}

		if err := process.ExportJSON(); err != nil {
			return e.JSON(http.StatusInternalServerError, utils.NewErrorResponse(fmt.Errorf("failed to export json: %w", err)))
		}

		return e.JSON(http.StatusOK, utils.NewSuccessResponse())
	})
}
