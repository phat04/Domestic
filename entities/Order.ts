import { Column, Entity } from "typeorm";
import { productType } from "../utils/productType";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Order extends BaseEntity {
  @Column()
  userId: number;

  @Column("simple-array")
  domestics: typeof productType[];

  @Column()
  status: string | "pending";
}
