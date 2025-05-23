import { DataSource } from "typeorm";
import Ad from "../entities/Ad";
import Category from "../entities/Category";
import Tag from "../entities/Tags";

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "good_corner",
  entities: [Ad, Category, Tag],
  synchronize: true,
  logging: ["error", "query"],
});

export default dataSource;