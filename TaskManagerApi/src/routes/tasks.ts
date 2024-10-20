import express from "express";
import { getAllTasks, createTask, getTask, deleteTask, patchTask } from "../controller/controller.js";

const router: express.Router = express.Router();

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(patchTask).delete(deleteTask);

export default router;