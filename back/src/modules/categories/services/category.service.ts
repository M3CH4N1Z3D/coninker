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
}

export const categoryService = new CategoryService();
