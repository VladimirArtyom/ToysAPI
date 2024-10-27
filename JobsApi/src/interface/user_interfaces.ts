import { Document } from "mongoose"
import { Request } from "express"
import { JwtPayload } from "jsonwebtoken";

interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    comparePassword: (candidate_password: string) => Promise<Boolean>;
    createJWT: () => string;    
}

interface IUserPayload extends JwtPayload {
    userId: string;
    name: string;

}

interface IJobRequest extends Request{
    userId: string
}

export {
    IUser,
    IJobRequest,
    IUserPayload
}
