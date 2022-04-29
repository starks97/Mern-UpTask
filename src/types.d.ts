import { IUser } from "../src/models/User";
import express, { Request, Response, NextFunction } from "express";
import { ProjectProps } from "../src/models/Project";
import { TaskProps } from "../src/models/Task";

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export interface AuthUser extends express.Request {
  user: IUser;
  password?: IUser;
}

export interface ProjectType extends Express.Request {
  project?: TaskProps;
  owner: ProjectProps;
}

export interface TaskTypes<L extends ProjectProps>
  extends Express.Request,
    TaskProps {
  owner: L;
  project: L;
}
