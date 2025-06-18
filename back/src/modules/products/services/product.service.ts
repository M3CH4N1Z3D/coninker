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
      // Separamos las propiedades que no queremos actualizar directamente
      const { categories, images, ...filteredProductData } = productData;

      // Creamos un nuevo objeto con la información filtrada, y que incluya la propiedad 'images'
      const updateData: Partial<Product> & { images?: string[] } = {
        ...filteredProductData,
      };

      // Si se incluye "images" en el payload, filtramos duplicados
      if (images && Array.isArray(images)) {
        updateData.images = Array.from(new Set(images));
      }

      // Actualizamos el producto con los datos filtrados (updateData)
      await this.productRepository.update(id, updateData);

      // Retornamos el producto actualizado (incluyendo relaciones si es necesario)
      return await this.productRepository.findOne({
        where: { id },
        relations: ["categories"],
      });
    } catch (error) {
      console.error("🚨 Error al actualizar el producto:", error);
      return null;
    }
  }

  async deleteProductImage(
    id: string,
    imageUrl: string
  ): Promise<Product | null> {
    try {
      // Se busca el producto
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        console.error("Producto no encontrado");
        return null;
      }
      // Se filtra el arreglo de imágenes removiendo la URL indicada
      const newImages = (product.images || []).filter(
        (img: string) => img !== imageUrl
      );
      // Se actualiza el producto con el nuevo arreglo de imágenes
      await this.productRepository.update(id, { images: newImages });
      // Se retorna el producto actualizado, incluyendo las relaciones necesarias
      return await this.productRepository.findOne({
        where: { id },
        relations: ["categories"],
      });
    } catch (error) {
      console.error("🚨 Error al eliminar la imagen del producto:", error);
      return null;
    }
  }
}

export const productService = new ProductService();
