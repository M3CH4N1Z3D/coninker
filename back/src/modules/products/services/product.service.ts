import { Repository, Not, In } from "typeorm";
import { AppDataSource } from "../../../database/data-source";
import { Product } from "../entities/product.entity";
import { CreateProductDto } from "../dto/createProduct";
import { Category } from "../../categories/entities/category.entity";

export class ProductService {
  private productRepository: Repository<Product>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  async createProduct(productData: CreateProductDto): Promise<Product> {
    try {
      const categoryEntities = await AppDataSource.getRepository(Category).find(
        {
          where: { name: In(productData.categories) },
        }
      );
      if (!categoryEntities.length) {
        throw new Error("No se encontraron la categorias");
      }
      const newProduct = this.productRepository.create({
        ...productData,
        categories: categoryEntities,
      });
      await this.productRepository.save(newProduct);
      console.log("Saved new machine to database:", newProduct);
      return newProduct;
    } catch (error) {
      console.error("Error saving product:", error);
      throw new Error("Failed to save product.");
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.find({ relations: ["categories"] }); // ✅ Se mantiene la relación con categorías
    } catch (error) {
      throw new Error("Error al recuperar productos.");
    }
  }
}

export const productService = new ProductService();
