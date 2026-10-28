import React from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../../data/dataProduct';
import { Zap, ChevronRight, Gamepad2, Smartphone, Wallet } from 'lucide-react';

function ProductGrid({ category = 'games' }) {
  const navigate = useNavigate();

  const validCategories = ['games', 'pulsa', 'emoney'];
  const selectedCategory = validCategories.includes(category) ? category : 'games';

  const categoryData = data[selectedCategory] || {};

  const productList = Object.entries(categoryData).map(([key, value]) => {
    const id =
      selectedCategory === 'games'
        ? value.CategoryGame
        : selectedCategory === 'pulsa'
        ? value.CategoryPulsa
        : selectedCategory === 'emoney'
        ? value.CategoryEmoney
        : key;

    const startingPrice = value.topupOptions?.[0]?.price || 'Rp 10.000';

    return {
      ...value,
      id,
      startingPrice,
    };
  });

  const categoryTitle = {
    games: 'Game Online',
    pulsa: 'Pulsa & Data',
    emoney: 'E-Money',
  };

  const CategoryIcon = {
    games: Gamepad2,
    pulsa: Smartphone,
    emoney: Wallet,
  }[selectedCategory] || Gamepad2;

  const handleClick = (productId) => {
    if (!productId) return;
    navigate(`/${selectedCategory}/beli/${productId.toLowerCase()}`);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white">
            {categoryTitle[selectedCategory] || 'Produk'}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {productList.length} produk tersedia
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {productList.map((product) => (
          <div
            key={product.id}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick(product.id);
              }
            }}
            onClick={() => handleClick(product.id)}
            className="group bg-slate-900/50 rounded-xl border border-slate-800/50 hover:border-slate-700 hover:bg-slate-900 transition cursor-pointer overflow-hidden flex flex-col"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title || 'Produk'}
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.parentElement.querySelector('.image-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div
                className="image-fallback hidden absolute inset-0 bg-slate-800 items-center justify-center text-slate-400 flex-col gap-1 p-2 text-center"
              >
                <CategoryIcon className="w-6 h-6" />
                <span className="text-xs truncate max-w-full">{product.title}</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col flex-1 justify-between gap-2">
              <div>
                <h3 className="font-semibold text-sm text-white group-hover:text-blue-400 transition line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {product.creator || 'Provider Resmi'}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/50 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Mulai</span>
                  <span className="text-sm font-medium text-blue-400 font-mono">
                    {product.startingPrice}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
