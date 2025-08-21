import React, { useState } from "react";
import { Info, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import data from "../components/data/dataProduct"; // Pastikan path ini sesuai dengan struktur folder Anda

const CodePromo = ({ promo, handleInputChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const validatePromo = () => {
    setIsChecking(true);

    setTimeout(() => {
      // Ambil kode dari data
      const validCodes = Object.values(data.codepromo).map((item) => item.code.toUpperCase());

      const isValidPromo = validCodes.includes(promo.toUpperCase());

      setIsValid(isValidPromo);
      setIsChecking(false);
    }, 800);
  };

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase();
    handleInputChange("promo", value);
    setIsValid(null); // reset validasi saat mengetik
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-all">
      <div className="flex items-start mb-6">
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3 shadow-sm">
          5
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Kode Promo</h3>
          <p className="text-sm text-gray-500 mt-1">Masukkan kode promo jika memiliki (opsional)</p>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Contoh: kode123"
            value={promo}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full border-2 ${
              isValid === false
                ? "border-red-500"
                : isValid
                ? "border-green-500"
                : "border-gray-200"
            } px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400 text-gray-700 uppercase tracking-wider`}
            maxLength="12"
          />

          {promo && isValid !== null && (
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              {isValid ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          )}
        </div>

        <button
          onClick={validatePromo}
          disabled={!promo || isChecking}
          className={`flex-shrink-0 px-4 rounded-lg flex items-center justify-center transition-all
            ${!promo || isChecking ? "bg-gray-200 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
            ${isValid ? "!bg-green-500 hover:!bg-green-600" : ""}
            ${isValid === false ? "!bg-red-500 hover:!bg-red-600" : ""}`}
        >
          {isChecking ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : isValid ? (
            <CheckCircle2 className="w-5 h-5 text-white" />
          ) : isValid === false ? (
            <XCircle className="w-5 h-5 text-white" />
          ) : (
            <ChevronRight className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Pesan validasi */}
      {isValid === null && (
        <div className="mt-2 flex items-start text-sm text-gray-600">
          <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
          <span>Kode promo biasanya terdiri dari 6–12 karakter (huruf dan angka).</span>
        </div>
      )}

      {isValid === false && (
        <div className="mt-3 flex items-start text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          <XCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
          <span>Kode promo tidak valid. Harap masukkan kode yang benar.</span>
        </div>
      )}

      {isValid === true && (
        <div className="mt-3 flex items-start text-sm text-green-600 bg-green-50 p-3 rounded-lg">
          <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
          <span>Kode promo valid! Diskon akan diterapkan saat checkout.</span>
        </div>
      )}
    </div>
  );
};

export default CodePromo;
