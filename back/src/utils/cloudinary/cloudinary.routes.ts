// routes/imageUpload.routes.ts

import { Router } from "express";
import { imageUploadController } from "./cloudinary.controller";
import { uploadHeroImage } from "../../middleware/storageHero";
import { upload } from "../../middleware/storage";

const router = Router();

// Hero
router.post(
  "/upload/hero",
  uploadHeroImage.any(),
  imageUploadController.uploadHero
);

// Producto (puede aceptar múltiples archivos)
router.post("/upload/image", upload.any(), imageUploadController.uploadProduct);

// Categoría (usa lógica de folder dinámico con categoryTitle en req.body)
router.post(
  "/upload/category",
  upload.any(),
  imageUploadController.uploadCategory
);

export default router;
