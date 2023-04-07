import { DataSource } from "typeorm";
import { Domestic } from "../entities/Domestic";
import { User } from "../entities/User";
import dotenv from "dotenv";
import { Cart } from "../entities/Cart";
import { Order } from "../entities/Order";
import { CartItem } from "../entities/CartItem";
dotenv.config();

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [Domestic, User, Cart, Order, CartItem],
  logging: false,
  synchronize: true,
});

export { AppDataSource };
