import { Category } from "../../modules/categories/entities/category.entity";
import { AppDataSource } from "../data-source";

export const createDefaultCategories = async () => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);

    const findOrCreate = async (
      title: string,
      description: string,
      image: string,
      parent?: Category
    ): Promise<Category> => {
      let category = await categoryRepository.findOne({
        where: { title },
      });

      if (!category) {
        category = categoryRepository.create({
          title,
          description,
          image,
          parent,
        });
        await categoryRepository.save(category);
        console.log(`✅ Categoría creada: ${title}`);
      } else {
        console.log(`🔍 Categoría ya existe: ${title}`);
      }

      return category;
    };

    // Categorías raíz
    const mobiliario = await findOrCreate(
      "MOBILIARIO",
      "Muebles para el hogar",
      "",
      undefined
    );
    const objetos = await findOrCreate(
      "OBJETOS",
      "Objetos decorativos y funcionales",
      "",
      undefined
    );

    // Subcategorías de MOBILIARIO
    const mesas = await findOrCreate(
      "Mesas",
      "Mesas para diferentes espacios",
      "",
      mobiliario
    );
    await findOrCreate(
      "Mesas de centro",
      "Mesas de centro para sala",
      "",
      mesas
    );
    await findOrCreate(
      "Mesas auxiliares",
      "Mesas pequeñas de apoyo",
      "",
      mesas
    );
    await findOrCreate("Mesas de noche", "Mesas para dormitorio", "", mesas);

    await findOrCreate(
      "Sillas",
      "Sillas ergonómicas y de diseño",
      "",
      mobiliario
    );
    await findOrCreate("Poltronas", "Sillones individuales", "", mobiliario);
    await findOrCreate(
      "Sofás",
      "Confort y estilo para tu sala",
      "",
      mobiliario
    );
    await findOrCreate(
      "Butaco",
      "Asientos altos y funcionales",
      "",
      mobiliario
    );
    await findOrCreate(
      "Zapateros",
      "Almacenamiento para calzado",
      "",
      mobiliario
    );
    await findOrCreate(
      "Muebles TV",
      "Muebles para equipos multimedia",
      "",
      mobiliario
    );
    await findOrCreate("Consola", "Consolas decorativas", "", mobiliario);
    await findOrCreate(
      "Bife",
      "Muebles bife para comedor o sala",
      "",
      mobiliario
    );
    await findOrCreate(
      "Escritorios",
      "Escritorios para oficina o estudio",
      "",
      mobiliario
    );
    await findOrCreate(
      "Bares",
      "Muebles para bar y entretenimiento",
      "",
      mobiliario
    );
    await findOrCreate(
      "Muebles Auxiliares",
      "Complementos funcionales",
      "",
      mobiliario
    );

    // Subcategorías de OBJETOS
    await findOrCreate("Base Monitor", "Soportes para monitores", "", objetos);
    await findOrCreate("Candelabros", "Decoración con velas", "", objetos);
    await findOrCreate("Porta Vinos", "Almacenamiento para vinos", "", objetos);
    await findOrCreate(
      "Repisas",
      "Repisas decorativas y funcionales",
      "",
      objetos
    );
    await findOrCreate(
      "Bandejas",
      "Bandejas para servir o decorar",
      "",
      objetos
    );
  } catch (error) {
    console.error("❌ Error durante la creación de categorías:", error);
  }
};
