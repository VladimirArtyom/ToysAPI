import { StatusCodes } from "http-status-codes";
import APIError from "./api-error.js";

class NotFoundError extends APIError {
    private statusCode: number;
    constructor(message: string) {
        super(message)
        this.message = message;
        this.statusCode = StatusCodes.NOT_FOUND;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}

export default NotFoundError;