//this form help u to created a new element in your request
import * as express from 'express';

declare module "jsonwebtoken"{
  export interface JwtPayload {
      id: string;
  }
}