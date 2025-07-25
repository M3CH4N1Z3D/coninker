// Placeholder Customer Routes (replace with actual Express router setup later)

import { Router } from "express";
import { categoryController } from "./controllers/category.controller";
import { protect } from "../../middleware/protectRoute"; // Import authentication middleware

const router = Router();

router.get("/", (req, res, next) =>
  categoryController.getAllCategories(req, res, next)
);
router.get("/:title", (req, res, next) =>
  categoryController.getProductsByCategoryTitle(req, res, next)
);
router.get("/id/:id", (req, res, next) =>
  categoryController.getCategoryById(req, res, next)
);
router.put("/:id", protect, (req, res, next) =>
  categoryController.updateCategory(req, res, next)
);

export default router;
