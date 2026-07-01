import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();
const isDev = process.env.NODE_ENV !== "production";
export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  entities: [isDev ? "src/entities/**/*.ts" : "dist/entities/**/*.js"],
  migrations: [isDev ? "src/migration/**/*.ts" : "dist/migration/**/*.js"],
  subscribers: [isDev ? "src/subscribers/**/*.ts" : "dist/subscribers/**/*.js"],
});