import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { productType } from "../utils/productType";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  domestics: typeof productType[];

  @Column()
  status: string | "pending";
}
