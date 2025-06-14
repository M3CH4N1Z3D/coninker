import { Router } from "express";
import { productController } from "./controllers/product.controller";
import { protect } from "../../middleware/protectRoute";

const router = Router();

router.post(
  "/",
  /*protect,*/ (req, res, next) => {
    productController.createProduct(req, res, next);
  }
);

export default router;
