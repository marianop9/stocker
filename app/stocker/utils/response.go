package utils

func NewErrorResponse(err error) map[string]string {
	return NewErrorResponseString(err.Error())
}

func NewErrorResponseString(s string) map[string]string {
	return map[string]string{
		"message": s,
	}
}
