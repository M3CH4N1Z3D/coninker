import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: () => "products", // ✅ Ajuste en la tipificación del folder
    format: async () => "webp",
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
} as any);

export const upload = multer({ storage });
