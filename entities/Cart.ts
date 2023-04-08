import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
} from 'typeorm';
//import { productType } from "../utils/productType";
import { BaseEntity } from './BaseEntity';
import { CartItem } from './CartItem';
import { User } from './User';

@Entity()
export class Cart extends BaseEntity {
  @Column()
  ownerId: number;

  // @Column("simple-array")
  // domestics: typeof productType[];

  @OneToMany(() => CartItem, (cart_item) => cart_item.cart)
  cart_items: CartItem[];
}
