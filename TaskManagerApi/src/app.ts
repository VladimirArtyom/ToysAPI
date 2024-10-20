import express,{Request, Response, Express, json} from 'express';
import router from './routes/tasks.js';
import dotenv from 'dotenv';
import notFound from './middleware/not_found.js';
dotenv.config()

const app: Express = express();

app.use(json());

app.use("/api/v1/tasks", router);
app.use(notFound);

const port = process.env.PORT || 8000;

async function start() {
    try {
        app.listen(port, () => {
            console.log(`Server is listening to port -  ${port}`)
        })

    } catch(error) {
        console.log(error)
    }

}

start();