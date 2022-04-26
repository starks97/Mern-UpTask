import express, { Request, Response, NextFunction, response } from "express";
import TaskSchema, { TaskProps } from "../../models/Task";
import {
  ErrorMessage,
  ErrorMessageFile,
  ErrorTask,
} from "../../helpers/message";
import ProjectSchema, { ProjectProps } from "../../models/Project";
import { AuthUser, ProjectType, TaskTypes } from "../../types";

async function addNewTask(
  req: ProjectType & AuthUser & Request,
  res: Response,
  next: NextFunction
): Promise<object> {
  const { project } = req;
  const isProject = (await ProjectSchema.findOne({
    _id: project,
  })) as ProjectType;
  if (!isProject) {
    return res.status(404).json({
      statusCode: 404,
      msg: "You dont have the permission to add a new task",
    });
  }
  if (isProject.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ statusCode: 403, msg: ErrorMessageFile });
  }
  try {
    const setStoreTask = await TaskSchema.create(req.body);
    res.json(setStoreTask);
  } catch (err) {
    return res.status(404).json({
      statusCode: 404,
      msg: ErrorMessageFile,
    });
  }
}
async function getTask(
  req: Request & AuthUser & ProjectType,
  res: Response,
  next: NextFunction
): Promise<object> {
  const { id } = req.params;
  const task = (await TaskSchema.findOne({ _id: id }).populate(
    "project"
  )) as ProjectType;
  if (!task) {
    return res.status(404).json({
      statusCode: 404,
      msg: ErrorTask,
    });
  }
  if (task.project.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ statusCode: 403, msg: ErrorMessageFile });
  }

  return res.json(task);
}
async function updateTask(
  req: Request & AuthUser,
  res: Response,
  next: NextFunction
): Promise<object> {
  const { id } = req.params;
  const task = (await TaskSchema.findOne({ _id: id }).populate(
    "project"
  )) as TaskProps;
  if (!task) {
    return res.status(404).json({
      statusCode: 404,
      msg: ErrorTask,
    });
  }
  if (task.project.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ statusCode: 403, msg: ErrorMessageFile });
  }

  task.name = req.body.name || task.name;
  task.description = req.body.description || task.description;
  task.priority = req.body.priority || task.priority;
  task.date = req.body.date || task.date;

  try {
    const setStoreTask = await task.save();
    res.json(setStoreTask);
  } catch (err) {
    console.log(err);
  }
}
async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {}
async function changeStatusTask(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {}

export { addNewTask, getTask, updateTask, deleteTask, changeStatusTask };
