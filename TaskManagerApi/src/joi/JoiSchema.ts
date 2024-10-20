import Joi from "joi";

const JoiTaskSchema = Joi.object({
    name: Joi.string().max(20).required(),
    completed: Joi.boolean().default(false)
});

export default JoiTaskSchema;