import { Request, Response, NextFunction } from "express";
import { productService } from "../services/product.service";
import { CreateProductDto } from "../dto/createProduct";

export class ProductController {
  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productData: CreateProductDto = req.body;

      // Basic validation (more comprehensive validation should be done using a library like class-validator)
      if (
        !productData.name ||
        !productData.description ||
        !productData.price ||
        !productData.images ||
        !productData.stock ||
        !productData.length ||
        !productData.height ||
        !productData.weight ||
        !productData.width ||
        // !productData.specifications ||
        // !productData.material ||
        !productData.colors ||
        !productData.isFeatured ||
        !productData.categories
      ) {
        res.status(400).json({ message: "Missing required fieldsssss" });
        return;
      }

      const newProduct = await productService.createProduct(productData);
      res.status(201).json({
        message: "Product created successfully",
        data: { product: newProduct },
      });
    } catch (error: any) {
      console.error("Error creating product:", error);
      next(error);
    }
  }
}

export const productController = new ProductController();
