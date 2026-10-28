import React, { useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import dataProduct from "../../data/dataProduct";
import PaymentSection from "../../components/purchase/PaymentSection";
import UserId from "../../components/purchase/UserId";
import CardTopup from "../../components/purchase/CardTopup";
import Contact from "../../components/purchase/Contact";
import CodePromo from "../../components/purchase/CodePromo";
import {
  ShieldCheck,
  Zap,
  ChevronRight,
  ArrowRight,
  Sparkles,
  AlertCircle,
  FileText,
  CheckCircle2,
  X,
} from "lucide-react";

function Purchase() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const lowerId = id ? id.toLowerCase() : "";

  const [formData, setFormData] = useState({
    userId: "",
    zoneId: "",
    riotId: "",
    accountNumber: "",
    phoneNumber: "",
    server: "",
    promo: "",
    contactPhone: "",
  });

  const [selectedTopup, setSelectedTopup] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rawCategory = location.pathname.split("/")[1] || "games";
  const categoryKey = rawCategory === "game" ? "games" : rawCategory;

  const categoryMap = {
    games: "CategoryGame",
    game: "CategoryGame",
    pulsa: "CategoryPulsa",
    emoney: "CategoryEmoney",
  };
  const idField = categoryMap[categoryKey] || "CategoryGame";

  const currentGameData = Object.values(dataProduct[categoryKey] || {}).find(
    (item) => item[idField]?.toLowerCase() === lowerId
  );

  if (!currentGameData) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center bg-slate-900 rounded-xl p-8 max-w-md w-full border border-slate-800">
            <div className="w-14 h-14 mx-auto mb-4 bg-rose-950/40 border border-rose-800/40 rounded-full flex items-center justify-center text-rose-400">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Layanan Tidak Ditemukan</h2>
            <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
              Produk dengan kode "{id}" tidak ditemukan atau sedang dalam pemeliharaan.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-xs sm:text-sm hover:bg-blue-500 transition"
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
    currency = "",
    idFields = [],
    topupOptions = [],
    guide,
    title,
    image,
    background,
    creator,
  } = currentGameData;

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError("");
  };

  const handleUseDestinationNumber = () => {
    if (formData.phoneNumber) {
      let cleaned = String(formData.phoneNumber).replace(/[^\d]/g, "");
      if (cleaned.startsWith("62")) cleaned = cleaned.slice(2);
      if (cleaned.startsWith("0")) cleaned = cleaned.replace(/^0+/, "");
      handleInputChange("contactPhone", cleaned);
    }
  };

  const handlePromoApplied = (promoObj) => {
    setAppliedPromo(promoObj);
  };

  const rawItemPrice = selectedTopup
    ? parseInt(String(selectedTopup.price).replace(/[^\d]/g, ""), 10) || 0
    : 0;

  let discount = 0;
  if (appliedPromo && rawItemPrice > 0) {
    if (appliedPromo.code === "PROMO10") {
      discount = Math.round(rawItemPrice * 0.1);
    } else if (appliedPromo.discountAmount) {
      discount = Math.min(rawItemPrice, appliedPromo.discountAmount);
    } else {
      discount = Math.round(rawItemPrice * 0.1);
    }
  }

  const adminFee = selectedMethod ? selectedMethod.price : 0;
  const totalHarga = rawItemPrice > 0 ? Math.max(0, rawItemPrice - discount) + adminFee : 0;

  const requiredFields = idFields.filter((f) => f.required).map((f) => f.name);
  const areIdFieldsFilled = requiredFields.every(
    (field) => formData[field] && String(formData[field]).trim() !== ""
  );
  const isTopupSelected = selectedTopup !== null;
  const isMethodSelected = selectedMethod !== null;
  const isContactValid = formData.contactPhone && formData.contactPhone.trim().length >= 8;

  const isFormValid =
    areIdFieldsFilled && isTopupSelected && isMethodSelected && isContactValid;

  const handlePreSubmit = (e) => {
    e.preventDefault();

    if (!areIdFieldsFilled) {
      setValidationError("Mohon lengkapi data akun tujuan pada Langkah 1.");
      return;
    }
    if (!isTopupSelected) {
      setValidationError("Mohon pilih nominal layanan pada Langkah 2.");
      return;
    }
    if (!isMethodSelected) {
      setValidationError("Mohon pilih metode pembayaran pada Langkah 3.");
      return;
    }
    if (!isContactValid) {
      setValidationError("Mohon masukkan nomor WhatsApp yang valid pada Langkah 4 (minimal 8 digit).");
      return;
    }

    setValidationError("");
    setShowConfirmModal(true);
  };

  const handleFinalConfirm = () => {
    setIsSubmitting(true);
    setShowConfirmModal(false);

    navigate(`/${rawCategory}/beli/${id}/verification`, {
      state: {
        category: rawCategory,
        productId: id,
        title,
        creator,
        image,
        idFields,
        formData,
        selectedTopup,
        paymentFee: adminFee,
        discount,
        appliedPromo,
        totalBayar: totalHarga,
        selectedMethod,
      },
    });
  };

  const renderTargetSummary = () => {
    if (formData.phoneNumber) return formData.phoneNumber;
    if (formData.accountNumber) return formData.accountNumber;
    if (formData.riotId) return formData.riotId;
    if (formData.userId) {
      return `${formData.userId}${formData.zoneId ? ` (${formData.zoneId})` : ""}${formData.server ? ` - ${formData.server}` : ""}`;
    }
    return "-";
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans pb-24 lg:pb-0">
      <Navbar />

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 rounded-xl max-w-md w-full p-6 border border-slate-800 relative text-slate-100">
            <button
              type="button"
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Konfirmasi Pesanan</h3>
                <p className="text-xs text-slate-400">Pastikan data akun sudah benar sebelum membayar</p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs text-slate-300 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Layanan:</span>
                <span className="font-semibold text-white">{title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Akun Tujuan:</span>
                <span className="font-mono font-semibold text-blue-400">{renderTargetSummary()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Nominal:</span>
                <span className="font-semibold text-white">{selectedTopup?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Metode Bayar:</span>
                <span className="font-semibold text-white">{selectedMethod?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">WhatsApp:</span>
                <span className="font-mono text-slate-200">+62 {formData.contactPhone}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                <span className="font-bold text-white">Total Tagihan:</span>
                <span className="text-sm font-bold text-blue-400 font-mono">
                  Rp {totalHarga.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mb-5 leading-relaxed">
              Transaksi yang telah berhasil diverifikasi diproses otomatis oleh server dan tidak dapat dibatalkan.
            </p>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-lg text-xs font-semibold transition cursor-pointer border border-slate-700/60"
              >
                Ubah
              </button>
              <button
                type="button"
                onClick={handleFinalConfirm}
                disabled={isSubmitting}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? <span>Memproses...</span> : <span>Lanjut Bayar</span>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stepper Breadcrumb Header */}
      <div className="border-b border-slate-800/80 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
          <nav className="flex items-center text-xs font-medium text-slate-400 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-600 flex-shrink-0" />
            <Link to={`/${rawCategory}`} className="capitalize hover:text-white transition-colors">
              {rawCategory === "games" ? "Game Online" : rawCategory === "pulsa" ? "Pulsa & Data" : "E-Money"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-600 flex-shrink-0" />
            <span className="text-white font-semibold">{title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Header with Background Banner */}
      <div className="relative h-36 sm:h-48 overflow-hidden bg-slate-950">
        {background && (
          <img
            src={background}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
      </div>

      {/* Product Header Card */}
      <div className="relative z-20 -mt-16 sm:-mt-20 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-800">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-slate-700 flex-shrink-0 bg-slate-800">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>

          <div className="text-center sm:text-left flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">{title}</h1>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Resmi
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{creator}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-950/50 px-2.5 py-1 rounded-md border border-slate-800/80">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                <span>Proses 1–60 Detik</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/50 px-2.5 py-1 rounded-md border border-slate-800/80">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Transaksi Terverifikasi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Order Form Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28 lg:pb-8 w-full flex-1">
        <form onSubmit={handlePreSubmit}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column: Form Steps */}
            <div className="w-full lg:w-2/3 space-y-5">
              {validationError && (
                <div className="p-3 bg-rose-950/40 border border-rose-800/40 rounded-xl flex items-center gap-2.5 text-rose-300 text-xs sm:text-sm animate-shake">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Step 1: User ID / Target Account */}
              <UserId
                idFields={idFields}
                formData={formData}
                handleInputChange={handleInputChange}
                guide={guide}
                categoryTitle={title}
              />

              {/* Step 2: Topup Options */}
              <CardTopup
                topupOptions={topupOptions}
                selectedTopup={selectedTopup}
                setSelectedTopup={setSelectedTopup}
                currency={currency}
              />

              {/* Step 3: Payment Method */}
              <PaymentSection
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
                selectedTopup={selectedTopup}
              />

              {/* Step 4: Contact Information */}
              <Contact
                value={formData.contactPhone}
                handleInputChange={handleInputChange}
                destinationNumber={formData.phoneNumber}
                onUseDestinationNumber={handleUseDestinationNumber}
              />

              {/* Step 5: Promo Code */}
              <CodePromo
                promo={formData.promo}
                handleInputChange={handleInputChange}
                onPromoApplied={handlePromoApplied}
                appliedPromo={appliedPromo}
              />
            </div>

            {/* Right Column: Order Summary (Sticky Desktop) */}
            <div className="w-full lg:w-1/3">
              <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 sticky top-24 text-slate-100">
                <div className="flex items-center gap-2 pb-3.5 border-b border-slate-800 mb-4">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <h3 className="font-bold text-white text-base">Ringkasan Pesanan</h3>
                </div>

                {/* Progress Steps Checklist */}
                <div className="grid grid-cols-4 gap-1 mb-4 p-1.5 bg-slate-950/60 rounded-lg border border-slate-800 text-[10px] text-center font-medium">
                  <div className={`py-1 rounded transition-colors ${areIdFieldsFilled ? 'bg-slate-800 text-emerald-400' : 'text-slate-500'}`}>
                    1. Akun
                  </div>
                  <div className={`py-1 rounded transition-colors ${isTopupSelected ? 'bg-slate-800 text-emerald-400' : 'text-slate-500'}`}>
                    2. Nominal
                  </div>
                  <div className={`py-1 rounded transition-colors ${isMethodSelected ? 'bg-slate-800 text-emerald-400' : 'text-slate-500'}`}>
                    3. Metode
                  </div>
                  <div className={`py-1 rounded transition-colors ${isContactValid ? 'bg-slate-800 text-emerald-400' : 'text-slate-500'}`}>
                    4. Kontak
                  </div>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-400">Layanan:</span>
                    <span className="font-medium text-white">{title}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-400">Nominal:</span>
                    <span className={`font-medium ${selectedTopup ? "text-slate-100" : "text-slate-500"}`}>
                      {selectedTopup ? selectedTopup.name : "Belum dipilih"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-400">Akun Tujuan:</span>
                    <span className={`font-mono text-xs font-semibold ${renderTargetSummary() !== '-' ? "text-blue-400" : "text-slate-500"}`}>
                      {renderTargetSummary()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-400">Metode Bayar:</span>
                    <span className={`font-medium ${selectedMethod ? "text-slate-100" : "text-slate-500"}`}>
                      {selectedMethod ? selectedMethod.name : "Belum dipilih"}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="flex justify-between text-slate-400">
                      <span>Harga Produk:</span>
                      <span className="font-semibold text-slate-100 font-mono">
                        {rawItemPrice > 0 ? `Rp ${rawItemPrice.toLocaleString("id-ID")}` : "Rp 0"}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> Diskon Promo:
                        </span>
                        <span className="font-mono">- Rp {discount.toLocaleString("id-ID")}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-400">
                      <span>Biaya Admin:</span>
                      <span className="font-semibold text-slate-100 font-mono">
                        {selectedMethod
                          ? selectedMethod.price === 0
                            ? "Gratis"
                            : `Rp ${selectedMethod.price.toLocaleString("id-ID")}`
                          : "-"}
                      </span>
                    </div>
                  </div>

                  {/* Total Amount Box */}
                  <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3.5 mt-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs uppercase font-semibold text-slate-400">
                        Total Bayar
                      </span>
                      <span className="text-xl font-bold text-blue-400 font-mono">
                        {totalHarga > 0 ? `Rp ${totalHarga.toLocaleString("id-ID")}` : "Rp 0"}
                      </span>
                    </div>
                    {selectedMethod && (
                      <p className="text-[11px] text-slate-500 mt-1">
                        Termasuk biaya penanganan {selectedMethod.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Desktop Submit Button */}
                <div className="mt-5 hidden lg:block">
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                      isFormValid && !isSubmitting
                        ? "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/60"
                    }`}
                  >
                    <span>Lanjutkan ke Pembayaran</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {!isFormValid && (
                    <p className="text-[11px] text-slate-500 text-center mt-2">
                      Lengkapi data pesanan untuk melanjutkan checkout.
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Jaminan transaksi aman & terenkripsi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Mobile Bottom Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-medium text-slate-400 uppercase block">Total Bayar</span>
              <span className="text-base font-bold text-blue-400 font-mono">
                {totalHarga > 0 ? `Rp ${totalHarga.toLocaleString("id-ID")}` : "Rp 0"}
              </span>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 ${
                isFormValid && !isSubmitting
                  ? "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/60"
              }`}
            >
              <span>Bayar Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Purchase;