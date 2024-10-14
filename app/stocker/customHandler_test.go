package stocker

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetEndpointPath(t *testing.T) {
	const (
		module = "mod"
		action = "act"
	)

	h := Handler{
		module:     module,
		action:     action,
		httpMethod: "",
		handler:    nil,
	}

	expected := "mod/act"

	assert.Equal(t, expected, h.getEndpointPath())
}
