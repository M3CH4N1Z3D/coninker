export interface Specification {
  materials: string;
  finishes: string;
  assembly_type: string;
}
export interface Material {
  part: string;
  material: string;
}
export interface CreateProductDto {
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  images: string[];
  videos?: string[];
  stock: number;
  rating?: number;
  reviews?: string[];
  length: number;
  width: number;
  height: number;
  weight: number;
  specifications?: Specification[];
  material?: Material[];
  colors: string[];
  isFeatured: boolean;
  categories: string[];
}
