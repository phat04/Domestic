import { Entity, JoinTable, OneToMany } from "typeorm";
//import { productType } from "../utils/productType";
import { BaseEntity } from "./BaseEntity";
import { CartItem } from "./CartItem";

@Entity()
export class Cart extends BaseEntity {
  // @OneToOne(() => User)
  // @JoinColumn({ foreignKeyConstraintName: "userId" })
  // user: User;

  // @Column()
  // userId: number;

  // @Column("simple-array")
  // domestics: typeof productType[];

  @OneToMany(() => CartItem, (cart_item) => cart_item.cart)
  cart_items: CartItem[];
}
