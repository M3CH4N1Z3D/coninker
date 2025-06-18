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
      // ✅ Validar que `categories` solo contiene string (UUIDs)
      if (
        !Array.isArray(productData.categories) ||
        productData.categories.some((cat) => typeof cat !== "string")
      ) {
        console.error(
          "⚠️ Error: `categories` aún tiene objetos en lugar de solo IDs",
          productData.categories
        );
        throw new Error("Las categorías deben ser solo IDs (string[]).");
      }

      // 🔄 Buscar categorías en la base de datos solo por ID
      const categoryEntities = await AppDataSource.getRepository(Category).find(
        {
          where: { id: In(productData.categories) }, // ✅ Aquí ya debe haber solo IDs
        }
      );

      if (!categoryEntities.length) {
        throw new Error(
          "No se encontraron las categorías en la base de datos."
        );
      }

      const newProduct = this.productRepository.create({
        ...productData,
        categories: categoryEntities, // ✅ Asigna las categorías encontradas
      });

      await this.productRepository.save(newProduct);
      console.log(
        "✅ Saved new product to database without errors:",
        newProduct
      );
      return newProduct;
    } catch (error) {
      console.error("🚨 Error saving product:", error);
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

  async getProductById(id: string): Promise<Product | null> {
    try {
      if (!id) throw new Error("ID de producto inválido");

      return await this.productRepository.findOne({
        where: { id },
        relations: ["categories"], // 🔥 Incluye las categorías relacionadas
      });
    } catch (error) {
      console.error("🚨 Error al recuperar el producto:", error);
      return null; // ✅ Devuelve `null` en lugar de lanzar un error para evitar bloqueos
    }
  }
  async updateProduct(
    id: string,
    productData: Partial<Product>
  ): Promise<Product | null> {
    try {
      // Elimina `categories` del objeto para que no se incluya en la actualización
      const { categories, ...filteredProductData } = productData;

      await this.productRepository.update(id, filteredProductData);

      return await this.productRepository.findOne({
        where: { id },
        relations: ["categories"],
      });
    } catch (error) {
      console.error("🚨 Error al actualizar el producto:", error);
      return null;
    }
  }
}

export const productService = new ProductService();
