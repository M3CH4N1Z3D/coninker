import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Product } from "../../products/entities/product.entity";

@Entity({ name: "configImage" })
export class ConfigImage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 1024, nullable: true })
  name!: string;

  @Column({ type: "varchar", length: 1024, nullable: true })
  key!: string;

  @Column({ type: "varchar", length: 1024, nullable: true })
  description!: string;

  @Column({ type: "varchar", length: 1024, nullable: true })
  image!: string;

  @ManyToOne(() => Product, { nullable: true }) // 👈 relación opcional
  @JoinColumn({ name: "product_id" })
  product?: Product;

  @Column({ type: "int", nullable: true })
  order?: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at!: Date;
}
