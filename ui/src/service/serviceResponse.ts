export type ServiceResponse<T> = ServiceSuccess<T> | ServiceError;

export class ServiceSuccess<T> {
    success: true;
    data: T;

    constructor(data: T) {
        this.success = true;
        this.data = data;
    }
}
export class ServiceError {
    success: false;
    error: ClientResponseError;

    constructor(error: ClientResponseError) {
        this.success = false;
        this.error = error;
    }
}

export type ClientResponseError = {
    url: string; // requested url
    status: number; // response status code
    response: PocketBaseError; // the API JSON error response
    isAbort: boolean; // is abort/cancellation error
    originalError: Error | null; // the original non-normalized error
};

export type PocketBaseError = {
    code: number;
    message: string;
    data: unknown;
};

function isClientResponseError(err: unknown): err is ClientResponseError {
    const error = err as ClientResponseError;

    return (
        error &&
        typeof error.isAbort === "boolean" &&
        typeof error.originalError === "object"
    );
}

// if service fails check if it is a pocketbase error, otherwise throw.
// if service executed succesfully, return the result
export async function executeService<T>(
    promise: Promise<T>,
): Promise<ServiceResponse<T>> {
    return promise
        .then((result) => new ServiceSuccess(result))
        .catch((error) => {
            if (isClientResponseError(error)) {
                const resp = new ServiceError(error);
                console.error(resp);
                return resp;
            } else {
                throw error;
            }
        });
}
