import { DataSource } from "typeorm";
import { Domestic } from "../entities/Domestic";
import { User } from "../entities/User";
import { Cart } from "../entities/Cart";

// TODO: Fix path entities

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "test",
  entities: [Domestic, User, Cart],
  logging: true,
  synchronize: true,
});

export { AppDataSource };
