import React from "react";

const UserId = ({ idFields, formData, handleInputChange, guide }) => (
  <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 bg-blue-600 text-white rounded-md flex items-center justify-center text-sm font-bold mr-3">1</div>
      <h3 className="text-lg font-semibold text-gray-800">Masukkan User ID</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {idFields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              value={formData[field.name] || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="">{field.placeholder}</option>
              {field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.name === "phoneNumber" ? "tel" : "number"}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          )}
        </div>
      ))}
    </div>
    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
      <p className="text-sm text-blue-700">
        <strong>Cara menemukan User ID:</strong> {guide}
      </p>
    </div>
  </div>
);

export default UserId;
