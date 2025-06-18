import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany, // Import OneToMany
} from "typeorm";
import { Product } from "../../products/entities/product.entity";

@Entity({ name: "categories" })
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "varchar", length: 1024, nullable: true })
  image!: string;

  @Column({ type: "varchar", length: 5000, nullable: true })
  description!: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products!: Product[];

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at!: Date;
}
