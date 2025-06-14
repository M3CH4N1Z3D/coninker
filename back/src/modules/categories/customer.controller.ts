// Placeholder Customer Controller (replace with actual request handling and error management later)

import { Request, Response, NextFunction } from "express";
import { customerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/category.dto";

// Assuming you have a middleware to attach user information (including companyId) to the request
interface AuthenticatedRequest extends Request {
  user?: {
    // Make user optional
    // Replace with your actual user type
    id?: string; // Make properties optional
    email?: string;
    role?: string;
    companyId?: string; // Make companyId optional
  };
}

export class CustomerController {
  async createCustomer(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const companyId = req.user?.companyId;
      if (!companyId) {
        res.status(401).json({
          message: "Company ID not found on user. Authentication required.",
        });
        return;
      }

      const customerData: CreateCustomerDto = req.body;

      // Basic validation (more comprehensive validation should be done using a library like class-validator)
      if (
        !customerData.name ||
        !customerData.contact ||
        !customerData.address ||
        !customerData.department ||
        !customerData.city ||
        !customerData.phone ||
        !customerData.contactEmail
      ) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      // In a real application, add more specific format validations here
      // e.g., email format, phone number format, etc.

      const newCustomer = await customerService.createCustomer(
        companyId,
        customerData
      );
      res.status(201).json({
        message: "Customer created successfully",
        data: { customer: newCustomer },
      });
    } catch (error: any) {
      console.error("Error creating customer:", error);
      res
        .status(500)
        .json({ message: error.message || "Error creating customer" });
    }
  }

  async getCustomersByCompany(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const companyId = req.user?.companyId;
      if (!companyId) {
        res.status(401).json({
          message: "Company ID not found on user. Authentication required.",
        });
        return;
      }

      const customers = await customerService.getCustomersByCompany(companyId);
      res.status(200).json({
        message: "Customers fetched successfully",
        data: { customers },
      });
    } catch (error: any) {
      console.error("Error fetching customers:", error);
      res
        .status(500)
        .json({ message: error.message || "Error fetching customers" });
    }
  }

  // Add other methods like getCustomerById, updateCustomer, deleteCustomer later
}

// Export an instance of the controller
export const customerController = new CustomerController();
