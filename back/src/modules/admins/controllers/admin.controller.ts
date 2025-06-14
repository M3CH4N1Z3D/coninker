import { Request, Response, NextFunction } from "express";
import { authService } from "../services/admin.service";

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      const token = await authService.login(email, password);
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
