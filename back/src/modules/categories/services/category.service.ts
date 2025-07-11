import { Repository, Not, In, IsNull } from "typeorm";
import { AppDataSource } from "../../../database/data-source";
import { Category } from "../../categories/entities/category.entity";
import { CategoryDto } from "../dto/category.dto";

export class CategoryService {
  private categoryRepository: Repository<Category>;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  async createCategory(categoryData: CategoryDto): Promise<Category> {
    try {
      const { parentId, ...rest } = categoryData;

      if (typeof rest.showInLanding !== "boolean") {
        throw new Error(
          "El campo 'showInLanding' es obligatorio y debe ser booleano."
        );
      }

      const newCategory = this.categoryRepository.create(rest);

      if (parentId) {
        const parentCategory = await this.categoryRepository.findOneBy({
          id: parentId,
        });
        if (!parentCategory) {
          throw new Error("Parent category not found.");
        }
        newCategory.parent = parentCategory;
      }

      await this.categoryRepository.save(newCategory);
      return newCategory;
    } catch (error) {
      console.error("Error saving category:", error);
      throw new Error("Failed to save category.");
    }
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: { parent: IsNull() }, // solo categorías raíz
      relations: ["children", "children.children"], // 👈 importante: carga subcategorías y sub-subcategorías
    });
  }

  async getProductsByCategoryTitle(title: string): Promise<Category | null> {
    try {
      return await this.categoryRepository
        .createQueryBuilder("category")
        .leftJoinAndSelect("category.products", "product")
        .leftJoinAndSelect("category.children", "children")
        .leftJoinAndSelect("category.parent", "parent")
        .where("unaccent(lower(category.title)) = unaccent(lower(:title))", {
          title,
        })
        .getOne();
    } catch (error) {
      throw new Error("Error al obtener la categoría por título.");
    }
  }
  async getCategoryById(id: string): Promise<Category | null> {
    try {
      if (!id) throw new Error("ID de categoria inválido");

      return await this.categoryRepository.findOne({
        where: { id },
        relations: ["children", "children.children"], // 👈 importante: carga subcategorías y sub-subcategorías
      });
    } catch (error) {
      console.error("🚨 Error al recuperar la categoria:", error);
      return null; // ✅ Devuelve `null` en lugar de lanzar un error para evitar bloqueos
    }
  }
  async updateCategory(
    id: string,
    categoryData: Partial<Category>
  ): Promise<Category | null> {
    try {
      // Separamos las propiedades que no queremos actualizar directamente
      const { image, ...filteredCategoryData } = categoryData;

      // Creamos un nuevo objeto con la información filtrada, y que incluya la propiedad 'images'
      const updateData: Partial<Category> & { image?: string } = {
        ...filteredCategoryData,
      };

      // Si se incluye "images" en el payload, filtramos duplicados
      if (image) {
        updateData.image = image;
      }

      // Actualizamos el producto con los datos filtrados (updateData)
      await this.categoryRepository.update(id, updateData);

      // Retornamos el producto actualizado (incluyendo relaciones si es necesario)
      return await this.categoryRepository.findOne({
        where: { id },
        relations: ["children", "children.children"],
      });
    } catch (error) {
      console.error("🚨 Error al actualizar la categoria:", error);
      return null;
    }
  }
}

export const categoryService = new CategoryService();
