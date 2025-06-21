export interface ProductFormData {
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  categories: Category[];
  stock: number;
  width: number;
  height: number;
  length: number;
  weight: number;
  colors: string[];
  isFeatured: boolean;
}

export interface ProductFormProps {
  onCancel: () => void; // Function to close the modal
  onSave: (newOtData: any) => void; // Callback after successful OT creation (replace 'any' with proper type later)
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  images: string[];
  videos: string[];
  categories: Category[];
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

export interface Category {
  id: string;
  title: string;
  image: string;
  description: string;
}
