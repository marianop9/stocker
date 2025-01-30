package csv

import (
	"errors"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestWrappedRowError(t *testing.T) {
	inner := errors.New("inner error")

	wrapped := NewWrappedRowError(9, "wrapper error message", inner)
	base := NewRowError(9, "non-wrapped error message")

	t.Log(wrapped)
	t.Log(base)

	assert.ErrorIs(t, wrapped, inner)
	assert.NotErrorIs(t, base, inner)
}
