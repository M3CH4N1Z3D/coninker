// routes/configImage.routes.ts

import { Router } from "express";
import { configImageController } from "./controllers/configImage.controller";
import { protect } from "../../middleware/protectRoute";

const router = Router();

router.post("/saveheroimage", protect, configImageController.configHeroImage);
router.post(
  "/saveobjectimages",
  protect,
  configImageController.configObjectImages
);
router.get("/images/:key", configImageController.getImagesByKey);
router.post(
  "/associate-image-product",
  protect,
  configImageController.associateImageWithProduct
);

export default router;
