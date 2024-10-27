import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IJobRequest, IUserPayload } from "../interface/user_interfaces";
import { UnauthenticatedError } from "../error";
import { EnvConfig } from "../config/env_config";

function authenticate(req: Request, res: Response, next: NextFunction) {
    const authorization: string | undefined = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        res.status(401).json({
            msg: new UnauthenticatedError("Authentication invalid"),
        });
        return;
    } else {
        const token = authorization.split(" ")[1];
        try {
            const result: IUserPayload =  jwt.verify(token, EnvConfig.JWT_SECRET) as IUserPayload; 
            const user_id = result.userId;

            (req as IJobRequest).userId = user_id;
            next();

        }catch (error) {
            res.status(401).json({
                msg: new UnauthenticatedError("Authentication invalid")
            });
            return;
        }
    }

}

export{authenticate};
