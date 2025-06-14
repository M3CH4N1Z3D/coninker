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
import { Material, Specification } from "../dto/createProduct";

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

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    name: "length",
  })
  length!: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    name: "width",
  })
  width!: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    name: "height",
  })
  height!: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    name: "weight",
  })
  weight!: number;

  @Column({ type: "jsonb", nullable: true, name: "specifications" })
  specifications!: Specification[];

  @Column({ type: "jsonb", nullable: true, name: "materials" })
  materials!: Material[];

  @Column({ type: "varchar", array: true, nullable: false, name: "colors" })
  colors!: string[];

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
