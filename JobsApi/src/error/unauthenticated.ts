import { StatusCodes } from "http-status-codes";
import APIError from "./api-error.js";

class UnauthenticatedError extends APIError {
    private statusCode: number;
    constructor(message: string) {
        super(message);
        this.message = message;
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}

export default UnauthenticatedError;

