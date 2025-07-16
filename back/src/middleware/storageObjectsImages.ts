import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    console.log("Uploading hero image with params:", req.body, "file:", file);
    return {
      folder: "app/objects",
      format: "webp",
      resource_type: "image",
      transformation: [{ width: 800, height: 800, crop: "limit" }],
    };
  },
});

export const uploadObjectsImage = multer({ storage });
