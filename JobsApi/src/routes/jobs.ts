import express, {Router} from 'express';

import  { getJobs, getJob, createJob, updateJob, deleteJob } from '../controller/jobs.js';

const router: Router = express.Router();

router.get('/jobs', getJobs);
router.get('/jobs/:id', getJob);
router.post('/jobs', createJob);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

export default router;
