import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { createDefaultAdmin } from "./seeds/createDefaultAdmin";
import * as dotenv from "dotenv";
import * as path from "path";
import { createDefaultCategories } from "./seeds/createDefaultCategories";

dotenv.config();

const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "coninker",
  synchronize: false,
  logging:
    process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  entities: [
    path.join(__dirname, "..", "modules", "**", "entities", "*.entity.{ts,js}"),
  ],
  migrations: [path.join(__dirname, "migrations", "*.{ts,js}")],
  subscribers: [],
  migrationsTableName: "typeorm_migrations",
};

export const options = dataSourceOptions;

export const AppDataSource = new DataSource(dataSourceOptions);

export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized successfully.");
      await createDefaultAdmin();
      await createDefaultCategories();
    }
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};
