import { AppDataSource } from "../../../database/data-source";
import { ConfigImage } from "../entities/configImage.entity";
import { UploadAppImageDto } from "../dto/configImage.dto";
import { Product } from "../../products/entities/product.entity";

export const configImageService = {
  async createImage(data: UploadAppImageDto) {
    const repository = AppDataSource.getRepository(ConfigImage);
    const imageEntity = repository.create(data);
    return await repository.save(imageEntity);
  },

  async getImagesByKey(key: string) {
    const repository = AppDataSource.getRepository(ConfigImage);
    return await repository.find({ where: { key }, relations: ["product"] });
  },

  async associateImageWithProduct(
    imageId: string,
    productId: string,
    order?: number
  ) {
    const imageRepo = AppDataSource.getRepository(ConfigImage);
    const productRepo = AppDataSource.getRepository(Product);

    const image = await imageRepo.findOne({ where: { id: imageId } });
    if (!image) throw new Error("Imagen no encontrada");

    const product = await productRepo.findOne({ where: { id: productId } });
    if (!product) throw new Error("Producto no encontrado");

    image.product = product;
    if (order !== undefined) image.order = order;

    return await imageRepo.save(image);
  },
};
