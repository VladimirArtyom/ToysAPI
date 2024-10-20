import Task from "../models/Task.js";
import asyncwrapper from "../middleware/async.js";
import JoiTaskSchema from "../joi/JoiSchema.js";
import { CustomAPIError, createAPIError } from "../errors/custom_errors.js";
import { NextFunction, Request, Response } from "express";
import { ValidationResult } from "joi";

const getAllTasks = asyncwrapper(async function (req: Request, res: Response) {
    const tasks = await "getAllTask";//Task.find({});
    res.status(201).json({tasks});
});

const createTask = asyncwrapper(async function(req: Request, res: Response) {
    /*
    const result: ValidationResult = JoiTaskSchema.validate(req.body);
    if (result.error !== undefined) {
        
        res.status(400).json({
            error: result.error.details[0].message
        });
    }
    const task = await Task.create(req.body); 
    */
    const task = await "createTask";
    res.status(201).json(task);
});

const getTask = asyncwrapper(async function(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    const task = await Task.findOne({_id: id});;
    if (!task) {
        return next(createAPIError(`No task with id: ${id}`, 404));
    }
    res.status(200).json({
        task
    });
});

const patchTask = asyncwrapper(async function(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    const task = await Task.findOneAndUpdate({_id: id}, req.body, {
        new: true,
        runValidators: true
    });
    if (!task) {
        return next(createAPIError(`No task with id : ${id}`, 404));
    }
    res.status(200).json({
        task
    })
});

const deleteTask = asyncwrapper(async function(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    const task = await Task.findOneAndDelete({
        _id: id
    });
    if (!task) {
        return next(createAPIError(`No task with id: ${id}`, 404));
    }
    res.status(200).json({
        task
    })
    
});



export {
    getAllTasks,
    createTask,
    getTask,
    patchTask,
    deleteTask
}