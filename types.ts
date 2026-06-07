
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  isFlashSale?: boolean;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'Toutes' | 'Homme' | 'Femme' | 'Enfant' | 'Accessoires' | 'Chaussures';

export enum View {
  HOME = 'HOME',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  AI_STYLIST = 'AI_STYLIST'
}
