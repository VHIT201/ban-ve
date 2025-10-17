export type Category = 'Residential' | 'Commercial' | 'Landscape' | 'Industrial' | 'Modern' | 'Traditional';

export interface Blueprint {
  id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  dimensions: string;
  sqft: number;
  bedrooms?: number;
  bathrooms?: number;
  imageUrl: string;
}

export interface CartItem {
  blueprint: Blueprint;
  quantity: number;
}
