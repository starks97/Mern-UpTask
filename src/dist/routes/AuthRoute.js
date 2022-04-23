"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AuthController_1 = require("../controllers/auth/AuthController");
var checkAuth_1 = __importDefault(require("../middleware/checkAuth"));
var AuthRouter = express_1.default.Router();
AuthRouter.post("/", AuthController_1.RegisterUser);
AuthRouter.post("/login", AuthController_1.AuthenticateUser);
AuthRouter.get("/confirm/:token", AuthController_1.ConfirmUser);
AuthRouter.post("/forgotPassword", AuthController_1.ForgotPassword);
AuthRouter.route("/forgotPassword/:token").get(AuthController_1.AuthenticateToken).post(AuthController_1.setNewPassword);
AuthRouter.get("/profile", checkAuth_1.default, AuthController_1.profile);
exports.default = AuthRouter;
//# sourceMappingURL=AuthRoute.js.map