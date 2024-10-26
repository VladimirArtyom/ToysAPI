import { Document } from "mongoose"

interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    comparePassword: (candidate_password: string) => Promise<Boolean>;
    createJWT: () => string;    
}

export {
    IUser
}
