import { Router } from "express";
import { uploadController } from "./cloudinary.controller";
import { upload } from "../../middleware/storage";

const router = Router();

router.post("/upload", upload.array("images", 5), uploadController);

export default router;
