"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var ProjectController_1 = require("../controllers/ProjectController");
var express_1 = __importDefault(require("express"));
var checkAuth_1 = __importDefault(require("../middleware/checkAuth"));
var ProjectRoute = express_1.default.Router();
ProjectRoute.route("/")
  .get(checkAuth_1.default, ProjectController_1.getProjects)
  .post(checkAuth_1.default, ProjectController_1.newProject);
ProjectRoute.route("/:id")
  .get(checkAuth_1.default, ProjectController_1.getProject)
  .put(checkAuth_1.default, ProjectController_1.editProject)
  .delete(checkAuth_1.default, ProjectController_1.deleteProject);
ProjectRoute.post(
  "/add-coloborator/:id",
  checkAuth_1.default,
  ProjectController_1.addColoborator
);
ProjectRoute.post(
  "/delete-coloborator/:id",
  checkAuth_1.default,
  ProjectController_1.deleteColoborator
);
ProjectRoute.get(
  "/get-task/:id",
  checkAuth_1.default,
  ProjectController_1.getTask
);
exports.default = ProjectRoute;
//# sourceMappingURL=ProjectRoute.js.map
