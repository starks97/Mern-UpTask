import { IUser } from "../src/models/User";
import express, { Request, Response, NextFunction } from "express";
import { ProjectProps } from "../src/models/Project";
import {TaskProps} from '../src/models/Task';


export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export interface AuthUser extends express.Request {
  user: IUser;
  password?: IUser;
}


export interface ProjectType  extends Express.Request {
  project: ProjectProps;
  owner: ProjectProps;
}

export interface TaskTypes < L extends TaskProps> extends Express.Request {
  owner: L;
}





