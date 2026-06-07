
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  cartCount: number;
  onNavigate: (view: View) => void;
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onNavigate, onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-[#282828] text-white text-xs py-1 px-4 text-center">
        <span>Vendez sur JumiaStyle | Service Client | Aide</span>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => onNavigate(View.HOME)}
        >
          <span className="text-2xl font-bold tracking-tighter">
            JUMIA<span className="text-[#f68b1e]">STYLE</span>
          </span>
        </div>

        {/* Search Bar */}
        <form 
          onSubmit={handleSearch}
          className="flex-1 min-w-[300px] max-w-2xl flex"
        >
          <div className="relative w-full">
            <input
              type="text"
              className="w-full border-2 border-gray-200 rounded-l-md py-2 px-4 focus:outline-none focus:border-[#f68b1e]"
              placeholder="Chercher des vêtements, chaussures, accessoires..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-0 top-0 bottom-0 bg-[#f68b1e] text-white px-6 rounded-r-md hover:bg-[#e07b1a] transition-colors font-bold uppercase text-sm"
            >
              Rechercher
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex flex-col items-center cursor-pointer group">
            <i className="fa-regular fa-user text-xl group-hover:text-[#f68b1e]"></i>
            <span className="text-xs font-medium">Se connecter</span>
          </div>
          
          <div 
            className="flex flex-col items-center cursor-pointer group relative"
            onClick={() => onNavigate(View.AI_STYLIST)}
          >
            <i className="fa-solid fa-wand-magic-sparkles text-xl text-[#f68b1e]"></i>
            <span className="text-xs font-medium">Assistant AI</span>
          </div>

          <div 
            className="flex items-center cursor-pointer group relative"
            onClick={() => onNavigate(View.CART)}
          >
            <div className="relative">
              <i className="fa-solid fa-cart-shopping text-xl group-hover:text-[#f68b1e]"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f68b1e] text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="ml-2 hidden lg:inline font-bold">Panier</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
