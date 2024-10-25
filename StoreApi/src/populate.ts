import connectDB from './db/db_connect.js';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/product.js';
const dirname = path.dirname("./src")
dotenv.config({path: path.resolve(dirname, "./src/.env") });

import json_product from './json_product.json';

async function populate(url: string) {
    try {
        await connectDB(url);
        await Product.deleteMany();
        await Product.create(json_product);
        console.log("Operation was succesfully executed");
        
    }catch(error) {
        console.log(error);
    }finally {
        await mongoose.connection.close();
        console.log("Database Connection closed");
    }
}

populate(process.env.MONGO_URI as string);
