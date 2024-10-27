import APIError from "./api-error";
import { StatusCodes } from "http-status-codes";

export default class InternalServerError extends APIError {
    private statusCode: number;
    constructor(message: string) {
        super(message);
        this.message = message;
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
    
    getStatusCode(): number {
        return this.statusCode;
    }
    
    
}
