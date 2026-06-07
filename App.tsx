
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import { Product, CartItem, Category, View } from './types';
import { MOCK_PRODUCTS, CATEGORIES } from './constants';
import { getStyleAdvice } from './services/geminiService';

type OrderStep = 'INFO' | 'PAYMENT' | 'PROCESSING' | 'SUCCESS';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedCategory, setSelectedCategory] = useState<Category>('Toutes');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [userInputAdvice, setUserInputAdvice] = useState('');

  // Order Flow State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderStep, setOrderStep] = useState<OrderStep>('INFO');
  const [productToBuy, setProductToBuy] = useState<Product | null>(null);
  const [orderForm, setOrderForm] = useState({
    fullName: '',
    size: 'M',
    location: '',
    paymentMethod: 'Wave',
    paymentPhone: ''
  });

  // Persist cart
  useEffect(() => {
    const savedCart = localStorage.getItem('jumia_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('jumia_cart', JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchCategory = selectedCategory === 'Toutes' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const flashSales = useMemo(() => MOCK_PRODUCTS.filter(p => p.isFlashSale), []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView(View.PRODUCT_DETAIL);
    window.scrollTo(0, 0);
  };

  const openBuyNow = (product: Product) => {
    setProductToBuy(product);
    setOrderStep('INFO');
    setIsOrderModalOpen(true);
  };

  const goToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStep('PAYMENT');
  };

  const processPayment = () => {
    if (!orderForm.paymentPhone) return;
    setOrderStep('PROCESSING');
    
    // Simuler le délai de paiement (attente USSD / Prompt)
    setTimeout(() => {
      setOrderStep('SUCCESS');
      sendNotification();
    }, 3000);
  };

  const sendNotification = () => {
    if (!productToBuy) return;
    const phoneNumber = "2250141923396"; 
    const message = `*PAIEMENT REÇU - JUMIASTYLE*%0A%0A` +
      `✅ *Statut:* Payé via ${orderForm.paymentMethod}%0A` +
      `💰 *Montant:* ${productToBuy.price} FCFA%0A` +
      `👕 *Produit:* ${productToBuy.name}%0A` +
      `----------------------------%0A` +
      `👤 *Client:* ${orderForm.fullName}%0A` +
      `📞 *Tel:* ${orderForm.paymentPhone}%0A` +
      `📏 *Taille:* ${orderForm.size}%0A` +
      `📍 *Livraison:* ${orderForm.location}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAiAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInputAdvice.trim()) return;
    setAiLoading(true);
    const advice = await getStyleAdvice(userInputAdvice);
    setAiAdvice(advice || "Désolé, je ne trouve pas d'idées pour ce style.");
    setAiLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
        onNavigate={setCurrentView}
        onSearch={setSearchTerm}
      />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {currentView === View.HOME && (
          <div className="space-y-8">
            {/* Banner Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="hidden lg:block bg-white rounded shadow-sm py-2 self-start sticky top-24">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat as Category)}
                    className={`sidebar-item w-full text-left px-4 py-2 text-sm flex items-center transition-colors ${selectedCategory === cat ? 'text-[#f68b1e] bg-orange-50 font-bold' : 'text-gray-700'}`}
                  >
                    <i className={`fa-solid ${cat === 'Toutes' ? 'fa-list' : cat === 'Homme' ? 'fa-person' : cat === 'Femme' ? 'fa-person-dress' : cat === 'Enfant' ? 'fa-child' : cat === 'Chaussures' ? 'fa-shoe-prints' : 'fa-gem'} mr-3 w-5`}></i>
                    {cat}
                  </button>
                ))}
              </div>
              
              <div className="lg:col-span-2 relative h-[250px] md:h-[400px] rounded overflow-hidden shadow-sm">
                <img src="https://picsum.photos/seed/fashion-banner/1200/600" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-8 text-white">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">Nouvelle Collection</h2>
                  <p className="text-lg md:text-xl mb-6">Paiement sécurisé par Wave & Mobile Money</p>
                  <button className="bg-[#f68b1e] w-fit px-8 py-3 rounded font-bold uppercase hover:bg-white hover:text-[#f68b1e] transition-colors">Explorer</button>
                </div>
              </div>

              <div className="hidden lg:flex flex-col gap-4">
                <div className="flex-1 bg-white rounded p-4 shadow-sm flex items-center space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full text-[#f68b1e]"><i className="fa-solid fa-lock text-2xl"></i></div>
                  <div>
                    <h5 className="font-bold text-sm">Paiement 100% Sécurisé</h5>
                    <p className="text-xs text-gray-500">Transaction cryptée</p>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded p-4 shadow-sm flex items-center space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full text-[#f68b1e]"><i className="fa-solid fa-truck-fast text-2xl"></i></div>
                  <div>
                    <h5 className="font-bold text-sm">Livraison Partout</h5>
                    <p className="text-xs text-gray-500">Abidjan & Intérieur</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Catalogue Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Nos Articles</h3>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} onBuyNow={openBuyNow} onClick={handleProductClick} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white rounded shadow-sm">
                  <i className="fa-solid fa-box-open text-5xl text-gray-200 mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-700">Aucun produit trouvé</h3>
                </div>
              )}
            </section>
          </div>
        )}

        {currentView === View.PRODUCT_DETAIL && selectedProduct && (
          <div className="bg-white rounded shadow-sm p-4 md:p-8">
            <button onClick={() => setCurrentView(View.HOME)} className="mb-6 text-[#f68b1e] flex items-center space-x-2 font-bold">
              <i className="fa-solid fa-arrow-left"></i>
              <span>Retour</span>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <img src={selectedProduct.image} alt="" className="w-full rounded-lg shadow-sm" />
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
                <div className="text-4xl font-bold text-gray-900 border-y py-6">{selectedProduct.price.toLocaleString()} FCFA</div>
                <button 
                  onClick={() => openBuyNow(selectedProduct)}
                  className="w-full bg-[#f68b1e] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#e07b1a] shadow-lg transition-all"
                >
                  Procéder au paiement
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODALE DE PAIEMENT INTÉGRÉE */}
      {isOrderModalOpen && productToBuy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsOrderModalOpen(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden animate-in fade-in zoom-in duration-300">
            
            {/* Header Steps */}
            <div className="bg-[#f68b1e] p-5 text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Checkout Sécurisé</h3>
                <button onClick={() => setIsOrderModalOpen(false)} className="text-2xl hover:rotate-90 transition-transform">&times;</button>
              </div>
              <div className="flex justify-between px-2 relative">
                <div className={`z-10 h-8 w-8 rounded-full flex items-center justify-center border-2 ${orderStep === 'INFO' ? 'bg-white text-[#f68b1e]' : 'bg-[#f68b1e] text-white border-white'}`}><i className="fa-solid fa-user text-xs"></i></div>
                <div className={`z-10 h-8 w-8 rounded-full flex items-center justify-center border-2 ${orderStep === 'PAYMENT' || orderStep === 'PROCESSING' ? 'bg-white text-[#f68b1e]' : 'bg-[#f68b1e] text-white border-white opacity-50'}`}><i className="fa-solid fa-credit-card text-xs"></i></div>
                <div className={`z-10 h-8 w-8 rounded-full flex items-center justify-center border-2 ${orderStep === 'SUCCESS' ? 'bg-white text-[#f68b1e]' : 'bg-[#f68b1e] text-white border-white opacity-50'}`}><i className="fa-solid fa-check text-xs"></i></div>
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-white/30 -z-0"></div>
              </div>
            </div>

            {/* ÉTAPE 1 : INFORMATIONS */}
            {orderStep === 'INFO' && (
              <form onSubmit={goToPayment} className="p-6 space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl mb-4">
                  <img src={productToBuy.image} alt="" className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-bold text-xs truncate">{productToBuy.name}</h4>
                    <p className="text-[#f68b1e] font-bold text-sm">{productToBuy.price.toLocaleString()} FCFA</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <input required className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-[#f68b1e] outline-none" placeholder="Nom complet" value={orderForm.fullName} onChange={e => setOrderForm({...orderForm, fullName: e.target.value})} />
                  <div className="grid grid-cols-2 gap-3">
                    <select className="w-full border-2 border-gray-100 rounded-xl p-3 bg-white outline-none" value={orderForm.size} onChange={e => setOrderForm({...orderForm, size: e.target.value})}>
                      <option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option>
                    </select>
                    <input required className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none" placeholder="Lieu de livraison" value={orderForm.location} onChange={e => setOrderForm({...orderForm, location: e.target.value})} />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#282828] text-white py-4 rounded-xl font-bold uppercase mt-4 hover:bg-black">Suivant : Paiement</button>
              </form>
            )}

            {/* ÉTAPE 2 : PAIEMENT */}
            {orderStep === 'PAYMENT' && (
              <div className="p-6 space-y-6">
                <div className="text-center">
                  <h4 className="font-bold text-gray-700">Choisir le moyen de paiement</h4>
                  <p className="text-xs text-gray-400 mt-1">Transaction 100% sécurisée</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setOrderForm({...orderForm, paymentMethod: 'Wave'})}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center space-y-2 transition-all ${orderForm.paymentMethod === 'Wave' ? 'border-[#1da1f2] bg-blue-50' : 'border-gray-100'}`}
                  >
                    <div className="h-10 w-10 bg-[#1da1f2] rounded-full flex items-center justify-center text-white font-bold">W</div>
                    <span className="text-xs font-bold text-[#1da1f2]">WAVE</span>
                  </button>
                  <button 
                    onClick={() => setOrderForm({...orderForm, paymentMethod: 'Mobile Money'})}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center space-y-2 transition-all ${orderForm.paymentMethod === 'Mobile Money' ? 'border-[#f68b1e] bg-orange-50' : 'border-gray-100'}`}
                  >
                    <div className="h-10 w-10 bg-[#f68b1e] rounded-full flex items-center justify-center text-white"><i className="fa-solid fa-mobile-screen"></i></div>
                    <span className="text-xs font-bold text-[#f68b1e]">M. MONEY</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Numéro de téléphone débité</label>
                  <input 
                    required 
                    type="tel" 
                    className="w-full border-2 border-gray-100 rounded-xl p-4 text-center text-xl font-bold outline-none focus:border-[#f68b1e]" 
                    placeholder="07 -- -- -- --"
                    value={orderForm.paymentPhone}
                    onChange={e => setOrderForm({...orderForm, paymentPhone: e.target.value})}
                  />
                </div>

                <button 
                  onClick={processPayment}
                  className={`w-full py-4 rounded-xl font-bold uppercase text-white shadow-lg transition-all transform active:scale-95 ${orderForm.paymentMethod === 'Wave' ? 'bg-[#1da1f2]' : 'bg-[#f68b1e]'}`}
                >
                  Payer {productToBuy.price.toLocaleString()} FCFA
                </button>
                <button onClick={() => setOrderStep('INFO')} className="w-full text-xs text-gray-400 font-bold uppercase">Retour</button>
              </div>
            )}

            {/* ÉTAPE 3 : TRAITEMENT */}
            {orderStep === 'PROCESSING' && (
              <div className="p-12 text-center space-y-6">
                <div className="relative h-24 w-24 mx-auto">
                  <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[#f68b1e] rounded-full border-t-transparent animate-spin"></div>
                  <i className="fa-solid fa-shield-halved absolute inset-0 flex items-center justify-center text-3xl text-gray-200"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Traitement du paiement</h4>
                  <p className="text-sm text-gray-500 mt-2">Veuillez valider la demande sur votre téléphone...</p>
                </div>
              </div>
            )}

            {/* ÉTAPE 4 : SUCCÈS */}
            {orderStep === 'SUCCESS' && (
              <div className="p-12 text-center space-y-6">
                <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-500 text-5xl animate-bounce">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4 className="font-bold text-2xl">Paiement Reçu !</h4>
                  <p className="text-sm text-gray-500 mt-2">Votre commande est en cours de préparation. Le vendeur a été notifié.</p>
                </div>
                <button 
                  onClick={() => setIsOrderModalOpen(false)}
                  className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold uppercase flex items-center justify-center space-x-2 shadow-md"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                  <span>Suivre sur WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
