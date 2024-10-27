import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

const validate = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            let out: string = ""
            error.details.forEach((err) => {
                out += "\n" + err.message
            })
            res.status(400).json({
                msg: out
            });
            return;
        }
        next();

    }
}

export {
    validate
}
