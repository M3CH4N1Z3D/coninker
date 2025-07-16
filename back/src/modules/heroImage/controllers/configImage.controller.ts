import { Request, Response, NextFunction } from "express";
import { UploadHeroImageDto } from "../dto/configImage.dto";
import { configImageService } from "../services/configImage.service"; // Asegurate que esta exportación exista

export class ConfigImageController {
  async configHeroImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const imageData: UploadHeroImageDto = req.body;
      const { name, key, description, image } = imageData;

      if (!image || !key) {
        res.status(400).json({ message: "Faltan datos obligatorios" });
        return;
      }

      const newImage = await configImageService.createImage({
        name,
        key,
        description,
        image,
      });

      res.status(201).json({ image: newImage });
    } catch (err) {
      console.error("Error al guardar imagen:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  async getHeroImages(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const images = await configImageService.getImages(); // método para obtener las hero images
      res.status(200).json({ images });
    } catch (err) {
      console.error("Error al obtener imágenes:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  // 🔧 Puedes seguir agregando otros métodos aquí para object-images, etc.
}
export const configImageController = new ConfigImageController();
