package utils

func NewErrorResponse(err error) map[string]string {
	return map[string]string{
		"error": err.Error(),
	}
}

func NewErrorResponseString(s string) map[string]string {
	return map[string]string{
		"error": s,
	}
}
