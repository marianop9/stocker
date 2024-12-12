package movements

import (
	"net/http"

	"github.com/marianop9/stocker/app/stocker"
)

type StockEntryDto struct {
	Id            string `json:"id"`
	MovementId    string `json:"movementId"`
	ProductUnitId string `json:"productUnitId"`
	Quantity      int    `json:"quantity"`
}

func RegisterMovementsHandlers(app *stocker.StockerApp) {
	app.AddCustomHandler(stocker.ModuleMovements, "createStockEntry", http.MethodPost, handleCreateStockEntry(app))

	app.AddCustomHandler(stocker.ModuleMovements, "{movementId}/close", http.MethodPost, handleCloseMovement(app))

	app.AddCustomHandler(stocker.ModuleMovements, "{movementId}", http.MethodDelete, handleAnnulMovement(app))
}
