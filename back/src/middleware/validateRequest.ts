import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { HttpException } from "../utils/HttpException";

/**
 * Middleware factory function to validate request data against a Zod schema.
 * It checks req.body, req.params, and req.query if they are defined in the schema.
 *
 * @param schema - The Zod schema to validate against.
 * @returns An Express middleware function.
 */
export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Create an object with potential request parts to validate
      const requestDataToValidate: {
        body?: unknown;
        params?: unknown;
        query?: unknown;
      } = {};
      if (schema.shape.body) {
        requestDataToValidate.body = req.body;
      }
      if (schema.shape.params) {
        requestDataToValidate.params = req.params;
      }
      if (schema.shape.query) {
        requestDataToValidate.query = req.query;
      }

      // Validate the parts that exist in the schema
      await schema.parseAsync(requestDataToValidate);

      // If validation is successful, proceed to the next middleware/handler
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors for a cleaner response
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join("."), // e.g., "body.email"
          message: err.message,
        }));
        // Pass a structured error to the global error handler
        return next(
          new HttpException(400, "Validation failed", formattedErrors)
        );
      }
      // Pass other unexpected errors to the global error handler
      return next(
        new HttpException(500, "Internal Server Error during validation")
      );
    }
  };
