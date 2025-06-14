import { Admin } from "../../modules/admins/entities/admin.entity";
import { AppDataSource } from "../data-source";

export const createDefaultAdmin = async () => {
  try {
    const adminRepository = AppDataSource.getRepository(Admin);

    // 🔍 Verificar si el admin ya existe
    const existingAdmin = await adminRepository.findOne({
      where: { email: "admin@example.com" },
    });

    if (!existingAdmin) {
      // 🏗️ Crear admin por defecto
      const defaultAdmin = adminRepository.create({
        name: "Administrador",
        email: "admin@example.com",
        password: "admin123",
      });

      await adminRepository.save(defaultAdmin);
      console.log("✅ Default admin created.");
    } else {
      console.log("🔍 Admin already exists, skipping seeding.");
    }
  } catch (error) {
    console.error("❌ Error during admin seeding:", error);
  }
};
