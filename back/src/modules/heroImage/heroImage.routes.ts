// routes/configImage.routes.ts

import { Router } from "express";
import { configImageController } from "../heroImage/controllers/configImage.controller";
import { protect } from "../../middleware/protectRoute";

const router = Router();

router.post("/saveheroimage", protect, configImageController.configHeroImage);
router.get("/heroimages", configImageController.getHeroImages);

export default router;
