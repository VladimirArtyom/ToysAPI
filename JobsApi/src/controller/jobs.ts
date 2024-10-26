import {Request, Response} from "express";


async function createJob(req: Request, res: Response) {
	
	res.status(200).json({message: "create_job",
		'url': req.url,
	});
}


async function getJobs(req: Request, res: Response) {

	res.status(200).json({message: "get_jobs",
		'url': req.url,
	});
}

async function getJob(req: Request, res: Response) {

	res.status(200).json({message: "get_job",
		'url': req.url,
	});
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
