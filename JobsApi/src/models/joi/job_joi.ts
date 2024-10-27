import Joi from "joi";
import { Status } from "../c_enum";

const JobRegisterSchema = Joi.object({
    company: Joi.string().max(50).required(),
    position: Joi.string().max(100).required(),
    status: Joi.string().valid(...Object.values(Status)).optional(),
    createdBy: Joi.string().required()
});

const JobUpdateSchema = Joi.object();

const JobDeleteSchema = Joi.object();


export {
    JobRegisterSchema,
    JobUpdateSchema,
    JobDeleteSchema
}
