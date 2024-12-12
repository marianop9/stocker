package utils

type CustomServiceResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

func NewServiceResponse(ok bool, msg string) CustomServiceResponse {
	return CustomServiceResponse{
		Success: ok,
		Message: msg,
	}
}

func NewSuccessResponseMessage(msg string) CustomServiceResponse {
	return NewServiceResponse(true, msg)
}

func NewSuccessResponse() CustomServiceResponse {
	return NewSuccessResponseMessage("")
}

func NewErrorResponseMessage(msg string) CustomServiceResponse {
	return NewServiceResponse(false, msg)
}

func NewErrorResponse(err error) CustomServiceResponse {
	return NewErrorResponseMessage(err.Error())
}