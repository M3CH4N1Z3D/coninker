import { Router } from "express";
import { authController } from "../admins/controllers/admin.controller";
import { protect } from "../../middleware/protectRoute";

const router = Router();

// Ruta de login
router.post("/login", (req, res, next) => authController.login(req, res, next));

// Ruta protegida
router.get("/admin/products", protect, (req, res) => {
  res.json({ message: "Welcome to admin panel!" });
});

export default router;
