import { Request, Response, NextFunction } from "express";
import { CreateCategoryDto } from "../dto/category.dto";
import { categoryService } from "../services/category.service";

export class CategoryController {
  async createCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categoryData: CreateCategoryDto = req.body;

      // Basic validation (more comprehensive validation should be done using a library like class-validator)
      if (!categoryData.name) {
        res.status(400).json({ message: "Missing required fieldsssss" });
        return;
      }

      const newCategory = await categoryService.createCategory(categoryData);
      res.status(201).json({
        message: "Category created successfully",
        data: { category: newCategory },
      });
    } catch (error: any) {
      console.error("Error creating product:", error);
      next(error);
    }
  }

  async getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await categoryService.getAllCategories();

      if (categories.length === 0) {
        res
          .status(200)
          .json({ message: "No hay categorias disponibles", categories: [] });
        return;
      }

      res
        .status(200)
        .json({ message: "Categorias obtenidas correctamente", categories });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error interno al recuperar categorias." });
    }
  }
}

export const categoryController = new CategoryController();
