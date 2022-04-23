import {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  addColoborator,
  deleteColoborator,
  getTask,
} from "../controllers/project/ProjectController";
import express from "express";
import checkAuth from "../middleware/checkAuth";

const ProjectRoute = express.Router();

ProjectRoute.route("/").get(checkAuth, getProjects).post(checkAuth, newProject);
ProjectRoute.route("/:id")
  .get(checkAuth, getProject)
  .put(checkAuth, editProject)
  .delete(checkAuth, deleteProject);

ProjectRoute.post("/add-coloborator/:id", checkAuth, addColoborator);
ProjectRoute.post("/delete-coloborator/:id", checkAuth, deleteColoborator);
ProjectRoute.get("/get-task/:id", checkAuth, getTask);

export default ProjectRoute;
