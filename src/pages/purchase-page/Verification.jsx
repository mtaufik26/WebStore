import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";

// Utility functions for generating random codes
const generateRandomCode = (length) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const generatePaymentCode = (length) => {
  const digits = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += digits[Math.floor(Math.random() * digits.length)];
  }
  return result;
};

const formatTimeLeft = (seconds) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hours} Jam ${minutes} Menit ${secs} Detik`;
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

function Verification() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg">Data tidak ditemukan</p>
        </div>
      </div>
    );
  }

  const {
    title,
    image,
    formData,
    selectedTopup,
    paymentFee,
    totalBayar,
    selectedMethod,
  } = state;

  // Generate invoice and payment codes
  const [invoiceCode] = useState(`INV-${generateRandomCode(16)}`);
  const [paymentCode] = useState(() => {
    if (selectedMethod?.category === "virtual-account") {
      return generatePaymentCode(16);
    } else if (selectedMethod?.category === "convenience-store") {
      return generatePaymentCode(13);
    }
    return null;
  });

  // Timer countdown (1 hour = 3600 seconds)
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const CopyButton = ({ text, label = "Copy" }) => (
    <button
      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 hover:underline"
      onClick={() => copyToClipboard(text)}
    >
      {label}
    </button>
  );

  const StatusBadge = ({ status, type }) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
    const statusClasses = {
      UNPAID: "bg-amber-100 text-amber-800",
      PENDING: "bg-blue-100 text-blue-800",
      EXPIRED: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`${baseClasses} ${statusClasses[status] || statusClasses.PENDING}`}>
        {status}
      </span>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Timer Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl shadow-lg inline-block">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg font-semibold">
                  {timeLeft > 0 ? formatTimeLeft(timeLeft) : "Waktu Habis"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Detail Pesanan</h2>
              </div>
              
              <div className="p-6">
                {/* Game Information */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <img
                      src={image}
                      alt={title}
                      className="w-20 h-20 rounded-xl object-cover shadow-md"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                    <p className="text-blue-600 font-medium">{selectedTopup?.name || "-"}</p>
                    <p className="text-sm text-gray-600">
                      User ID: <span className="font-semibold text-gray-800">{formData.userId}</span>
                    </p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-blue-50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Harga Item</span>
                    <span className="font-medium text-gray-800">{selectedTopup?.price || "Rp -"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Biaya Admin</span>
                    <span className="font-medium text-gray-800">Rp {paymentFee?.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="border-t border-blue-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-800">Total Pembayaran</span>
                      <span className="font-bold text-xl text-blue-600">
                        Rp {totalBayar?.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Informasi Pembayaran</h3>
              </div>

              <div className="p-6 space-y-6">
                {/* Payment Method */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Metode Pembayaran</h4>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="font-bold text-blue-800">{selectedMethod?.name || "-"}</p>
                  </div>
                </div>

                {/* Invoice Number */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Nomor Invoice</h4>
                  <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                    <span className="font-mono text-sm text-gray-800">{invoiceCode}</span>
                    <CopyButton text={invoiceCode} />
                  </div>
                </div>

                {/* Status Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Status Pembayaran</h4>
                    <StatusBadge status={timeLeft > 0 ? "UNPAID" : "EXPIRED"} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Status Transaksi</h4>
                    <StatusBadge status={timeLeft > 0 ? "PENDING" : "EXPIRED"} />
                  </div>
                </div>

                {/* Payment Instructions */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Panduan Pembayaran</h4>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      Silakan lakukan pembayaran dengan metode yang telah dipilih sebelum waktu habis.
                    </p>
                  </div>
                </div>

                {/* Payment Code Section */}
                {/* QRIS */}
                {selectedMethod?.category === "qris" && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Kode Pembayaran QR</h4>
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <div className="bg-white rounded-lg p-4 inline-block shadow-sm">
                        <img
                          src="/assets/QRIS.png"
                          alt="QR Code"
                          className="w-48 h-48 mx-auto"
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-3">
                        Scan QR Code menggunakan aplikasi e-wallet atau mobile banking
                      </p>
                    </div>
                  </div>
                )}

                {/* Virtual Account & Convenience Store */}
                {(selectedMethod?.category === "virtual-account" ||
                  selectedMethod?.category === "convenience-store") && paymentCode && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Kode Pembayaran</h4>
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4">
                      <div className="bg-white rounded-lg p-4 text-center">
                        <span className="font-mono text-2xl font-bold text-gray-800 tracking-wider">
                          {paymentCode}
                        </span>
                      </div>
                      <p className="text-sm text-blue-100 mt-3 text-center">
                        Gunakan kode ini untuk pembayaran di {selectedMethod?.name}
                      </p>
                    </div>
                  </div>
                )}

                {/* E-Wallet */}
                {selectedMethod?.category === "e-wallet" && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Pembayaran E-Wallet</h4>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        Pembayaran akan dilanjutkan melalui aplikasi {selectedMethod?.name} Anda.
                      </p>
                    </div>
                  </div>
                )}

                {/* Expired Message */}
                {timeLeft === 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-red-700 font-medium">
                        Waktu pembayaran telah habis. Silakan buat transaksi baru.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Verification;