export interface CreateProductDto {
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  images?: string[];
  videos?: string[];
  stock: number;
  rating?: number;
  reviews?: string[];
  dimensions: {
    width: number;
    height: number;
    length: number;
    weight: number;
  };
  structureColors?: string[];
  principalColors?: string[];
  isFeatured: boolean;
  categories: string[]; // 🔥 Ahora `categories` solo contiene un array de IDs
}
