import express, { Application, Request, Response, NextFunction } from "express";
import "dotenv/config"; // Ensure environment variables are loaded
import { HttpException } from "./utils/HttpException";
import cors from "cors"; // Import CORS middleware

// Import Routers

import adminRoutes from "../src/modules/admins/admin.routes";
import productRoutes from "./modules/products/product.routes";
import uploadRoutes from "./utils/cloudinary/cloudinary.routes";
import categoryRoutes from "./modules/categories/category.routes";

// Import database initializer (optional here, depends on strategy)
// import { initializeDatabase } from "./database/data-source";

const app: Application = express();

// --- Middleware ---

// Enable CORS - Configure allowed origins based on environment
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_URL || ""] // Add your production frontend URL here
    : [
        "http://localhost:3000",
        "https://903b354h-3000.use2.devtunnels.ms",
        "http://192.168.128.9:3000",
      ]; // Allow localhost for development

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // If you need to handle cookies or authorization headers
  })
);

// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Initialize Passport

// --- Basic Routes (Example) ---
app.get("/", (req: Request, res: Response) => {
  res.send("coninker Backend is running!");
});

// --- Mount Module Routers ---
app.use("/api/admins", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api", uploadRoutes);
app.use("/api/categories", categoryRoutes);

// --- Global Error Handler ---
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(
  (
    err: Error | HttpException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const status = err instanceof HttpException ? err.status : 500;
    const message =
      err instanceof HttpException ? err.message : "Internal Server Error";
    const details = err instanceof HttpException ? err.details : undefined;

    console.error(`[${status}] ${message}`, details || err.stack); // Log more details

    const responseBody: { status: string; message: string; details?: unknown } =
      {
        status: "error",
        message,
      };

    if (details !== undefined) {
      responseBody.details = details;
    }

    res.status(status).json(responseBody);
  }
);

export default app;
