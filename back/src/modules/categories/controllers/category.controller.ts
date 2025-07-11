import { Request, Response, NextFunction } from "express";
import { CategoryDto } from "../dto/category.dto";
import { categoryService } from "../services/category.service";

export class CategoryController {
  async createCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categoryData: CategoryDto = req.body;

      if (!categoryData.title) {
        res.status(400).json({ message: "El campo 'title' es obligatorio." });
        return;
      }

      if (typeof categoryData.showInLanding !== "boolean") {
        res.status(400).json({
          message:
            "El campo 'showInLanding' es obligatorio y debe ser booleano.",
        });
        return;
      }

      const newCategory = await categoryService.createCategory(categoryData);

      res.status(201).json({
        message: "Categoría creada exitosamente",
        data: { category: newCategory },
      });
    } catch (error: any) {
      console.error("Error al crear la categoría:", error);
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
        res.status(200).json({
          message: "No hay categorías disponibles",
          categories: [],
        });
        return;
      }

      res.status(200).json({
        message: "Categorías obtenidas correctamente",
        categories,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error interno al recuperar categorías." });
    }
  }

  async getProductsByCategoryTitle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { title } = req.params;

    try {
      const category = await categoryService.getProductsByCategoryTitle(title);

      if (!category) {
        res
          .status(404)
          .json({ message: `No se encontró la categoría "${title}".` });
        return;
      }

      res.status(200).json({
        message: "Categoría y productos obtenidos correctamente",
        category,
        products: category.products,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error interno al obtener la categoría." });
    }
  }
  async getCategoryById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categoryId = req.params.id;

      if (!categoryId) {
        res.status(400).json({ message: "ID de categoria requerido" });
        return;
      }

      const category = await categoryService.getCategoryById(categoryId);

      if (!category) {
        res.status(404).json({ message: "categoria no encontrada" });
        return;
      }

      res.status(200).json({ category }); // ✅ Devuelve el producto correctamente
    } catch (error) {
      console.error("🚨 Error interno al recuperar la categoria:", error);
      res
        .status(500)
        .json({ message: "Error interno al recuperar la categoria." });
    }
  }
  async updateCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const categoryData = req.body;

      const updatedCategory = await categoryService.updateCategory(
        id,
        categoryData
      );

      if (!updatedCategory) {
        res.status(404).json({ message: "Categoria no encontrada" });
        return;
      }

      res.status(200).json({ category: updatedCategory });
    } catch (error) {
      console.error("🚨 Error al actualizar la categoria:", error);
      res
        .status(500)
        .json({ message: "Error interno al actualizar la categoria." });
    }
  }
}

export const categoryController = new CategoryController();
