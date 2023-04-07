import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import bcrypt from "bcrypt";
import { BaseEntity } from "./BaseEntity";
import { Cart } from "./Cart";
export enum Role {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ type: "enum", enum: Role, default: Role.USER })
  role: Role;

  @OneToOne(() => Cart, {
    cascade: true,
  })
  @JoinColumn()
  cart: Cart;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkPassword(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
