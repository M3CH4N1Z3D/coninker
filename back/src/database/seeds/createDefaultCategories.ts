import { Category } from "../../modules/categories/entities/category.entity";
import { AppDataSource } from "../data-source";

export const createDefaultCategories = async () => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);

    const defaultCategories = [
      {
        title: "Mesas",
        image: "",
        description: "Mesas de comedor, centro y auxiliares para cada espacio",
      },
      {
        title: "Sillas",
        image: "",
        description: "Sillas ergonómicas y de diseño para tu hogar u oficina",
      },
      {
        title: "Sofás",
        image: "",
        description: "Confort y estilo para tu sala de estar",
      },
      {
        title: "Estanterías",
        image: "",
        description: "Soluciones de almacenamiento funcionales y decorativas",
      },
      {
        title: "Iluminación",
        image: "",
        description: "Lámparas y accesorios para crear la atmósfera perfecta",
      },
      {
        title: "Decoración",
        image: "",
        description: "Complementos que dan vida y personalidad a tu hogar",
      },
    ];

    for (const category of defaultCategories) {
      const existingCategory = await categoryRepository.findOne({
        where: { title: category.title },
      });
      if (!existingCategory) {
        await categoryRepository.save(category);
        console.log(`✅ Categoría creada: ${category.title}`);
      } else {
        console.log(
          `🔍 Categoría "${category.title}" ya existe, omitiendo creación.`
        );
      }
    }
  } catch (error) {
    console.error("❌ Error durante la creación de categorías:", error);
  }
};
