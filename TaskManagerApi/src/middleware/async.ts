import { Request, Response, NextFunction } from "express";
function asyncwrapper(fn: Function) {
    return async(req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        }catch(error) {
            return next(fn)
        }
    }
}

export default asyncwrapper;