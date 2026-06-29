import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  entities: ["dist/entities/**/*.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscribers/**/*.js"],
});