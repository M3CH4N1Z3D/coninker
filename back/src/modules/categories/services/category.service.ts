import { Repository, Not, In } from "typeorm";
import { AppDataSource } from "../../../database/data-source";
import { Category } from "../../categories/entities/category.entity";
import { CreateCategoryDto } from "../dto/category.dto";

export class CategoryService {
  private categoryRepository: Repository<Category>;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    try {
      const newCategory = this.categoryRepository.create(categoryData);
      await this.categoryRepository.save(newCategory);
      return newCategory;
    } catch (error) {
      console.error("Error saving category:", error);
      throw new Error("Failed to save category.");
    }
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      throw new Error("Error al recuperar categorias.");
    }
  }
}

export const categoryService = new CategoryService();
