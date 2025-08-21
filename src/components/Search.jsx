import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../components/data/dataProduct';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const validCategories = ['games', 'pulsa', 'emoney'];

  const allProducts = useMemo(() => {
    return validCategories.flatMap(category => {
      const categoryData = data[category] || {};
      return Object.values(categoryData).map(item => {
        const id =
          category === 'games'
            ? item.CategoryGame
            : category === 'pulsa'
            ? item.CategoryPulsa
            : category === 'emoney'
            ? item.CategoryEmoney
            : item.ID;

        return {
          id: id.toLowerCase(),
          title: item.title,
          image: item.image,
          category,
          path: `/${category}/beli/${id.toLowerCase()}`
        };
      });
    });
  }, []);

  const filteredProducts = allProducts.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClick = (product) => {
    if (!product?.id || !product?.category) return;
    navigate(product.path);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className="h-5 w-5 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Cari produk atau game..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchQuery && (
        <div className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="max-h-64 overflow-y-auto border-t pt-2">
            {filteredProducts.length === 0 ? (
              <div className="px-2 py-2 text-sm text-gray-500">
                Tidak ada hasil ditemukan untuk "{searchQuery}"
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {filteredProducts.map((product, index) => (
                  <li key={index}>
                    <div
                      onClick={() => handleClick(product)}
                      className="flex items-center px-2 py-2 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-8 h-8 rounded-md mr-3 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder-image.png';
                        }}
                      />
                      <span className="text-sm text-gray-800 font-medium">
                        {product.title}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;