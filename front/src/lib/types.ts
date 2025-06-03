export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  images: string[];
  videos: string[];
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  specifications: Array<{
    name: string;
    value: string;
  }>;
  materials: Array<{
    part: string;
    material: string;
  }>;
  colors?: string[];
  selectedColor?: string;
  reviews: Array<{
    author: string;
    rating: number;
    date: string;
    comment: string;
  }>;
  featured: boolean;
}
