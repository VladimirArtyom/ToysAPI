import { Request, Response } from "express";
function not_found(req: Request, res: Response) {
    res.status(404).json({
        message: `La route ${req.url} n'existe pas`
    });
}

export default not_found;