import React from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../../components/data/dataProduct';

function ProductGrid({ category = 'games' }) {
  const navigate = useNavigate();

  const validCategories = ['games', 'pulsa', 'emoney'];
  const selectedCategory = validCategories.includes(category) ? category : 'games';

  const categoryData = data[selectedCategory] || {};

  // Ubah object ke array
  const productList = Object.entries(categoryData).map(([key, value]) => ({
    ...value,
    id: key, // Gunakan nama produk sebagai ID unik
  }));

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'games':
        return 'Game';
      case 'pulsa':
        return 'Pulsa';
      case 'emoney':
        return 'E-Money';
      default:
        return '';
    }
  };

  const handleClick = (productId) => {
    navigate(`/${selectedCategory}/beli/${productId}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Produk {getCategoryLabel(selectedCategory)}
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
      </div>

      {/* Grid */}
      {productList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {productList.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleClick(product.id)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || '/images/default.jpg'}
                  alt={product.title || 'Produk'}
                  onError={(e) => { e.target.src = '/images/default.jpg'; }}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  {product.title || 'Nama Produk'}
                </h3>
                <p className="text-gray-500 text-sm">{product.creator || 'Unknown'}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          Tidak ada produk yang tersedia untuk kategori ini.
        </div>
      )}

      {/* Tombol Lihat Semua */}
      {productList.length > 0 && (
        <div className="mt-12 flex justify-center">
          <button
            className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full transition-all duration-300"
            onClick={() => navigate(`/${selectedCategory}`)}
          >
            Lihat Semua Produk {getCategoryLabel(selectedCategory)}
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}

export default ProductGrid;
