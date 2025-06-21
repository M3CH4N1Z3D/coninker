import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: any, file: any) => {
    const folder = `App/hero`;
    const resource_type = file.mimetype.startsWith("video") ? "video" : "image";

    return {
      folder,
      format: resource_type === "image" ? "webp" : undefined,
      resource_type,
      transformation: [{ width: 800, height: 800, crop: "limit" }],
    };
  },
} as any);

export const upload = multer({ storage });
