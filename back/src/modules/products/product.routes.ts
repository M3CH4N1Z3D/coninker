import { Router } from "express";
import { productController } from "./controllers/product.controller";
import { protect } from "../../middleware/protectRoute";

const router = Router();

router.post("/", protect, (req, res, next) => {
  productController.createProduct(req, res, next);
});
router.get("/", (req, res, next) => {
  productController.getAllProducts(req, res, next);
});
router.get("/:id", productController.getProductById);
router.put("/:id", protect, (req, res, next) => {
  productController.updateProduct(req, res, next);
});
router.delete("/:id/images", protect, productController.deleteProductImage);

export default router;
