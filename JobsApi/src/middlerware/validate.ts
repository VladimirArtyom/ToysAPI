import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

const validate = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({
            msg: error.details[0].message
        });
        next(error.details[0].message)
    }
    next();

    }
}

export {
    validate
}