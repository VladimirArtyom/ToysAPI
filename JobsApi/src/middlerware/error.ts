import {Request, Response, NextFunction } from 'express';
import { APIError } from '../error';

function errorHandler(error: any, req: Request, res: Response, next: NextFunction){
    console.log( typeof error);
    if (error instanceof APIError) {
        res.status(error.getStatusCode()).json({
            msg: error.message
        });
        return;
    }

    res.status(500).json({
        msg: "Nah the web server is trippin"
    });
    return;
}

export default errorHandler;
