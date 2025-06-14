// Placeholder Customer Routes (replace with actual Express router setup later)

import { Router } from "express";
import { customerController } from "./customer.controller";
// Assuming you have an authentication middleware
import { protect } from "../../middleware/protectRoute"; // Import authentication middleware

const router = Router();

// Define routes
// router.post('/', authenticate, customerController.createCustomer); // Example protected route
// router.get('/', authenticate, customerController.getCustomersByCompany); // Example protected route

// Placeholder routes (replace with protected routes later)
// Protected routes
router.post(
  "/",
  protect,
  (
    req,
    res,
    next // Use 'protect' middleware
  ) => customerController.createCustomer(req, res, next)
);
router.get(
  "/",
  protect,
  (
    req,
    res,
    next // Use 'protect' middleware
  ) => customerController.getCustomersByCompany(req, res, next)
);

export default router;

/*
Example with authentication middleware:

import { Router } from 'express';
import { customerController } from './customer.controller';
import { authenticate } from '../../middleware/auth.middleware'; // Your authentication middleware

const router = Router();

// Protected routes
router.post('/', authenticate, customerController.createCustomer);
router.get('/', authenticate, customerController.getCustomersByCompany);
// Add routes for getById, update, delete later

export default router;
*/
