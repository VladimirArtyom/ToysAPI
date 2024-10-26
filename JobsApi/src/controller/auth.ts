import {Request, Response} from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { BadRequestError, UnauthenticatedError } from "../error";
async function login(req: Request, res: Response) {
	const {email, password} = req.body;
	
	if (!email || !password) {
		throw new BadRequestError("Please provide email and password");
	}

	const user = await User.findOne({ email });
	if (!user) {
		throw new UnauthenticatedError("Nah, invalid, try again bro");
	}

	const isMatch = await user.comparePassword(password);
	if (!isMatch) {
		throw new UnauthenticatedError("Nah, invalid, try again bro");
	}

	const token = user.createJWT();
	res.status(StatusCodes.OK).json({
		user: {
			name: user.name,
		},
		token
	});
}

async function register(req: Request, res: Response) {
	const {name, email, password} = req.body;
	const user = await User.create({name, email, password});
	const token = user.createJWT();
	
	res.status(StatusCodes.CREATED).json({
		user: {
			name: user.name,
		},
		token: token,
	})

}

export {
	login,
	register
}
