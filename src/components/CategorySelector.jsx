import React from 'react';

const categories = [
  {
    id: 'games',
    name: 'Game',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'pulsa',
    name: 'Pulsa',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'emoney',
    name: 'E-Money',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  },
];

function CategorySelector({ selected = 'games', onSelect }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-4 ">
      {/* Header Section - Preserved as requested */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-900">
            Produk paling diminati saat ini
          </h2>
        </div>
        <p className="text-sm text-gray-600 ml-6">
          Temukan produk sesuai kebutuhan Anda
        </p>
      </div>
      {/* Compact Category Cards */}
      <div className="flex overflow-x-auto pb-2 sm:mx-0 sm:pb-0 sm:overflow-visible">
        <div className="flex flex-nowrap gap-2 sm:gap-4 w-full">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelect?.(category.id)}
              className={`flex-shrink-0 relative flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 w-[30%] min-w-[100px] sm:w-auto sm:min-w-[140px] ${
                selected === category.id
                  ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className={`flex-shrink-0 ${
                selected === category.id ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
              }`}>
                {category.icon}
              </div>

              <div className="text-left overflow-hidden">
                <div className="font-medium text-sm whitespace-nowrap truncate">{category.name}</div>
                <div className={`text-xs mt-0.5 whitespace-nowrap truncate ${
                  selected === category.id ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {category.id === 'games' && 'Top-up Game'}
                  {category.id === 'pulsa' && 'Isi Pulsa'}
                  {category.id === 'emoney' && 'Saldo Digital'}
                </div>
              </div>

              {selected === category.id && (
                <div className="absolute top-0.5 -right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySelector;