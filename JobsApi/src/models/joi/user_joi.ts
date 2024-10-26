import Joi from "joi";

const UserRegisterSchema = Joi.object({
    name: Joi.string()
        .max(50)
        .min(3)
        .required(),

    email: Joi.string()
        .email().required(),

    password: Joi.string()
        .min(6)
        .required()

});

const UserLoginSchema = Joi.object({

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required()


})

export {
    UserRegisterSchema,
    UserLoginSchema
};