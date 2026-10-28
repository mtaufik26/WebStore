import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../../data/dataProduct';
import { Search as SearchIcon, X, ChevronRight } from 'lucide-react';

const VALID_CATEGORIES = ['games', 'pulsa', 'emoney'];

function Search({ onSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const allProducts = useMemo(() => {
    return VALID_CATEGORIES.flatMap((category) => {
      const categoryData = data[category] || {};
      return Object.values(categoryData).map((item) => {
        const id =
          category === 'games'
            ? item.CategoryGame
            : category === 'pulsa'
            ? item.CategoryPulsa
            : category === 'emoney'
            ? item.CategoryEmoney
            : item.ID;

        const lowestPrice = item.topupOptions?.[0]?.price || 'Rp 10.000';

        return {
          id: id.toLowerCase(),
          title: item.title,
          image: item.image,
          creator: item.creator,
          category,
          lowestPrice,
          path: `/${category}/beli/${id.toLowerCase()}`,
        };
      });
    });
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return allProducts.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        (item.creator && item.creator.toLowerCase().includes(query)) ||
        item.category.toLowerCase().includes(query)
    );
  }, [allProducts, searchQuery]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClick = (product) => {
    if (!product?.path) return;
    navigate(product.path);
    setSearchQuery('');
    setIsOpen(false);
    if (onSelect) onSelect();
  };

  const handleKeyDown = (e) => {
    if (!isOpen || filteredProducts.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredProducts.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredProducts.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleClick(filteredProducts[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const getCategoryBadge = (cat) => {
    const label = { games: 'Game', pulsa: 'Pulsa', emoney: 'E-Money' }[cat] || cat;
    return (
      <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded flex-shrink-0">
        {label}
      </span>
    );
  };

  return (
    <div ref={containerRef} role="search" className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <SearchIcon className="w-4 h-4" />
        </div>
        <input
          ref={inputRef}
          type="text"
          id="site-search-input"
          aria-label="Cari produk game, pulsa, atau e-wallet"
          placeholder="Cari game, pulsa, saldo e-money... (Ctrl+K)"
          className="w-full pl-10 pr-10 py-2.5 bg-slate-900/50 hover:bg-slate-900 focus:bg-slate-900 border border-slate-700/60 hover:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-xs sm:text-sm text-slate-100 placeholder-slate-500 transition"
          value={searchQuery}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
        />
        {searchQuery && (
          <button
            type="button"
            aria-label="Hapus kata kunci pencarian"
            onClick={() => {
              setSearchQuery('');
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && searchQuery.trim() && (
        <div className="absolute left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-lg z-50 overflow-hidden text-slate-100">
          <div className="p-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 px-3">
            <span>Hasil pencarian "{searchQuery}"</span>
            <span className="text-slate-300 font-mono text-[11px]">{filteredProducts.length} produk</span>
          </div>

          <div className="max-h-80 overflow-y-auto p-1.5">
            {filteredProducts.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                <p className="font-semibold text-slate-200">Tidak ada produk ditemukan</p>
                <p className="text-xs text-slate-500 mt-1">Coba kata kunci seperti "Mobile Legends", "Telkomsel", atau "DANA"</p>
              </div>
            ) : (
              <ul className="space-y-1">
                {filteredProducts.map((product, idx) => (
                  <li key={product.path}>
                    <button
                      type="button"
                      onClick={() => handleClick(product)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg transition cursor-pointer text-left ${
                        idx === selectedIndex ? 'bg-slate-800 border border-slate-700' : 'hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-10 h-10 rounded-md object-cover border border-slate-800 flex-shrink-0 bg-slate-800"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-xs sm:text-sm font-semibold text-white truncate">
                              {product.title}
                            </p>
                            {getCategoryBadge(product.category)}
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {product.creator || 'Provider Resmi'} • <span className="font-medium text-blue-400 font-mono">Mulai {product.lowestPrice}</span>
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0 ml-2" />
                    </button>
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