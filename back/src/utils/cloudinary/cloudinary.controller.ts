// controllers/imageUpload.controller.ts

import { Request, Response } from "express";

export class ImageUploadController {
  // Carga imagen hero
  uploadHero(req: Request, res: Response): void {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        res.status(400).json({ message: "No se subió ningún archivo" });
        return;
      }

      res.status(200).json({
        message: "Imagen hero subida exitosamente",
        secure_url: files[0].path,
      });
    } catch (error) {
      console.error("Error al subir imagen hero:", error);
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Error interno controlador",
      });
    }
  }

  uploadProduct(req: Request, res: Response): void {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        res.status(400).json({ message: "No se subió ningún archivo" });
        return;
      }
      res.status(200).json({
        message: "Archivo subido exitosamente",
        secure_url: files[0].path,
      });
    } catch (error) {
      console.error("Error en uploadController:", error);
      res.status(500).json({
        message: error instanceof Error ? error.message : "Error interno",
      });
    }
  }

  // Carga imagen categoría
  uploadCategory(req: Request, res: Response): void {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        res
          .status(400)
          .json({ message: "No se subió ninguna imagen de categoría" });
        return;
      }

      res.status(200).json({
        message: "Imagen de categoría subida exitosamente",
        secure_url: files[0].path,
      });
    } catch (error) {
      console.error("Error al subir imagen de categoría:", error);
      res.status(500).json({
        message: error instanceof Error ? error.message : "Error interno",
      });
    }
  }
}

export const imageUploadController = new ImageUploadController();
