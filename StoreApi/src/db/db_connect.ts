import mongoose, { Mongoose } from "mongoose";

async function connectDB(uri: string): Promise<Mongoose> {
    return await mongoose.connect(uri);
}
export default connectDB;