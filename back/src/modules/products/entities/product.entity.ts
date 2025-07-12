import { Category } from "../../categories/entities/category.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToMany,
  JoinTable, // Import OneToMany
} from "typeorm";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index()
  @Column({ type: "varchar", length: 255, unique: true })
  name!: string;

  @Column({
    type: "varchar",
    length: 1024,
    nullable: false,
    name: "description",
  })
  description!: string;

  @Column({
    type: "varchar",
    length: 1024,
    nullable: true,
    name: "full_description",
  })
  fullDescription!: string | null;

  @Column({ type: "integer", name: "price", nullable: false })
  price!: number;

  @Column({
    type: "varchar",
    length: 1024,
    nullable: true,
    name: "images",
    array: true,
  })
  images!: string[];

  @Column({
    type: "varchar",
    length: 1024,
    nullable: true,
    name: "videos",
    array: true,
  })
  videos!: string[];

  @Column({
    type: "integer",
    nullable: true,
    name: "stock",
  })
  stock!: number;

  @Column({ type: "decimal", nullable: true, name: "rating" })
  rating!: number;

  @Column({ type: "jsonb", nullable: true, name: "reviews" })
  reviews!: string[];

  @Column({ type: "jsonb", nullable: false, name: "dimensions" })
  dimensions!: {
    width: number;
    height: number;
    length: number;
    weight: number;
  };

  @Column({
    type: "varchar",
    array: true,
    nullable: true,
    name: "structure_colors",
  })
  structureColors!: string[];

  @Column({
    type: "varchar",
    array: true,
    nullable: true,
    name: "principal_colors",
  })
  principalColors!: string[];

  @Column({ type: "boolean", name: "isFeatured" })
  isFeatured!: boolean;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt!: Date;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({ name: "products_categories" })
  categories!: Category[];
}
