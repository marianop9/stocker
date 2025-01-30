package movements

import (
	"net/http"

	"github.com/marianop9/stocker/app/stocker"
)

func RegisterMovementsHandlers(app *stocker.StockerApp) {
	app.AddCustomHandler(stocker.ModuleMovements, "createStockMovement", http.MethodPost, handleCreateStockMovement(app))

	app.AddCustomHandler(stocker.ModuleMovements, "{movementId}/close", http.MethodPost, handleCloseMovement(app))

	app.AddCustomHandler(stocker.ModuleMovements, "{movementId}", http.MethodDelete, handleAnnulMovement(app))
}
