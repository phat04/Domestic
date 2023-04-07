import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Cart } from "./Cart";
import { Domestic } from "./Domestic";

@Entity()
export class CartItem extends BaseEntity {
  @ManyToOne(() => Cart, (cart) => cart.cart_items)
  cart: Cart;

  @ManyToOne(() => Domestic, (domestic) => domestic.cart_items)
  domestic: Domestic;

  @Column()
  quantity: number;
}
