import mongoose from "mongoose";
import { Status } from "../models/c_enum.js";

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        maxLength: 50,
        required: true,
    },

    position: {
        type: String,
        maxLength: 100,
        required: true,
    },

    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.pending,
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

export default mongoose.model("Job", JobSchema);
