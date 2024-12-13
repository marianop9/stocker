package stocker

import (
	"fmt"
	"log"
	"net/http"

	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/hook"
)

var defaultMiddleware []*hook.Handler[*core.RequestEvent] = []*hook.Handler[*core.RequestEvent]{
	apis.RequireAuth("users"),
}

type StockerApp struct {
	PbApp    core.App
	handlers []Handler
}

func NewStockerApp(pocketbaseApp core.App) *StockerApp {
	return &StockerApp{
		PbApp:    pocketbaseApp,
		handlers: []Handler{},
	}
}

func (sa *StockerApp) AddCustomHandler(module, action, httpMethod string, handler PbHandlerFunc) {
	sa.handlers = append(sa.handlers, Handler{
		module:     module,
		action:     action,
		httpMethod: httpMethod,
		handler:    handler,
	})
}

func (sa *StockerApp) RegisterCustomHandlers() {
	sa.PbApp.OnServe().BindFunc(func(e *core.ServeEvent) error {
		customRoutes := e.Router.Group("/api/custom/")

		customRoutes.Bind(defaultMiddleware...)

		for _, h := range sa.handlers {
			path := h.getEndpointPath()
			log.Printf("Registering custom endpoint: (%s) %s...\n", h.httpMethod, path)

			switch h.httpMethod {
			case http.MethodGet:
				customRoutes.GET(path, h.handler)
			case http.MethodPost:
				customRoutes.POST(path, h.handler)
			case http.MethodPut:
				customRoutes.PUT(path, h.handler)
			case http.MethodPatch:
				customRoutes.PATCH(path, h.handler)
			case http.MethodDelete:
				customRoutes.DELETE(path, h.handler)
			default:
				panic(fmt.Sprintf("failed to register custom handler: unsuported httpMethod '%s'", h.httpMethod))
			}
		}

		return e.Next()
	})
}
