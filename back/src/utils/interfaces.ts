import { Request } from "express";
export interface IAdmin {}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
  };
}
