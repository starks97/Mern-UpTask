import {
  addNewTask,
  getTask,
  updateTask,
  deleteTask,
  changeStatusTask,
} from "../controllers/task/TaskController";
import express from "express";
import checkAuth from "../middleware/checkAuth";

const TaskRoute = express.Router();

TaskRoute.post("/", checkAuth, addNewTask);
TaskRoute.route("/:id")
  .get(checkAuth, getTask)
  .put(checkAuth, updateTask)
  .delete(checkAuth, deleteTask);
TaskRoute.route("/:status/id").put(checkAuth, changeStatusTask);

export default TaskRoute;
