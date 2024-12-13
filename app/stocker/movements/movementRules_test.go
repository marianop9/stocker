package movements

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCheckStateTransition(t *testing.T) {
	assert.Error(t, checkStateTransition(MovementStateClosed, "someState"))

	assert.Error(t, checkStateTransition(MovementStateOpen, MovementStateAnnulled))

	assert.Error(t, checkStateTransition(MovementStateClosed, MovementStateOpen))

	assert.Error(t, checkStateTransition(MovementStateAnnulled, MovementStateOpen))
	assert.Error(t, checkStateTransition(MovementStateAnnulled, MovementStateClosed))
}
