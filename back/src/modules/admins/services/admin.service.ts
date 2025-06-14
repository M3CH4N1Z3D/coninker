import { Repository } from "typeorm";
import { AppDataSource } from "../../../database/data-source";
import { Admin } from "../entities/admin.entity";
import jwt from "jsonwebtoken";

export class AuthService {
  private adminRepository: Repository<Admin>;

  constructor() {
    this.adminRepository = AppDataSource.getRepository(Admin);
  }

  async login(email: string, password: string): Promise<string> {
    const admin = await this.adminRepository.findOne({ where: { email } });

    if (!admin || admin.password !== password) {
      throw new Error("Invalid credentials");
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30d",
      }
    );

    return token;
  }
}

export const authService = new AuthService();
