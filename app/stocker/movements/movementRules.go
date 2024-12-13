package movements

import (
	"fmt"
)

const (
	MovementTypeIn  = "IN"
	MovementTypeOut = "OUT"
)

const (
	MovementStateOpen     = "OPEN"
	MovementStateClosed   = "CLOSED"
	MovementStateAnnulled = "ANNULLED"
)

func checkStateTransition(prevState, newState string) error {
	invalidTransition := func(prev, new string) error {
		return fmt.Errorf("invalid movement state transition ('%s' -> '%s')", prev, new)
	}

	switch newState {
	case MovementStateOpen:
	case MovementStateClosed:
	case MovementStateAnnulled:
	default:
		return fmt.Errorf("new movement state is not recognized: '%s'", newState)
	}

	switch prevState {
	case MovementStateOpen:
		if newState != MovementStateClosed {
			return invalidTransition(prevState, newState)
		}
	case MovementStateClosed:
		if newState != MovementStateAnnulled {
			return invalidTransition(prevState, newState)
		}
	case MovementStateAnnulled:
		return invalidTransition(prevState, newState)
	}

	return nil
}
