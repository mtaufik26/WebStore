// src/components/gameSteps/CardTopup.jsx
import React from "react";

const CardTopup = ({ topupOptions, selectedTopup, setSelectedTopup, currencyIcon }) => (
  <div className="bg-white rounded-lg p-5 border border-gray-200">
    <div className="flex items-center mb-5">
      <div className="w-8 h-8 bg-blue-600 text-white rounded-md flex items-center justify-center font-medium mr-3">2</div>
      <h3 className="text-lg font-semibold text-gray-800">Pilih Nominal Top Up</h3>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {topupOptions.map((item) => (
        <div
          key={item.id}
          className={`border rounded-lg p-3 cursor-pointer transition-colors ${
            selectedTopup?.id === item.id
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => setSelectedTopup(item)}
        >
          {selectedTopup?.id === item.id && (
            <div className="ml-auto w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center mb-1">
              <svg className="w-2 h-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          <div className="text-center">
            <div className="font-bold text-gray-800">
              {currencyIcon} {item.name.split(' ')[0]}
            </div>
            {item.bonus && (
              <div className="text-xs text-green-600 mt-1">{item.bonus}</div>
            )}
            <div className="text-sm font-semibold text-blue-600 mt-1">
              {item.price}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CardTopup;
