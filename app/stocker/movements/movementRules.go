package movements

import (
	"errors"
	"fmt"

	"github.com/pocketbase/pocketbase/core"
)

const (
	MovementTypeIn  = "IN"
	MovementTypeOut = "OUT"
	MovementTypeExchange = "EXCHANGE"
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

var ErrInvalidEntryMovement = errors.New("an entry movement should have at least one entry and no exits")
var ErrInvalidExitMovement = errors.New("an exit movement should have at least one exit and no entries")
var ErrInvalidExchangeMovement = errors.New("an exchange movement should have at least one entry and one exit")
/**
* An exchange movement should have at least one entry and one exit
*/
func validateMovementClose(movType string, entries, exits []*core.Record) error {
	switch movType {
	case MovementTypeIn:
		if len(entries) == 0 || len(exits) > 0 {
			return ErrInvalidEntryMovement
		}
	case MovementTypeOut:
		if len(exits) == 0 || len(entries) > 0 {
			return ErrInvalidEntryMovement
		}
	case MovementTypeExchange:
		if len(entries) == 0 || len(exits) == 0 {
			return ErrInvalidExchangeMovement
		}
	default:
		return ErrTypeUnknown
	}
	
	return nil
}
