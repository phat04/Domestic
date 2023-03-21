import { DataSource, DataSourceOptions, DatabaseType } from "typeorm";
import { Domestic } from "../entities/Domestic";
import { User } from "../entities/User";
import { Cart } from "../entities/Cart";
import dotenv from "dotenv";
dotenv.config();

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [Domestic, User, Cart],
  logging: true,
  synchronize: true,
});
console.log(process.env.DATABASE_PASSWORD);

export { AppDataSource };
