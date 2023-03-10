import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum DomesticStatus {
  NEW = "new",
  COMPLETE = "complete",
}

@Entity()
export class Domestic {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  price!: string;

  @Column()
  image: string;

  @Column()
  image_placehoder: string;

  @Column()
  sale_price: number;

  @Column()
  variety: string;

  @Column()
  date_of_completion!: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
