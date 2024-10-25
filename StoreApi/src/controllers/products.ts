import { Request, Response } from "express";
import Product from '../models/product.js'
import { QueryObject } from "../types/types.js";


async function getAllProductsStatic(req: Request, res: Response) {

    const products = await Product.find({ price: { $gt: 30 } })
        .sort('price')
    res.status(200).json({
        products,
        nbHits: products.length,
        url: req.url,
    })
}

async function getAllProducts(req: Request, res: Response) {
    const { featured, company, name, sort, fields, numericFilters, } = req.query as {
        featured?: string;
        company?: string;
        name?: string;
        fields?: string;
        sort?: string;
        numericFilters?: string;
    };

    const options: Array<string> = ["price", "rating"]
    const queryObject: QueryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    if (company) {
        queryObject["company"] = company;
    }

    if (name) {
        queryObject["name"] = { $regex: name, $options: 'i' };
    }

    if (numericFilters) {
        const operatorMap: { [key: string]: string } = {
            '>': '$gt',
            '<': '$lt',
            '>=': '$gte',
            '<=': '$lte',
            "=": '$eq',
        };
        const re = /\b(<|>|<=|>=|=)\b/g;
        const filters = numericFilters.replace(
            re,
            (match: string) => `<SEP>${operatorMap[match]}<SEP>`
        );
        type FieldOutput = [string, string, string]
        filters.split(",").forEach((item : string) => {
            const [field, operator, value]: FieldOutput = item.split("<SEP>")  as FieldOutput;
            if (options.includes(field)) {
                queryObject[field] = {
                    [operator]: Number(value)
                }
            }
        }); 
        /*
        console.log(queryObject);
        */

    } 
    let result = Product.find(queryObject);
    if (sort) {
        const sort_list = sort.split(',');
        const sort_keys: { [key: string]: any } = {}
        sort_list.forEach((item: string) => {
            sort_keys[item] = item.startsWith('-') ? -1 : 1;
        })

        result = result.sort(sort_keys);
    }

    if (fields) {
        const field_list = fields.split(',');
        result = result.select(field_list);
    }

    // Pagination
    let page = Number(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    
    let limit = Number(req.query.limit) || 10;
    limit = limit < 10 ? 10 : limit;

    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({
        products,
        "total": products.length
    });

}

export {
    getAllProductsStatic,
    getAllProducts
}
