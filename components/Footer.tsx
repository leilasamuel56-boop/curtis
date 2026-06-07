
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#282828] text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase text-sm tracking-wider">Service Client</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Centre d'assistance</a></li>
              <li><a href="#" className="hover:text-white">Acheter sur JumiaStyle</a></li>
              <li><a href="#" className="hover:text-white">Modes de paiement</a></li>
              <li><a href="#" className="hover:text-white">Expédition et Livraison</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase text-sm tracking-wider">À Propos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Qui sommes-nous</a></li>
              <li><a href="#" className="hover:text-white">Carrières</a></li>
              <li><a href="#" className="hover:text-white">Conditions Générales</a></li>
              <li><a href="#" className="hover:text-white">Politique de Confidentialité</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase text-sm tracking-wider">Gagnez de l'argent</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Vendez sur JumiaStyle</a></li>
              <li><a href="#" className="hover:text-white">Devenez consultant JForce</a></li>
              <li><a href="#" className="hover:text-white">Devenez partenaire logistique</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase text-sm tracking-wider">Suivez-nous</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-gray-700 h-10 w-10 flex items-center justify-center rounded-full hover:bg-[#f68b1e] transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="bg-gray-700 h-10 w-10 flex items-center justify-center rounded-full hover:bg-[#f68b1e] transition-colors"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="bg-gray-700 h-10 w-10 flex items-center justify-center rounded-full hover:bg-[#f68b1e] transition-colors"><i className="fa-brands fa-twitter"></i></a>
            </div>
            <h4 className="text-lg font-bold mb-4 uppercase text-sm tracking-wider">Modes de Paiement</h4>
            <div className="flex space-x-2">
              <i className="fa-brands fa-cc-visa text-3xl"></i>
              <i className="fa-brands fa-cc-mastercard text-3xl"></i>
              <i className="fa-solid fa-money-bill-wave text-3xl"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-6 text-center text-xs text-gray-500">
        &copy; 2024 JumiaStyle. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
