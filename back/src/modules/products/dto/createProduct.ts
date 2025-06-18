export interface CreateProductDto {
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  videos?: string[];
  stock: number;
  rating?: number;
  reviews?: string[];
  length: number;
  width: number;
  height: number;
  weight: number;
  colors: string[];
  isFeatured: boolean;
  categories: string[]; // 🔥 Ahora `categories` solo contiene un array de IDs
}
