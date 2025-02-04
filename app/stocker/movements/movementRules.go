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
	// this state doesn't get saved since the record is erased from the db
	MovementStateDeleted = "DELETED"
)

func checkStateTransition(prevState, newState string) error {
	invalidTransition := func(prev, new string) error {
		return fmt.Errorf("invalid movement state transition ('%s' -> '%s')", prev, new)
	}

	isAllowed := func(state string, allowedStates ...string) bool {
		for _, allowed := range allowedStates {
			if allowed == state {
				return true
			}
		}
		return false
	}

	switch newState {
	case MovementStateOpen:
	case MovementStateClosed:
	case MovementStateAnnulled:
	case MovementStateDeleted:
	default:
		return fmt.Errorf("new movement state is not recognized: '%s'", newState)
	}

	switch prevState {
	case MovementStateOpen:
		if !isAllowed(newState, MovementStateClosed, MovementStateDeleted) {
			return invalidTransition(prevState, newState)
		}
	case MovementStateClosed:
		if !isAllowed(newState, MovementStateAnnulled) {
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
