import express, { Request, Response, NextFunction } from "express";
import UserModel, { IUser } from "../../models/User";
import generateId, {
  isValidPassword,
  setPassword,
} from "../../helpers/generateId";
import generateJWT from "../../helpers/generateJWT";
import { AuthUser, TypedRequestBody } from "../../types";
import { ErrorMessage, ErrorUserRegister } from "../../helpers/message";

type E = unknown;

const RegisterUser = async (
  req: TypedRequestBody<{ email: IUser }>,
  res: Response
): Promise<object> => {
  // Avoid duplicate resgister
  const currentUser = await UserModel.findOne({ email: req.body.email });

  if (currentUser) {
    return res.status(400).json({ statusCode: 400, msg: ErrorUserRegister });
  }

  try {
    const user = new UserModel(req.body);
    user.token = generateId();
    user.password = await setPassword(user.password);
    const setUserData = await user.save();
    res.json(setUserData);
  } catch (err: E) {
    console.log(err);
  }
};

async function AuthenticateUser(req: Request, res: Response): Promise<object> {
  const { email, password }: IUser = req.body;
  // check if the user exists
  const userExist = await UserModel.findOne({ email: email });
  if (!userExist) {
    return res.status(404).json({ statusCode: 404, msg: "the user not exits" });
  }
  // check if the user its already confirmend
  if (!userExist.confirm) {
    return res
      .status(403)
      .json({ statusCode: 403, msg: "Your account it hasn't been confirmed" });
  }

  // check the password if its correct
  if (await isValidPassword(password, userExist)) {
    res.json({
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
      token: generateJWT(userExist.id),
    });
  } else {
    return res
      .status(405)
      .json({ statusCode: 405, msg: "Your password its not correct" });
  }
}
// confirm user
async function ConfirmUser(req: Request, res: Response): Promise<object> {
  const { token } = req.params;
  const getToken = await UserModel.findOne({ token: token });
  if (!getToken) {
    return res.status(403).json({ statusCode: 403, msg: ErrorMessage });
  }
  try {
    getToken.confirm = true;
    getToken.token = " ";
    await getToken.save();
    res.status(200).json({ statusCode: 200, msg: "OK" });
  } catch (err: E) {
    console.log(err);
  }
}
// check if the user forgot their password
async function ForgotPassword(
  req: TypedRequestBody<{ email: IUser }>,
  res: Response
): Promise<object> {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ statusCode: 404, msg: "the user not exits" });
  }
  try {
    user.token = generateId();
  } catch (err: E) {
    console.log(err);
  }
}

async function AuthenticateToken(req: Request, res: Response): Promise<object> {
  const { token } = req.params;
  const getToken = await UserModel.findOne({ token: token });
  if (getToken) {
    res.status(200).json({ statusCode: 200, msg: "OK" });
  } else {
    return res.status(403).json({ statusCode: 403, msg: ErrorMessage });
  }
}

async function setNewPassword(
  req: Request & AuthUser,
  res: Response
): Promise<object> {
  const { token } = req.params;
  const { password }: IUser = req.body;
  const user = await UserModel.findOne({ token: token });
  if (user) {
    user.password = password;
    user.password = await setPassword(user.password);
    user.token = " ";
    user.save();
    res.status(200).json({ statusCode: 200, msg: "OK" });
  } else {
    return res.status(403).json({ statusCode: 403, msg: ErrorMessage });
  }
}
// checking profile
async function profile(req: AuthUser, res: Response): Promise<void> {
  const { user } = req;
  res.status(200).json({ statusCode: 200, msg: "OK", user });
}

export {
  RegisterUser,
  AuthenticateUser,
  ConfirmUser,
  ForgotPassword,
  AuthenticateToken,
  setNewPassword,
  profile,
};
