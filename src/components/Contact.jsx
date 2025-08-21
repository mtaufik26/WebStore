import React from "react";

const Contact = ({ phoneNumber, handleInputChange }) => (
  <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 transition-all hover:shadow-xl">
    <div className="flex items-center mb-6">
      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3 shadow-sm">
        4
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Nomor WhatsApp</h3>
        <p className="text-sm text-gray-500 mt-1">Nomor aktif untuk konfirmasi pesanan</p>
      </div>
    </div>
    
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 font-medium">+62</span>
      </div>
      <input
        type="tel"
        placeholder="8123456789"
        value={phoneNumber}
        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
        className="w-full border-2 border-gray-200 px-4 py-3 pl-14 rounded-lg focus:outline-none 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all
                  placeholder-gray-400 text-gray-700"
        maxLength="15"
        pattern="[0-9]*"
        inputMode="numeric"
      />
      {phoneNumber && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            className="w-5 h-5 text-green-500"
          >
            <path 
              fillRule="evenodd" 
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      )}
    </div>
    
    <div className="mt-3 flex items-center text-sm text-gray-500">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor" 
        className="w-4 h-4 mr-1 flex-shrink-0"
      >
        <path 
          fillRule="evenodd" 
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" 
          clipRule="evenodd" 
        />
      </svg>
      <span className="italic font-semibold ">Pastikan nomor WhatsApp aktif untuk menerima notifikasi</span>
    </div>
  </div>
);

export default Contact;