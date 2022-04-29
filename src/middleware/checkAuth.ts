import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ErrorMessage } from "../helpers/message";
import { AuthUser } from "../types";
import UserModel from "../models/User";

type E = unknown;

async function checkAuth(
  req: AuthUser,
  res: Response,
  next: NextFunction
): Promise<object> {
  let token: string | number | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.decode(token) as JwtPayload;
      req.user = await UserModel.findOne({ _id: decoded.id }).select(
        "-password -confirm -token -createdAt -updatedAt -__v"
      );
    } catch (Err: E) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "it had been an error" });
    }
  }
  if (!token) {
    return res.status(401).json({ statusCode: 401, msg: ErrorMessage });
  }
  next();
}

export default checkAuth;
