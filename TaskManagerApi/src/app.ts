import express,{Request, Response, Express, json} from 'express';
import router from './routes/tasks.js';
import dotenv from 'dotenv';
import notFound from './middleware/not_found.js';
import connectDB from './db/connect.js';
import path from 'path';
const __dirname = path.dirname('./src/');
dotenv.config({path: path.resolve(__dirname, './src/.env')});

const app: Express = express();

app.use(json());

app.use("/api/v1/tasks", router);
app.use(notFound);

console.log(process.env.MONGO_URI);
const port = process.env.PORT || 8000;
const mongo_uri = process.env.MONGO_URI || "NAH";

async function start() {
    try {
        await connectDB(mongo_uri);
        app.listen(port, () => {
            console.log(`Server is listening to port -  ${port}`);
        })

    } catch(error) {
        console.log(error);
    }

}

start();