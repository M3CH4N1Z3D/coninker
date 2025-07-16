import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    console.log("Uploading hero image with params:", req.body, "file:", file);
    return {
      folder: "app/hero",
      format: "png",
      resource_type: "image",
      transformation: [{ width: 2793, height: 1024, crop: "limit" }],
    };
  },
});

export const uploadHeroImage = multer({ storage }); // ✅ el campo es "file"
