import express from "express";
import {
  RegisterUser,
  AuthenticateUser,
  ConfirmUser,
  ForgotPassword,
  AuthenticateToken,
  setNewPassword,
  profile
} from "../controllers/auth/AuthController";
import checkAuth from "../middleware/checkAuth";

const AuthRouter = express.Router();


AuthRouter.post("/", RegisterUser);
AuthRouter.post("/login", AuthenticateUser);
AuthRouter.get("/confirm/:token", ConfirmUser);
AuthRouter.post("/forgotPassword", ForgotPassword);
AuthRouter.route("/forgotPassword/:token").get(AuthenticateToken).post(setNewPassword);

AuthRouter.get("/profile", checkAuth, profile);

export default AuthRouter;
