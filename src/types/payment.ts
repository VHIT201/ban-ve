export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  note?: string;
}
