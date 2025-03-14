package stocker

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/pocketbase/pocketbase/core"
)

// var defaultMiddleware []*hook.Handler[*core.RequestEvent] = []*hook.Handler[*core.RequestEvent]{
// 	apis.RequireAuth("_superusers", "users"),
// }

// copia del middleware apis.RequireAuth de PocketBase
// "github.com/pocketbase/pocketbase/apis"
// func customRequireAuth(optCollectionNames ...string) func(*core.RequestEvent) error {
// 	return func(e *core.RequestEvent) error {
// 		log.Printf("auth record: %#v\n\n", e.Auth)

// 		// if strings.HasPrefix(e.Request.URL.Path, "/_/") {
// 		// 	return e.Next()
// 		// }

// 		// if strings.Contains(e.Request.URL.Path, "auth-with-password") {
// 		// 	return e.Next()
// 		// }

// 		// if e.Auth == nil {
// 		// 	return e.UnauthorizedError("The request requires valid record authorization token.", nil)
// 		// }

// 		// // check record collection name
// 		// if len(optCollectionNames) > 0 && !slices.Contains(optCollectionNames, e.Auth.Collection().Name) {
// 		// 	return e.ForbiddenError("The authorized record is not allowed to perform this action.", nil)
// 		// }

// 		return e.Next()
// 	}
// }

const (
	CollectionSuperusers = core.CollectionNameSuperusers
	collectionUsers      = "users"
)

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
		// e.Router.BindFunc(customRequireAuth("_superusers", "users"))
		e.Router.BindFunc(func(e *core.RequestEvent) error {
			requestPath := e.Request.URL.Path

			if strings.HasPrefix(requestPath, "/_/") ||
				strings.HasPrefix(requestPath, "/api/collections/"+collectionUsers) ||
				strings.HasPrefix(requestPath, "/api/collections/"+CollectionSuperusers) {
				return e.Next()
			}

			// cache only GET requests
			if e.Request.Method == http.MethodGet {
				e.Response.Header().Add("Cache-Control", "max-age=30")
			}

			return e.Next()
		})

		customRoutes := e.Router.Group("/api/custom/")
		// customRoutes.Bind(defaultMiddleware...)

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
