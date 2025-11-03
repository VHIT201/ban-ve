export type Category = 'Cơ khí' | 'Điện' | 'Xây dựng' | 'Điều hòa' | 'Cấp thoát nước' | 'Điện tử' | 'Robot' | 'Nội thất';

export interface Blueprint {
  id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  dimensions: string;
  sqft: number;
  imageUrl: string;
  bedrooms?: number;
  bathrooms?: number;
}

export interface CartItem {
  blueprint: Blueprint;
  quantity: number;
  notes?: string;
}
