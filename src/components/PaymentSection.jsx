import React, { useState } from "react";
import paymentMethods from "./data/metodePembayaran";

// Constants - disesuaikan dengan data yang ada
const CATEGORIES = [
  { key: "qris", label: "QRIS" }, // tambahkan ini
  { key: "e-wallet", label: "E-Wallet" },
  { key: "virtual-account", label: "Virtual Account" },
  { key: "convenience-store", label: "Minimarket" },
];


// Utility functions
const formatCurrency = (amount) => `Rp${amount.toLocaleString("id-ID")}`;

// Sub-components
const CategoryHeader = ({ category, isOpen, onToggle }) => (
  <div
    onClick={onToggle}
    className="flex justify-between items-center bg-gray-100 px-4 py-3 cursor-pointer hover:bg-gray-200 transition-colors"
  >
    <p className="font-medium text-gray-800">{category.label}</p>
    <span className="text-gray-600 transition-transform duration-200">
      {isOpen ? "▲" : "▼"}
    </span>
  </div>
);

const MethodLogos = ({ methods }) => (
  <div className="bg-gray-50 px-4 py-2 flex flex-wrap gap-3 border-t transition-all duration-300">
    {methods.map((method) => (
      <img
        key={method.code}
        src={method.logo}
        alt={method.name}
        className="w-8 h-8 object-contain"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    ))}
  </div>
);

const MethodCard = ({ method, isSelected, onSelect, selectedTopup }) => (
  <div
    onClick={() => onSelect(method)}
    className={`
      relative cursor-pointer border-2 rounded-lg p-4 flex flex-col items-center gap-3
      transition-all duration-300 ease-in-out
      hover:border-blue-400 hover:shadow-lg hover:scale-[1.02]
      active:scale-100
      ${
        isSelected
          ? "border-blue-500 bg-blue-50/50 shadow-md ring-1 ring-blue-200"
          : "border-gray-100 bg-gray-50 hover:bg-gray-50/80"
      }
    `}
  >
    {/* Selected indicator */}
    {isSelected && (
      <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    )}

    <div className="p-2 bg-white rounded-md border shadow-sm">
      <img
        src={method.logo}
        alt={method.name}
        className="w-10 h-10 object-contain"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    </div>

    <div className="text-center space-y-1">
      <p className="text-sm font-medium text-gray-700">{method.name}</p>
      
      {selectedTopup && (
        <p className="text-xs font-semibold text-blue-600">
          {selectedTopup.price}
        </p>
      )}

      <p className="text-[11px] text-gray-500">
        Biaya: <span className="font-medium">{formatCurrency(method.price)}</span>
      </p>
      
      {/* Tampilkan status aktif */}
      {!method.isActive && (
        <p className="text-[10px] text-red-500 font-medium">Tidak Aktif</p>
      )}
    </div>
  </div>
);

const MethodsGrid = ({
  methods,
  selectedMethod,
  onSelectMethod,
  selectedTopup,
}) => {
  // Filter hanya metode yang aktif
  const activeMethods = methods.filter(method => method.isActive);

  return (
    <div className="p-4 bg-white space-y-4 border-t transition-all duration-300">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {activeMethods.map((method) => (
          <MethodCard
            key={method.code}
            method={method}
            isSelected={selectedMethod?.code === method.code}
            onSelect={onSelectMethod}
            selectedTopup={selectedTopup}
          />
        ))}
      </div>
      
      {activeMethods.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Tidak ada metode pembayaran yang tersedia</p>
        </div>
      )}
    </div>
  );
};

const CategoryAccordion = ({
  category,
  isOpen,
  onToggle,
  selectedMethod,
  onSelectMethod,
  selectedTopup,
}) => {
  const methods = paymentMethods.filter(
    (method) => method.category === category.key
  );

  return (
    <div className="mb-4 border rounded-md overflow-hidden shadow-sm">
      <CategoryHeader category={category} isOpen={isOpen} onToggle={onToggle} />

      {!isOpen && <MethodLogos methods={methods} />}

      {isOpen && (
        <MethodsGrid
          methods={methods}
          selectedMethod={selectedMethod}
          onSelectMethod={onSelectMethod}
          selectedTopup={selectedTopup}
        />
      )}
    </div>
  );
};

