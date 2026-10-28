import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Zap } from 'lucide-react';

const POPULAR_ITEMS = [
  {
    id: 'ml',
    title: 'Mobile Legends',
    category: 'games',
    path: '/games/beli/ml',
    image: '/assets/product/Game/ML.jpeg',
    creator: 'Moonton',
    startingPrice: 'Rp 20.000',
    tag: 'Terlaris',
  },
  {
    id: 'dn',
    title: 'DANA',
    category: 'emoney',
    path: '/emoney/beli/dn',
    image: '/assets/product/E-Wallet/DN.png',
    creator: 'PT Espay Debit Indonesia',
    startingPrice: 'Rp 10.000',
    tag: 'Bebas Admin',
  },
  {
    id: 'tkl',
    title: 'Pulsa Telkomsel',
    category: 'pulsa',
    path: '/pulsa/beli/tkl',
    image: '/assets/product/Pulsa/TKL.png',
    creator: 'Telkomsel',
    startingPrice: 'Rp 10.000',
    tag: 'Promo',
  },
  {
    id: 'ff',
    title: 'Free Fire',
    category: 'games',
    path: '/games/beli/ff',
    image: '/assets/product/Game/FF.png',
    creator: 'Garena',
    startingPrice: 'Rp 6.000',
    tag: 'Populer',
  },
  {
    id: 'gp',
    title: 'GoPay',
    category: 'emoney',
    path: '/emoney/beli/gp',
    image: '/assets/product/E-Wallet/GP.png',
    creator: 'PT Dompet Anak Bangsa',
    startingPrice: 'Rp 10.000',
    tag: 'Instan',
  },
  {
    id: 'it',
    title: 'Pulsa Indosat',
    category: 'pulsa',
    path: '/pulsa/beli/it',
    image: '/assets/product/Pulsa/IT.png',
    creator: 'Indosat Ooredoo',
    startingPrice: 'Rp 10.000',
    tag: 'Hemat',
  },
];

function PopularSection() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Populer</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {POPULAR_ITEMS.map((item) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(item.path);
              }
            }}
            onClick={() => navigate(item.path)}
            className="group bg-slate-900/50 rounded-xl p-3 border border-slate-800/50 hover:border-slate-700 hover:bg-slate-900 transition cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.parentElement.querySelector('.popular-fallback');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="popular-fallback hidden absolute inset-0 bg-slate-800 items-center justify-center text-slate-400">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white text-sm group-hover:text-blue-400 transition truncate">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded flex-shrink-0">
                    {item.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {item.creator}
                </p>
                <p className="text-sm font-medium text-blue-400 font-mono mt-0.5">
                  {item.startingPrice}
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition flex-shrink-0 ml-2" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularSection;