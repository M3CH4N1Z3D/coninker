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
  name!: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products!: Product[];

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at!: Date;
}
