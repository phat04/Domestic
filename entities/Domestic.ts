import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { CartItem } from "./CartItem";

export enum DomesticStatus {
  NEW = "new",
  COMPLETE = "complete",
}

@Entity()
export class Domestic extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  price!: string;

  // @Column({ nullable: true })
  // image: string;

  // @Column({ nullable: true })
  // image_placehoder: string;

  // @Column({ nullable: true })
  // sale_price: number;

  @OneToMany(() => CartItem, (cart_item) => cart_item.domestic)
  cart_items: CartItem[];

  // @Column({ nullable: true })
  // variety: string;

  // @Column({ nullable: true })
  // date_of_completion!: Date;
}
