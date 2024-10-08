package stocker

import (
	"fmt"
	"log"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

var defaultMiddleware []echo.MiddlewareFunc = []echo.MiddlewareFunc{
	apis.RequireAdminOrRecordAuth("users"),
}

type StockerApp struct {
	PbApp    *pocketbase.PocketBase
	handlers []Handler
}

func NewStockerApp(pocketbaseApp *pocketbase.PocketBase) *StockerApp {
	return &StockerApp{
		PbApp:    pocketbaseApp,
		handlers: []Handler{},
	}
}

func (sa *StockerApp) AddCustomHandler(module, action, httpMethod string, handler echo.HandlerFunc) {
	sa.handlers = append(sa.handlers, Handler{
		module:     module,
		action:     action,
		httpMethod: httpMethod,
		handler:    handler,
	})
}

func (sa *StockerApp) RegisterCustomHandlers() {
	sa.PbApp.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		customRoutes := e.Router.Group("/api/custom/", defaultMiddleware...)

		for _, h := range sa.handlers {
			log.Printf("Registering custom endpoint: %s...\n", h.getEndpointPath())
			switch h.httpMethod {
			case http.MethodGet:
				customRoutes.GET(h.getEndpointPath(), h.handler)
			case http.MethodPost:
				customRoutes.POST(h.getEndpointPath(), h.handler)
			case http.MethodPut:
				customRoutes.PUT(h.getEndpointPath(), h.handler)
			case http.MethodPatch:
				customRoutes.PATCH(h.getEndpointPath(), h.handler)
			case http.MethodDelete:
				customRoutes.DELETE(h.getEndpointPath(), h.handler)
			default:
				panic(fmt.Sprintf("failed to register custom handler: unsuported httpMethod '%s'", h.httpMethod))
			}
		}

		return nil
	})
}
