package stocker

import (
	"github.com/pocketbase/pocketbase/core"
)

type Handler struct {
	module     string
	action     string
	httpMethod string
	handler    PbHandler
}

func (h Handler) getEndpointPath() string {
	return h.module + "/" + h.action
}

type PbHandler func(e *core.RequestEvent) error

type StockerHandlerBuilder func(app *StockerApp) PbHandler