const ProductPriceSection = ({ selectedMethod, selectedTopup }) => {
  if (!selectedMethod || !selectedTopup) return null;

  // Hitung total pembayaran
  const calculateTotal = () => {
    if (!selectedTopup.price) return selectedMethod.price;
    
    // Ekstrak angka dari string price (misal "Rp 10.000" -> 10000)
    const topupAmount = typeof selectedTopup.price === 'string' 
      ? parseInt(selectedTopup.price.replace(/[^\d]/g, '')) || 0
      : selectedTopup.price;
    
    return topupAmount + selectedMethod.price;
  };

  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <label className="block text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        Detail Pembayaran untuk{" "}
        <span className="text-blue-600">{selectedMethod.name}</span>
      </label>

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <img
            src={selectedMethod.logo}
            alt={selectedMethod.name}
            className="w-12 h-12 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        <div className="flex-1 space-y-3">
          <h3 className="font-semibold text-gray-900 text-lg">
            {selectedTopup.name}
            {selectedTopup.bonus && (
              <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {selectedTopup.bonus}
              </span>
            )}
          </h3>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-600">Harga:</div>
            <div className="font-medium text-blue-600 text-right">
              {selectedTopup.price}
            </div>
            
            <div className="text-gray-600">Biaya Admin:</div>
            <div className="font-medium text-orange-500 text-right">
              {formatCurrency(selectedMethod.price)}
            </div>
            
            <div className="text-gray-600 font-semibold border-t pt-2">Total:</div>
            <div className="font-bold text-green-600 text-right border-t pt-2">
              {formatCurrency(calculateTotal())}
            </div>
          </div>

          {/* Tampilkan deskripsi metode pembayaran */}
          {selectedMethod.description && (
            <div className="mt-3 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">{selectedMethod.description}</p>
            </div>
          )}

          {/* Tampilkan instruksi pembayaran */}
          {selectedMethod.instructions && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Cara Pembayaran:</p>
              <ol className="text-sm text-gray-600 space-y-1">
                {selectedMethod.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 font-medium mr-2">{index + 1}.</span>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Tampilkan batasan amount jika ada */}
          {(selectedMethod.minAmount || selectedMethod.maxAmount) && (
            <div className="mt-3 p-3 bg-yellow-50 rounded-md">
              <p className="text-sm text-yellow-800">
                <strong>Batasan:</strong>
                {selectedMethod.minAmount && ` Min: ${formatCurrency(selectedMethod.minAmount)}`}
                {selectedMethod.minAmount && selectedMethod.maxAmount && ' | '}
                {selectedMethod.maxAmount && ` Max: ${formatCurrency(selectedMethod.maxAmount)}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PaymentSection = ({
  selectedMethod,
  setSelectedMethod,
  selectedTopup,
}) => {
  const [openCategory, setOpenCategory] = useState(null);

  const handleCategoryToggle = (categoryKey) => {
    setOpenCategory(openCategory === categoryKey ? null : categoryKey);
  };

  const handleSelectMethod = (method) => {
    // Hanya izinkan memilih metode yang aktif
    if (method.isActive) {
      setSelectedMethod(method);
    }
  };

  // Hitung jumlah metode aktif per kategori
  const getActiveMethodsCount = (categoryKey) => {
    return paymentMethods.filter(method => 
      method.category === categoryKey && method.isActive
    ).length;
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-blue-600 text-white rounded-md flex items-center justify-center text-sm font-bold mr-3">
          3
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Pilih Metode Pembayaran
        </h3>
      </div>

      {/* Categories Accordion */}
      <div className="space-y-4">
        {CATEGORIES.map((category) => {
          const activeCount = getActiveMethodsCount(category.key);
          
          return (
            <div key={category.key}>
              <CategoryAccordion
                category={category}
                isOpen={openCategory === category.key}
                onToggle={() => handleCategoryToggle(category.key)}
                selectedMethod={selectedMethod}
                onSelectMethod={handleSelectMethod}
                selectedTopup={selectedTopup}
              />
              
              {/* Tampilkan jumlah metode aktif */}
              <div className="text-xs text-gray-500 mt-1 px-4">
                {activeCount} metode tersedia
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Price Section */}
      <ProductPriceSection
        selectedMethod={selectedMethod}
        selectedTopup={selectedTopup}
      />
    </div>
  );
};

export default PaymentSection;