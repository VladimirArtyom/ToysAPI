import mongoose, { Mongoose } from "mongoose";

function connectDB(uri: string): Promise<Mongoose> {
    return mongoose.connect(uri);
}

export default connectDB;