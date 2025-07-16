import { AppDataSource } from "../../../database/data-source";
import { ConfigImage } from "../entities/configImage.entity";
import { UploadHeroImageDto } from "../dto/configImage.dto";

export const configImageService = {
  async createImage(data: UploadHeroImageDto) {
    const repository = AppDataSource.getRepository(ConfigImage);
    const imageEntity = repository.create(data);
    return await repository.save(imageEntity);
  },

  async getImages() {
    const repository = AppDataSource.getRepository(ConfigImage);
    return await repository.find({ order: { created_at: "DESC" } });
  },
};
