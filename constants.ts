
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Ensemble Jogging Noir & Blanc Gradient 'I'M FASHION'",
    price: 15000,
    originalPrice: 18500,
    category: "Homme",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    reviews: 124,
    isFlashSale: true,
    description: "Un ensemble jogging unique avec un dégradé artistique du blanc au noir. Confortable et stylé pour vos sorties décontractées."
  },
  {
    id: 2,
    name: "Ensemble Short Oversize Gris Perle (2 pièces)",
    price: 12000,
    originalPrice: 14500,
    category: "Homme",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    reviews: 86,
    isFlashSale: false,
    description: "Look minimaliste ultra-confortable. T-shirt oversize et short assorti en coton premium."
  },
  {
    id: 3,
    name: "Ensemble Sport Bleu Royal 'M' Edition",
    price: 13500,
    originalPrice: 16000,
    category: "Homme",
    image: "https://images.unsplash.com/photo-1515434126000-961d90ff09db?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    reviews: 52,
    isFlashSale: true,
    description: "Une couleur bleu royal vibrante pour un look sportif affirmé. Tissu respirant idéal pour le climat tropical."
  }
];

export const CATEGORIES = ['Toutes', 'Homme', 'Femme', 'Enfant', 'Accessoires', 'Chaussures'];
