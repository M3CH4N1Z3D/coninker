import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: any, file: any) => {
    const productName = req.body?.productName;
    const colorHex = req.body?.colorHex;
    const categoryTitle = req.body?.categoryTitle;

    if (categoryTitle) {
      const folder = `categorías/${categoryTitle}`;
      return {
        folder,
        format: "webp",
        resource_type: "image",
        transformation: [{ width: 800, height: 800, crop: "limit" }],
      };
    }
    if (!productName || !colorHex) {
      throw new Error("Product name and color hex are required");
    }

    const folder = `products/${productName}/${colorHex}`;
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
