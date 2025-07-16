import { Request, Response, NextFunction } from "express";
import { UploadAppImageDto } from "../dto/configImage.dto";
import { configImageService } from "../services/configImage.service"; // Asegurate que esta exportación exista

export class ConfigImageController {
  async configHeroImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const imageData: UploadAppImageDto = req.body;
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

  async configObjectImages(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, key, description, images } = req.body;

      if (!images || !Array.isArray(images) || images.length === 0 || !key) {
        res.status(400).json({ message: "Faltan datos obligatorios" });
        return;
      }

      const savedImages = await Promise.all(
        images.map((url: string) =>
          configImageService.createImage({ name, key, description, image: url })
        )
      );

      res.status(201).json({ images: savedImages });
    } catch (err) {
      console.error("Error al guardar imágenes:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
  async getImagesByKey(req: Request, res: Response): Promise<void> {
    try {
      const { key } = req.params;
      const images = await configImageService.getImagesByKey(key);

      res.status(200).json({ images });
    } catch (err) {
      console.error("Error al obtener imágenes por key:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
  async associateImageWithProduct(req: Request, res: Response): Promise<void> {
    try {
      const { imageId, productId, order } = req.body;

      // Validación básica
      if (!imageId || !productId) {
        res
          .status(400)
          .json({ message: "Faltan datos obligatorios: imageId o productId" });
        return;
      }

      const updatedImage = await configImageService.associateImageWithProduct(
        imageId,
        productId,
        order
      );

      res.status(200).json({
        message: "Imagen asociada correctamente al producto",
        image: updatedImage,
      });
    } catch (err) {
      console.error("Error al asociar imagen con producto:", err);
      res.status(500).json({
        message:
          err instanceof Error ? err.message : "Error interno del servidor",
      });
    }
  }

  // 🔧 Puedes seguir agregando otros métodos aquí para object-images, etc.
}
export const configImageController = new ConfigImageController();
