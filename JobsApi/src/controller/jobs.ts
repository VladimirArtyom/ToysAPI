import {NextFunction, Request, Response} from "express";

import Job from "../models/Job";
import { StatusCodes } from "http-status-codes";
import InternalServerError from "../error/internal-server-error";
import { NotFoundError } from "../error";
import { IJobRequest } from "../interface/user_interfaces";

async function createJob(req: Request, res: Response, next: NextFunction) {
	const {company, position, status} = req.body;
	const input = {
		company,
		position,
		status,
		createdBy: (req as IJobRequest).userId
	};
	try {
		const job = await Job.create(input);

		if (!job) {
			throw new InternalServerError("Something went wrong");
		}
		res.status(StatusCodes.CREATED).json({message: "create_job", job});
	}
	catch (err) {
		next(err);
	}

}

async function getJobs(req: Request, res: Response) {
	const createdBy: string = (req as IJobRequest).userId;
	

	const jobs = await Job.find({createdBy}).sort("createdBy");

	res.status(StatusCodes.OK).json({
		message: "get_jobs", jobs,
		length: jobs.length,
	});

}

async function getJob(req: Request, res: Response, next: NextFunction) {

	const {
		params: {id: job_id},
	} = (req as IJobRequest);
	try {
		const job = await Job.findOne({_id: job_id, createdBy: (req as IJobRequest).userId});
		if (!job) {
			throw new NotFoundError("Job not found");
		}

		res.status(StatusCodes.OK).json({job});
	} catch (error) {
		next(error);
	}

}

async function updateJob(req: Request, res: Response) {
	res.status(200).json({message: "update_job",
		'url': req.url,
	});

}

async function deleteJob(req: Request, res: Response) {

	res.status(200).json({message: "delete_job",
		'url': req.url,
	});
}
	

export {
	createJob,
	getJob,
	getJobs,
	updateJob,
	deleteJob
}
