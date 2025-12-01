import React, { useEffect, useState } from 'react';
import { api } from '../services/mockData';
import { Product } from '../types';
import { ShoppingCart, Search, FileText, BadgePercent, Star } from 'lucide-react';

export const Pharmacy: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  const addToCart = (id: string) => {
    setCart([...cart, id]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Farmácia Digital</h2>
          <p className="text-slate-500">Compre medicamentos e suplementos com entrega expressa.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none w-64"
            />
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          </div>
          <button className="relative bg-white border border-slate-300 p-2 rounded-lg hover:bg-slate-50 text-slate-700">
            <ShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Prescription Upload Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-6 text-white flex justify-between items-center shadow-lg">
        <div>
          <h3 className="text-xl font-bold mb-1">Tem receita médica?</h3>
          <p className="text-teal-100 text-sm">Faça o upload e nós preparamos seu pedido automaticamente.</p>
        </div>
        <button className="bg-white text-teal-600 px-4 py-2 rounded-lg font-semibold hover:bg-teal-50 flex items-center gap-2">
          <FileText size={18} />
          Enviar Receita
        </button>
      </div>

      <div className="flex items-center gap-2 py-2">
         <span className="text-xs font-bold uppercase text-slate-400">Parceiros em Destaque:</span>
         <div className="flex gap-2">
            <span className="bg-white border border-slate-200 px-2 py-1 rounded text-xs text-slate-600 font-medium flex items-center gap-1">
               <Star size={10} className="text-yellow-400 fill-yellow-400" /> Drogasil
            </span>
            <span className="bg-white border border-slate-200 px-2 py-1 rounded text-xs text-slate-600 font-medium flex items-center gap-1">
               <Star size={10} className="text-yellow-400 fill-yellow-400" /> Pague Menos
            </span>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all group relative">
            {/* Sponsored Badge (Monetization Strategy) */}
            {product.id === 'prod-2' && (
                <div className="absolute top-2 left-2 z-10 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                    <BadgePercent size={12} />
                    OFERTA PARCEIRA
                </div>
            )}
            
            <div className="h-40 bg-slate-100 relative overflow-hidden">
               <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
               {product.requiresPrescription && (
                 <div className="absolute top-2 right-2 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded uppercase">
                   Receita Obrigatória
                 </div>
               )}
            </div>
            <div className="p-4">
              <div className="text-xs text-slate-400 font-semibold mb-1">{product.category}</div>
              <h3 className="font-bold text-slate-800 mb-2 truncate">{product.name}</h3>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-teal-600">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <button 
                  onClick={() => addToCart(product.id)}
                  className="bg-slate-800 text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);