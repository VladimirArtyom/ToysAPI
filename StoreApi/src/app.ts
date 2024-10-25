import express, {Express, json} from "express";
import dotenv from 'dotenv';
import path from 'path';
import not_found from "./middleware/not_found.js";
import product_router from "./routes/product_router.js"
import connectDB from "./db/db_connect.js";

const dirname = path.dirname("./src/");
dotenv.config({path: path.resolve(dirname, "./src/.env")});

const app: Express = express();
app.use(json());
app.use("/api/v1/products", product_router);

// Middleware pour plus tard
app.use(not_found)

const port: number = parseInt(process.env.PORT as string, 10) || 8080;
const mongo_uri: string = process.env.MONGO_URI as string
function start() {
    try {
        app.listen(port, async ()=> {
            await connectDB(mongo_uri);
            console.log(`Server is listening to ${port}`);
        });

    } catch(err) {
            console.log(err);
    }
}

start();