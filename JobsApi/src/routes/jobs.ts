import express, {Router} from 'express';
import { JobRegisterSchema } from '../models/joi/job_joi.js';
import  { getJobs, getJob, createJob, updateJob, deleteJob } from '../controller/jobs.js';
import { validate } from '../middlerware/validate.js';
import { authenticate } from '../middlerware/authenticate.js';

const router: Router = express.Router();

router.get('/jobs', authenticate, getJobs);
router.get('/jobs/:id',authenticate, getJob);
router.post('/jobs', authenticate, validate(JobRegisterSchema), createJob);
router.put('/jobs/:id',authenticate, updateJob);
router.delete('/jobs/:id', authenticate, deleteJob);

export default router;
