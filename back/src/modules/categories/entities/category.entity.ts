import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinColumn,
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

  @Column({ type: "boolean", default: false })
  showInLanding!: boolean;

  @ManyToMany(() => Product, (product) => product.categories)
  products!: Product[];

  // 👇 Relación con categoría padre
  @ManyToOne(() => Category, (category) => category.children, {
    nullable: true,
  })
  @JoinColumn({ name: "parent_id" })
  parent?: Category;

  // 👇 Relación con subcategorías hijas
  @OneToMany(() => Category, (category) => category.parent)
  children?: Category[];

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at!: Date;
}
