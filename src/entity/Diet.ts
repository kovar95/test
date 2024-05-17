import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Diet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
