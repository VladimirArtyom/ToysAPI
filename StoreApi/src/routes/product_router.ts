import express, { Router } from 'express';
import { getAllProducts, getAllProductsStatic } from '../controllers/products.js';
const router: Router = express.Router();

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

export default router;