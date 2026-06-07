
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  onClick: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow, onClick }) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded shadow-sm hover:shadow-lg transition-shadow duration-300 group flex flex-col h-full relative border border-gray-100">
      {discount > 0 && (
        <span className="absolute top-2 left-2 bg-orange-100 text-[#f68b1e] text-xs font-bold px-2 py-1 rounded z-10">
          -{discount}%
        </span>
      )}
      
      <div 
        className="cursor-pointer overflow-hidden aspect-[4/5] relative"
        onClick={() => onClick(product)}
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Hover action for cart only on desktop */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="bg-white text-[#f68b1e] p-3 rounded-full shadow-xl hover:scale-110 transition-transform"
            title="Ajouter au panier"
          >
            <i className="fa-solid fa-cart-plus text-xl"></i>
          </button>
        </div>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm text-gray-800 line-clamp-2 mb-1 group-hover:text-[#f68b1e] transition-colors cursor-pointer font-medium" onClick={() => onClick(product)}>
          {product.name}
        </h3>
        
        <div className="mt-auto">
          <div className="flex flex-col mb-3">
            <span className="text-lg font-bold text-gray-900">{product.price.toLocaleString()} FCFA</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString()} FCFA</span>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onBuyNow(product);
            }}
            className="w-full bg-[#f68b1e] text-white py-2.5 rounded font-bold text-xs uppercase hover:bg-[#e07b1a] transition-colors shadow-sm flex items-center justify-center space-x-2"
          >
            <i className="fa-solid fa-bag-shopping"></i>
            <span>Acheter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
