class CustomAPIError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

function createAPIError(message: string, statusCode: number) {
    return new CustomAPIError(message, statusCode);
}

export {
    CustomAPIError,
    createAPIError
}

