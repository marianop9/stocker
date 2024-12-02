package stocker

import (
	"net/http"
	"testing"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/stretchr/testify/assert"
)

func TestAddCustomHandler(t *testing.T) {
	const (
		module = "testMod"
		action = "testAct"
		method = http.MethodPost
	)

	app := NewStockerApp(&pocketbase.PocketBase{})

	app.AddCustomHandler(module, action, method, func(e *core.RequestEvent) error { return nil })

	assert.Len(t, app.handlers, 1)

	handler := app.handlers[0]

	assert.Equal(t, module, handler.module)
	assert.Equal(t, action, handler.action)
	assert.Equal(t, method, handler.httpMethod)
}
