import express, { Request, Response, NextFunction } from "express";
import ProjectSchema, { ProjectProps } from "../../models/Project";
import { ErrorMessage, ErrorMessageFile } from "../../helpers/message";
import { AuthUser, ProjectType } from "../../types";

type E = unknown;

async function getProjects(
  req: Request & AuthUser,
  res: Response,
  next: NextFunction
): Promise<void> {
  const ObtainingProjects = await ProjectSchema.find()
    .where("owner")
    .equals(req.user);
  res.json(ObtainingProjects);
}

async function newProject(
  req: Request & AuthUser,
  res: Response,
  next: NextFunction
): Promise<object> {
  const project = new ProjectSchema(req.body) as ProjectProps;
  project.owner = req.user.id;
  try {
    const storeProject = await project.save();
    return res.json(storeProject);
  } catch (err: E) {
    console.log(err);
  }
}

async function getProject(
  req: Request & AuthUser & ProjectProps,
  res: Response,
  next: NextFunction
): Promise<object> {
  const { id } = req.params;
  const obtainingProject = (await ProjectSchema.findOne({
    _id: id,
  })) as ProjectProps;

  if (!obtainingProject) {
    return res.status(404).json(ErrorMessage);
  }
  if (obtainingProject.owner.toString() !== req.user.id.toString()) {
    return res.status(401).json(ErrorMessageFile);
  }

  return res.json(obtainingProject);
}

async function editProject(
  req: Request & AuthUser & ProjectProps,
  res: Response,
  next: NextFunction
): Promise<object> {
  const { id } = req.params;
  const editingProject = (await ProjectSchema.findOne({
    _id: id,
  })) as ProjectProps;

  if (!editingProject) {
    return res.status(404).json(ErrorMessage);
  }
  if (editingProject.owner.toString() !== req.user.id.toString()) {
    return res.status(401).json(ErrorMessageFile);
  }
  editingProject.name = req.body.name || editingProject.name;
  editingProject.description =
    req.body.description || editingProject.description;
  editingProject.date = req.body.date || editingProject.date;
  editingProject.client = req.body.client || editingProject.client;

  try {
    const setStoreProject = await editingProject.save();
    return res.json(setStoreProject);
  } catch (err) {
    console.log(err);
  }
}

async function deleteProject(
  req: Request & AuthUser & ProjectProps,
  res: Response,
  next: NextFunction
): Promise<object> {
  const { id } = req.params;
  const deletingProject = (await ProjectSchema.findOne({
    _id: id,
  })) as ProjectProps;

  if (!deletingProject) {
    return res.status(404).json(ErrorMessage);
  }
  if (deletingProject.owner.toString() !== req.user.id.toString()) {
    return res.status(401).json(ErrorMessageFile);
  }

  try {
    await deletingProject.deleteOne();
    return res
      .status(200)
      .json({ statusCode: 200, message: "Project deleted" });
  } catch (err) {
    console.log(err);
  }
}

async function addColoborator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {}

async function deleteColoborator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {}

async function getTask(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {}

export {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  addColoborator,
  deleteColoborator,
  getTask,
};
