import React, { useState, useEffect } from "react";

// Komponen Navbar sederhana (sesuaikan dengan yang ada)
const Navbar = () => (
  <nav className="bg-white shadow-lg border-b border-blue-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-blue-600">GameStore</h1>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

const generateRandomCode = (length) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('Kode berhasil disalin!');
  });
};

function VerificationSuccess({ orderData }) {
  // Simulasi fungsi navigate untuk demo
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    alert(`Akan navigasi ke: ${path}`);
  };
  
  // Demo data jika tidak ada state
  const demoData = {
    title: "Mobile Legends: Bang Bang",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop",
    formData: { userId: "123456789" },
    selectedTopup: { name: "275 Diamonds", price: "Rp 75.000" },
    paymentFee: 2500,
    totalBayar: 77500,
    selectedMethod: { name: "DANA", category: "e-wallet" }
  };

  const data = orderData || demoData;
  const {
    title,
    image,
    formData,
    selectedTopup,
    paymentFee,
    totalBayar,
    selectedMethod,
  } = data;

  // Generate transaction codes
  const [transactionCode] = useState(`TXN-${generateRandomCode(12)}`);
  const [invoiceCode] = useState(`INV-${generateRandomCode(16)}`);
  
  // Animation states
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Delay untuk animasi
    setTimeout(() => setShowContent(true), 500);
    setTimeout(() => setShowConfetti(true), 1000);
    
    // Auto hide confetti
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const CopyButton = ({ text, label = "Copy" }) => (
    <button
      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 hover:underline"
      onClick={() => copyToClipboard(text)}
    >
      {label}
    </button>
  );

  const Confetti = () => (
    <div className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-1000 ${showConfetti ? 'opacity-100' : 'opacity-0'}`}>
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        >
          <div className={`w-2 h-2 rounded-full ${
            ['bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-pink-400', 'bg-purple-400'][Math.floor(Math.random() * 5)]
          }`} />
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Navbar />
      <Confetti />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          
          {/* Success Header */}
          <div className={`text-center mb-8 transition-all duration-1000 transform ${
            showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="relative inline-block">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <svg className="w-12 h-12 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping" />
              <div className="absolute inset-2 rounded-full border-4 border-green-300 animate-pulse" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Pembayaran Berhasil!</h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Transaksi Anda telah diproses dengan sukses. Item akan segera masuk ke akun game Anda.
            </p>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-1000 delay-300 transform ${
            showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            
            {/* Transaction Summary */}
            <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Detail Transaksi
                </h2>
              </div>
              
              <div className="p-6">
                {/* Game Information */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <img
                      src={image}
                      alt={title}
                      className="w-20 h-20 rounded-xl object-cover shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                    <p className="text-green-600 font-semibold">{selectedTopup?.name || "-"}</p>
                    <p className="text-sm text-gray-600">
                      User ID: <span className="font-semibold text-gray-800">{formData.userId}</span>
                    </p>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-green-50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Harga Item</span>
                    <span className="font-medium text-gray-800">{selectedTopup?.price || "Rp -"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Biaya Admin</span>
                    <span className="font-medium text-gray-800">Rp {paymentFee?.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="border-t border-green-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-800">Total Dibayar</span>
                      <span className="font-bold text-xl text-green-600">
                        Rp {totalBayar?.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Transaction Info */}
                <div className="mt-6 space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Nomor Transaksi</h4>
                    <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                      <span className="font-mono text-sm text-gray-800">{transactionCode}</span>
                      <CopyButton text={transactionCode} />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Nomor Invoice</h4>
                    <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                      <span className="font-mono text-sm text-gray-800">{invoiceCode}</span>
                      <CopyButton text={invoiceCode} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment & Status Info */}
            <div className="space-y-6">
              
              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Informasi Pembayaran</h3>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Metode Pembayaran</h4>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="font-bold text-blue-800">{selectedMethod?.name || "-"}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Waktu Transaksi</h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-800">{new Date().toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Status</h4>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      BERHASIL
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Langkah Selanjutnya</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-purple-600">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Item akan diproses otomatis</p>
                        <p className="text-xs text-gray-600">Biasanya dalam 1-5 menit</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-purple-600">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Cek akun game Anda</p>
                        <p className="text-xs text-gray-600">Restart game jika item belum masuk</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-purple-600">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Simpan bukti transaksi</p>
                        <p className="text-xs text-gray-600">Screenshot halaman ini sebagai bukti</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`mt-8 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 transform ${
            showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200"
            >
              Kembali ke Beranda
            </button>
            
            <button
              onClick={() => navigate('/history')}
              className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl shadow-lg hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-200"
            >
              Lihat Riwayat Transaksi
            </button>
          </div>

          {/* Contact Support */}
          <div className={`mt-8 text-center transition-all duration-1000 delay-700 transform ${
            showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="text-sm text-gray-600">
              Butuh bantuan? Hubungi{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                Customer Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerificationSuccess;