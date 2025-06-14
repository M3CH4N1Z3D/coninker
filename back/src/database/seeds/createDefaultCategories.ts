import { Category } from "../../modules/categories/entities/category.entity";
import { AppDataSource } from "../data-source";

export const createDefaultCategories = async () => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);

    const defaultCategories = [
      { name: "Mesas" },
      { name: "Sillas" },
      { name: "Sofás" },
      { name: "Estanterías" },
      { name: "Iluminación" },
      { name: "Decoración" },
    ];

    for (const category of defaultCategories) {
      const existingCategory = await categoryRepository.findOne({
        where: { name: category.name },
      });
      if (!existingCategory) {
        await categoryRepository.save(category);
        console.log(`✅ Categoría creada: ${category.name}`);
      } else {
        console.log(
          `🔍 Categoría "${category.name}" ya existe, omitiendo creación.`
        );
      }
    }
  } catch (error) {
    console.error("❌ Error durante la creación de categorías:", error);
  }
};
