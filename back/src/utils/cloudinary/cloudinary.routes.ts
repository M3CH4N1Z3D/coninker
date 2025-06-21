import { Router } from "express";
import { uploadController } from "./cloudinary.controller";
import { upload } from "../../middleware/storage";

const router = Router();

router.post("/upload/image", upload.any(), uploadController);

router.post("/upload/video", upload.single("file"), uploadController);

// router.post("/upload/hero"), upload.any(), uploadController;

export default router;
