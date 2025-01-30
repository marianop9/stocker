package csv

import "fmt"

type RowError struct {
	row   int
	msg   string
	inner error
}

func (e RowError) Error() string {
	if e.inner != nil {
		return fmt.Sprintf("(row %d) %s - %v", e.row, e.msg, e.inner)
	}

	return fmt.Sprintf("(row %d) %s", e.row, e.msg)
}

func (e RowError) Unwrap() error {
	return e.inner
}

func NewWrappedRowError(row int, msg string, originalErr error) error {
	return RowError{
		row:   row,
		msg:   msg,
		inner: originalErr,
	} // return fmt.Errorf("(row %d) %s: %w", row, msg, originalErr)
}

func NewRowError(row int, msg string) error {
	return NewWrappedRowError(row, msg, nil)
}
