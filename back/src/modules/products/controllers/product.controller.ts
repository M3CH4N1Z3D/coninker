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

      console.log(
        "📢 Datos de `categories` en el controlador ANTES de procesar:",
        productData.categories
      );

      // ✅ Extraer solo los IDs con una conversión segura
      const categoryIds: string[] = productData.categories.map(
        (category) => category.id
      );

      console.log("📢 `categories` después de procesar:", categoryIds);

      const formattedProductData: CreateProductDto = {
        ...productData,
        categories: categoryIds, // 🔥 Declaramos explícitamente como `string[]`
      };

      const newProduct = await productService.createProduct(
        formattedProductData
      );

      res.status(201).json({
        message: "Product created successfully",
        data: { product: newProduct },
      });
    } catch (error: any) {
      console.error("🚨 Error en el controlador:", error);
      next(error);
    }
  }

  async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products = await productService.getAllProducts();

      if (products.length === 0) {
        res
          .status(200)
          .json({ message: "No hay productos disponibles", products: [] });
        return;
      }

      res
        .status(200)
        .json({ message: "Productos obtenidos correctamente", products });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error interno al recuperar productos." });
    }
  }
  async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productId = req.params.id;

      if (!productId) {
        res.status(400).json({ message: "ID de producto requerido" });
        return;
      }

      const product = await productService.getProductById(productId);

      if (!product) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
      }

      res.status(200).json({ product }); // ✅ Devuelve el producto correctamente
    } catch (error) {
      console.error("🚨 Error interno al recuperar el producto:", error);
      res
        .status(500)
        .json({ message: "Error interno al recuperar el producto." });
    }
  }
  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const productData = req.body;

      const updatedProduct = await productService.updateProduct(
        id,
        productData
      );

      if (!updatedProduct) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
      }

      res.status(200).json({ product: updatedProduct });
    } catch (error) {
      console.error("🚨 Error al actualizar el producto:", error);
      res
        .status(500)
        .json({ message: "Error interno al actualizar el producto." });
    }
  }
}

export const productController = new ProductController();
