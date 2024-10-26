import mongoose, { CallbackWithoutResultAndOptionalError } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {IUser} from '../interface/user_interfaces.js'
import { EnvConfig } from "../config/env_config";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
        ]
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    }
});
/**
 * 
UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});
 */

UserSchema.pre('save', async function(next: CallbackWithoutResultAndOptionalError) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        {
            userId: this._id,
            name: this.name
        },
        EnvConfig.JWT_SECRET,
        {
            expiresIn: EnvConfig.JWT_LIFETIME
        }
    )
}

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const isMatch: boolean = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
}

export default mongoose.model<IUser>("User", UserSchema);