package stocker

import "github.com/labstack/echo/v5"

type Handler struct {
	module     string
	action     string
	httpMethod string
	handler    echo.HandlerFunc
}

func (h Handler) getEndpointPath() string {
	return h.module + "/" + h.action
}
