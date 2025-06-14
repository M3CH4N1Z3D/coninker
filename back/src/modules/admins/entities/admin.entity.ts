import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity({ name: "admin" })
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index()
  @Column({ type: "varchar", length: 255, unique: true })
  name!: string;

  @Column({
    type: "varchar",
    length: 1024,
    nullable: false,
    name: "email",
  })
  email!: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: true,
    name: "password",
  })
  password!: string | null;
}
