import express, { Router } from 'express';
import { login, register } from '../controller/auth.js';
import {validate} from '../middlerware/validate.js'
import {UserLoginSchema, UserRegisterSchema} from '../models/joi/user_joi.js';

const router: Router = express.Router();

router.post('/login', validate(UserLoginSchema), login);
router.post('/register', validate(UserRegisterSchema), register);

export default router;
