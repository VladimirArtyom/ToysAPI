import  express, { Express, json} from 'express';
import jobRouter from './routes/jobs.js';
import authRouter from './routes/auth.js';
import { EnvConfig } from './config/env_config.js';
import connectDB from './db/connect.js';


const app: Express = express();
const port: number = EnvConfig.PORT;
app.use(json());
app.use('/api/v1/auth/',authRouter);
app.use('/api/v1/job/',jobRouter);

app.listen(port, async () => {
	await connectDB(EnvConfig.MONGO_URI);
	console.log(`Server started on port ${port}`);
});

