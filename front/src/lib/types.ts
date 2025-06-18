export interface Product {
  id?: string;
  name?: string;
  description: string;
  fullDescription: string;
  price: number;
  images: string[];
  videos: string[];
  categories: { id: string; name: string }[];
  stock: number;
  rating: number;
  reviewCount: number;
  width: number;
  height: number;
  length: number;
  weight: number;
  colors?: string[];
  selectedColor?: string;
  featured: boolean;
}
