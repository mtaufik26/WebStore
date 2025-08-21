import React from 'react';

// Data produk
const PRODUCTS = [
  {
    id: 1,
    title: 'Top-Up MLBB',
    image: 'https://via.placeholder.com/150x100?text=MLBB',
    creator: 'Moonton',
  },
  {
    id: 2,
    title: 'Pulsa Telkomsel',
    image: 'https://via.placeholder.com/150x100?text=Pulsa+Telkomsel',
    creator: 'Telkomsel',
  },
  {
    id: 4,
    title: 'Token PLN',
    image: 'https://via.placeholder.com/150x100?text=Token+PLN',
    creator: 'PLN Indonesia',
  },
];

// Komponen kartu produk
const ProductCard = ({ product }) => (
  <div className="group bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
    <div className="flex items-center p-4 space-x-4">
      <div className="relative flex-shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-16 h-12 object-cover rounded-lg ring-1 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300"
          loading="lazy"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 truncate">
          {product.creator}
        </p>
      </div>
      
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
);

// Komponen utama
function PopularSection() {
  return (
    <section className="max-w-7xl mx-auto py-4 px-4">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-900">
            Populer Hari Ini
          </h2>
        </div>
        <p className="text-sm text-gray-600 ml-6">
          Produk terpopuler di semua kategori
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default PopularSection;