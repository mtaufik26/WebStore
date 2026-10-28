import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Clock,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
  QrCode,
  Building2,
  Wallet,
  Store,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const generateRandomCode = (length) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const generatePaymentCode = (category) => {
  if (category === "virtual-account") {
    let digits = "8800";
    for (let i = 0; i < 12; i++) {
      digits += Math.floor(Math.random() * 10);
    }
    return digits;
  }
  if (category === "convenience-store") {
    let digits = "ALF";
    for (let i = 0; i < 10; i++) {
      digits += Math.floor(Math.random() * 10);
    }
    return digits;
  }
  return null;
};

const formatTimeLeft = (seconds) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${secs}`;
};

function Verification() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [invoiceCode] = useState(() => `INV-${new Date().getFullYear()}${generateRandomCode(10)}`);
  const [paymentCode] = useState(() =>
    state?.selectedMethod ? generatePaymentCode(state.selectedMethod.category) : null
  );
  const [timeLeft, setTimeLeft] = useState(3600);
  const [copiedField, setCopiedField] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [expandedGuide, setExpandedGuide] = useState(true);

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

  const handleCopy = (text, fieldName) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  if (!state) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center bg-slate-900 rounded-xl p-8 max-w-md w-full border border-slate-800">
            <div className="w-14 h-14 mx-auto mb-4 bg-amber-950/40 rounded-full flex items-center justify-center text-amber-400 border border-amber-800/40">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Sesi Transaksi Tidak Ditemukan</h2>
            <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
              Anda belum memilih produk atau data sesi transaksi ini telah kedaluwarsa.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-xs sm:text-sm transition"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const {
    category = "games",
    productId = "",
    title,
    image,
    formData = {},
    selectedTopup,
    paymentFee = 0,
    discount = 0,
    appliedPromo,
    totalBayar = 0,
    selectedMethod,
  } = state;

  const renderTargetInfo = () => {
    if (formData.phoneNumber && (!formData.userId || category === "pulsa")) {
      return (
        <div>
          <span className="text-slate-400 text-xs">Nomor Tujuan:</span>
          <p className="font-mono text-sm font-semibold text-white">{formData.phoneNumber}</p>
        </div>
      );
    }
    if (formData.accountNumber) {
      return (
        <div>
          <span className="text-slate-400 text-xs">Nomor Akun:</span>
          <p className="font-mono text-sm font-semibold text-white">{formData.accountNumber}</p>
        </div>
      );
    }
    if (formData.riotId) {
      return (
        <div>
          <span className="text-slate-400 text-xs">Riot ID:</span>
          <p className="font-mono text-sm font-semibold text-white">{formData.riotId}</p>
        </div>
      );
    }
    return (
      <div>
        <span className="text-slate-400 text-xs">Data Akun:</span>
        <p className="font-mono text-sm font-semibold text-white">
          {formData.userId}
          {formData.zoneId ? ` (${formData.zoneId})` : ""}
          {formData.server ? ` - ${formData.server}` : ""}
        </p>
      </div>
    );
  };

  const handleCheckPayment = () => {
    setIsVerifying(true);
    setStatusMessage("Menghubungi sistem provider untuk memverifikasi pembayaran...");

    setTimeout(() => {
      setIsVerifying(false);

      navigate(`/${category}/beli/${productId}/verificationsuccess`, {
        state: {
          category,
          productId,
          title,
          image,
          formData,
          selectedTopup,
          paymentFee,
          discount,
          appliedPromo,
          totalBayar,
          selectedMethod,
          invoiceCode,
          paymentCode,
          transactionDate: new Date().toISOString(),
          status: "SUCCESS",
        },
      });
    }, 1400);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
        {/* Top Status Banner */}
        <div className={`rounded-xl p-5 border mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${
          timeLeft === 0 ? "bg-rose-950/40 border-rose-800/40" : "bg-slate-900 border-slate-800"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
              timeLeft === 0
                ? "bg-rose-950 text-rose-400 border border-rose-800/50"
                : "bg-amber-950/40 text-amber-400 border border-amber-800/40"
            }`}>
              {timeLeft === 0 ? (
                <AlertCircle className="w-5 h-5" />
              ) : (
                <Clock className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                  timeLeft === 0
                    ? "text-rose-400 bg-rose-950 border border-rose-800/60"
                    : "text-amber-400 bg-amber-950 border border-amber-800/60"
                }`}>
                  {timeLeft === 0 ? "Batas Waktu Habis" : "Menunggu Pembayaran"}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  {invoiceCode}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white mt-1">
                {timeLeft === 0 ? "Transaksi Kedaluwarsa" : "Selesaikan Pembayaran"}
              </h1>
            </div>
          </div>

          {/* Countdown Clock Box */}
          <div className={`text-white px-4 py-2.5 rounded-lg flex items-center gap-3 border ${
            timeLeft === 0
              ? "bg-rose-950 border-rose-800/60"
              : "bg-slate-950 border-slate-800"
          }`}>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Batas Waktu:</span>
            <span className="font-mono text-lg sm:text-xl font-bold tracking-wider text-amber-400">
              {timeLeft > 0 ? formatTimeLeft(timeLeft) : "00:00:00"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Payment Details & Instructions */}
          <div className="lg:col-span-7 space-y-5">
            {/* Payment Code / Method Card */}
            <div className="bg-slate-900 rounded-xl p-5 sm:p-6 border border-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <div className="flex items-center gap-2">
                  {selectedMethod?.category === "qris" ? (
                    <QrCode className="w-4 h-4 text-blue-400" />
                  ) : selectedMethod?.category === "virtual-account" ? (
                    <Building2 className="w-4 h-4 text-blue-400" />
                  ) : selectedMethod?.category === "e-wallet" ? (
                    <Wallet className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Store className="w-4 h-4 text-blue-400" />
                  )}
                  <h2 className="font-bold text-white text-sm sm:text-base">
                    Metode: {selectedMethod?.name}
                  </h2>
                </div>
                <div className="bg-white/95 rounded-md px-2 py-0.5 border border-slate-200/50 flex items-center justify-center">
                  <img
                    src={selectedMethod?.logo}
                    alt={selectedMethod?.name}
                    className="h-4 max-w-[65px] object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>

              {/* Expired State */}
              {timeLeft === 0 ? (
                <div className="py-6 text-center bg-rose-950/40 rounded-xl border border-rose-800/40 p-5 space-y-3">
                  <div className="w-12 h-12 bg-rose-950 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-800/60">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">Tagihan Telah Kedaluwarsa</h3>
                  <p className="text-xs text-rose-300 max-w-md mx-auto leading-relaxed">
                    Batas waktu pembayaran untuk invoice <strong className="font-mono text-white">{invoiceCode}</strong> telah berakhir. Silakan buat pesanan baru.
                  </p>
                  <div className="pt-2">
                    <Link
                      to={`/${category}/beli/${productId}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Buat Pesanan Baru</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {/* QRIS Display */}
                  {selectedMethod?.category === "qris" && (
                    <div className="text-center py-2">
                      <div className="inline-block p-3 bg-white border border-slate-300 rounded-2xl mb-4 max-w-full">
                        <img
                          src="/assets/QRIS.png"
                          alt="QRIS Standar Nasional"
                          className="w-44 h-44 sm:w-52 sm:h-52 mx-auto object-contain"
                        />
                      </div>
                      <p className="font-semibold text-white text-sm">
                        Pindai kode QRIS dengan aplikasi e-Wallet atau Mobile Banking Anda
                      </p>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        Mendukung BCA, Mandiri, BRI, BNI, GoPay, OVO, DANA, ShopeePay, dan seluruh bank.
                      </p>
                    </div>
                  )}

                  {/* Virtual Account / Minimarket Code Display */}
                  {(selectedMethod?.category === "virtual-account" ||
                    selectedMethod?.category === "convenience-store") &&
                    paymentCode && (
                      <div className="space-y-2.5">
                        <label className="block text-xs font-medium uppercase tracking-wider text-slate-400">
                          {selectedMethod.category === "virtual-account"
                            ? "Nomor Virtual Account (VA)"
                            : "Kode Pembayaran Kasir"}
                        </label>

                        <div className="bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <span className="font-mono text-lg sm:text-xl font-bold text-blue-400 tracking-wider break-all">
                            {paymentCode}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(paymentCode, "paymentCode")}
                            className="self-end sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition cursor-pointer flex-shrink-0"
                          >
                            {copiedField === "paymentCode" ? (
                              <>
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                <span>Tersalin</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Salin</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-400">
                          {selectedMethod.category === "virtual-account"
                            ? "Transfer sesuai nominal tepat ke nomor VA di atas sebelum waktu batas habis."
                            : `Tunjukkan kode pembayaran ini kepada kasir ${selectedMethod.name} terdekat.`}
                        </p>
                      </div>
                    )}

                  {/* E-Wallet Notice */}
                  {selectedMethod?.category === "e-wallet" && (
                    <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                      <p className="text-xs font-semibold text-white mb-1">
                        Petunjuk Pembayaran {selectedMethod.name}:
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Buka aplikasi {selectedMethod.name} pada ponsel Anda yang terdaftar pada nomor{" "}
                        <strong className="font-mono text-white">+62 {formData.contactPhone}</strong> untuk melakukan otorisasi pembayaran.
                      </p>
                    </div>
                  )}

                  {/* How to Pay Guide */}
                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setExpandedGuide(!expandedGuide)}
                      className="w-full flex items-center justify-between text-xs font-medium text-slate-400 hover:text-white cursor-pointer mb-2"
                    >
                      <span>Panduan Pembayaran</span>
                      {expandedGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {expandedGuide && (
                      <ol className="space-y-1.5 text-xs text-slate-300 list-decimal list-inside bg-slate-950 p-3.5 rounded-lg border border-slate-800 leading-relaxed">
                        <li>Jumlah pembayaran tepat <strong className="text-white">Rp {totalBayar.toLocaleString("id-ID")}</strong> tanpa pembulatan.</li>
                        <li>Selesaikan pembayaran sebelum batas waktu berakhir.</li>
                        <li>Setelah transfer berhasil, klik tombol <strong>"Saya Sudah Membayar"</strong> di bawah.</li>
                      </ol>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-3">
              {timeLeft === 0 ? (
                <Link
                  to={`/${category}/beli/${productId}`}
                  className="w-full py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Buat Pesanan Baru</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleCheckPayment}
                  disabled={isVerifying}
                  className="w-full py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer disabled:bg-slate-800 disabled:text-slate-500 disabled:border disabled:border-slate-700/60"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Memverifikasi Pembayaran...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Saya Sudah Membayar (Cek Status)</span>
                    </>
                  )}
                </button>
              )}

              {statusMessage && (
                <p className="text-xs text-center text-blue-400 font-medium animate-pulse">
                  {statusMessage}
                </p>
              )}

              <div className="flex items-center justify-between pt-1">
                <Link
                  to={`/${category}/beli/${productId}`}
                  className="text-xs text-slate-400 hover:text-white font-medium inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Ubah Pesanan</span>
                </Link>

                <span className="text-[11px] text-slate-500">
                  Verifikasi otomatis 24 Jam
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 sticky top-24 space-y-4 text-slate-100">
              <div className="flex items-center gap-2 pb-3.5 border-b border-slate-800">
                <h3 className="font-bold text-white text-base">Rincian Tagihan</h3>
              </div>

              {/* Product Info */}
              <div className="flex items-center gap-3">
                <img
                  src={image}
                  alt={title}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-700 flex-shrink-0"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{title}</h4>
                  <p className="text-xs font-medium text-blue-400">
                    {selectedTopup?.name || "-"}
                  </p>
                </div>
              </div>

              {/* Target Account Info */}
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                {renderTargetInfo()}
                {formData.contactPhone && (
                  <div>
                    <span className="text-slate-400 text-xs">WhatsApp:</span>
                    <p className="font-mono text-xs font-semibold text-white">
                      +62 {formData.contactPhone}
                    </p>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Harga Layanan:</span>
                  <span className="font-medium text-white font-mono">
                    {selectedTopup?.price || "Rp 0"}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Diskon Promo:</span>
                    <span className="font-mono">- Rp {discount.toLocaleString("id-ID")}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Biaya Admin ({selectedMethod?.name}):</span>
                  <span className="font-medium text-white font-mono">
                    {paymentFee === 0 ? "Gratis" : `Rp ${paymentFee.toLocaleString("id-ID")}`}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="font-bold text-white text-sm">Total Tagihan:</span>
                  <span className="font-bold text-blue-400 font-mono text-lg">
                    Rp {totalBayar.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Invoice Number with Copy Button */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-medium text-slate-400 block">
                    Nomor Invoice
                  </span>
                  <p className="font-mono text-xs font-semibold text-blue-400">{invoiceCode}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(invoiceCode, "invoice")}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium px-2.5 py-1 rounded hover:bg-slate-800 transition cursor-pointer"
                >
                  {copiedField === "invoice" ? "Tersalin" : "Salin"}
                </button>
              </div>

              <div className="pt-1 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Enkripsi SSL 256-Bit Dilindungi</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Verification;