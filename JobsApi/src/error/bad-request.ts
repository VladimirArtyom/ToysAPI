import APIError from "./api-error.js";
import { StatusCodes } from 'http-status-codes';

class BadRequestError extends APIError {
    private statusCode: number;
    constructor(message: string) {
        super(message);
        this.message = message;
        this.statusCode  = StatusCodes.BAD_REQUEST;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}

export default BadRequestError;