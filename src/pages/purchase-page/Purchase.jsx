import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import dataProduct from "../../components/data/dataProduct";
import PaymentSection from "../../components/PaymentSection";
import UserId from "../../components/UserId";
import CardTopup from "../../components/CardTopup";
import Contact from "../../components/Contact";
import CodePromo from "../../components/CodePromo";

function Purchase() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const lowerId = id.toLowerCase();

  const [formData, setFormData] = useState({
    userId: "",
    zoneId: "",
    phoneNumber: "",
    promo: ""
  });

  const [selectedTopup, setSelectedTopup] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [style, setStyle] = useState("style1");
  const [selectedMethod, setSelectedMethod] = useState(null);

  const categoryFromPath = location.pathname.split('/')[1];
  const categoryMap = {
    game: 'CategoryGame',
    pulsa: 'CategoryPulsa',
    emoney: 'CategoryEmoney',
  };
  const idField = categoryMap[categoryFromPath] || 'CategoryGame';
  const productCategoryKey = categoryFromPath === 'game' ? 'games' : categoryFromPath;

  const currentGameData = Object.values(dataProduct[productCategoryKey] || {}).find(
    (item) => item[idField]?.toLowerCase() === lowerId
  );

  if (!currentGameData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
          <div className="text-center bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Produk Tidak Ditemukan
            </h2>
            <p className="text-gray-600">
              Maaf, produk yang Anda cari tidak tersedia.
            </p>
          </div>
        </div>
      </>
    );
  }

  const {
    currency,
    currencyIcon,
    idFields,
    topupOptions,
    guide,
    title,
    image,
    background,
    creator
  } = currentGameData;

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const requiredFields = idFields.map(field => field.name);
  const isFormValid =
    requiredFields.every(field => formData[field]?.trim() !== "") &&
    selectedTopup !== null &&
    selectedMethod !== null &&
    formData.phoneNumber.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Mohon lengkapi semua field yang diperlukan sebelum membeli!");
      return;
    }

    const totalHarga =
      selectedTopup
        ? parseInt(selectedTopup.price.replace(/\D/g, "")) + 1000
        : 1000;

    navigate(`/${categoryFromPath}/beli/${id}/Verification`, {
      state: {
        title,
        image,
        formData,
        selectedTopup,
        paymentFee: 1000,
        totalBayar: totalHarga,
        selectedMethod,
      },
    });
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section - Blue Theme */}
      <div className="h-[250px] md:h-[400px] bg-gradient-to-r relative z-0">
        <img
          src={background}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover  z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r z-10" />
        <div className="absolute inset-0 bg-gradient-to-t z-20" />
      </div>

      {/* Product Card - Blue White Theme */}
      <div className="relative z-30 -mt-16 md:-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="flex items-start gap-4 sm:gap-6 bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-blue-100">
            {/* Image on the left */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-4 border-blue-200 shadow-lg flex-shrink-0">
              <img src={image} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent" />
            </div>
            
            {/* Content on the right */}
            <div className="text-gray-800 flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-blue-600 mt-1 mb-2 font-medium">
                {creator}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-1 sm:gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                  <span className="text-blue-600 text-base sm:text-lg">⚡</span>
                  <span className="text-blue-700">Proses 1-60 Detik</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                  <span className="text-blue-600 text-base sm:text-lg">🎧</span>
                  <span className="text-blue-700">CS: 09.00-21.00 WIB</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                  <span className="text-blue-600 text-base sm:text-lg">🌏</span>
                  <span className="text-blue-700">Region: Indonesia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Blue White Theme */}
      <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-5 sm:gap-8">
              {/* Left Column - Form Sections */}
              <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
                <UserId
                  idFields={idFields}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  guide={guide}
                />
                
                <CardTopup
                  topupOptions={topupOptions}
                  selectedTopup={selectedTopup}
                  setSelectedTopup={setSelectedTopup}
                  currencyIcon={currencyIcon}
                />
                
                <PaymentSection
                  selectedMethod={selectedMethod}
                  setSelectedMethod={setSelectedMethod}
                  selectedTopup={selectedTopup}
                />
                
                <Contact
                  phoneNumber={formData.phoneNumber}
                  handleInputChange={handleInputChange}
                />
                
                <CodePromo
                  promo={formData.promo}
                  handleInputChange={handleInputChange}
                />
                
                {/* Submit Button with Blue Theme */}
                <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 border border-blue-100">
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all transform shadow-lg ${
                      isFormValid
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:scale-[1.02] hover:shadow-xl'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span>Beli Sekarang</span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Column - Order Summary with Blue Theme */}
              <div className="w-full lg:w-1/3 space-y-4 sm:space-y-6">
                <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 border border-blue-100 sticky top-4 sm:top-20 z-10">
                  {/* Header */}
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">Detail Pesanan</h3>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                    <div className="flex justify-between items-center py-2 border-b border-blue-50">
                      <span className="text-gray-600">Produk:</span>
                      <span className="font-semibold text-gray-800 text-right">{title}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-blue-50">
                      <span className="text-gray-600">Item:</span>
                      <span className="font-semibold text-gray-800 text-right">
                        {selectedTopup ? selectedTopup.name : "Belum dipilih"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-blue-50">
                      <span className="text-gray-600">Harga:</span>
                      <span className="font-semibold text-blue-600">
                        {selectedTopup ? selectedTopup.price : "Rp 0"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-blue-50">
                      <span className="text-gray-600">Biaya Admin:</span>
                      <span className="font-semibold text-gray-800">Rp 1.000</span>
                    </div>
                    
                    {/* Total */}
                    <div className="bg-blue-50 rounded-lg p-3 sm:p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800">Total Bayar:</span>
                        <span className="font-bold text-xl text-blue-600">
                          {selectedTopup
                            ? `Rp ${(parseInt(selectedTopup.price.replace(/\D/g, '')) + 1000).toLocaleString('id-ID')}`
                            : "Rp 1.000"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Benefits Section */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="flex items-center mb-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-semibold text-blue-800 text-sm sm:text-base">Keuntungan Berbelanja</span>
                    </div>
                    <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
                      <li className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                        <span>Proses otomatis & cepat</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                        <span>Harga terjangkau</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                        <span>Customer service 24/7</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                        <span>Transaksi aman</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                        <span>Banyak promo menarik</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                        <span>Garansi uang kembali</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Purchase;