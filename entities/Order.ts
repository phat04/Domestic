import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  domestics: [{ domesticId: number; quality: number | 1 }];

  @Column()
  status: string | "pending";
}
