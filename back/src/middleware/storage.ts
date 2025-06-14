import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (
    req: { body: { productName: string; colorHex: string } },
    file: any
  ) => {
    const { productName, colorHex } = req.body;

    if (!productName || !colorHex) {
      throw new Error("Product name and color hex are required");
    }

    const formattedProductName = productName.replace(/\s+/g, "-").toLowerCase();
    return {
      folder: () => `products/${formattedProductName}/${colorHex}`, // ✅ Ajuste en la tipificación del folder
      format: async () => "webp",
      transformation: [{ width: 800, height: 800, crop: "limit" }],
    };
  },
} as any);

export const upload = multer({ storage });
