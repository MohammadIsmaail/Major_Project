import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  port: 5432,
  username: "postgres",
  password: "isma@123",
  database: "lms",
  synchronize: true,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
});
