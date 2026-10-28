import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  CheckCircle2,
  Copy,
  Check,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Calendar,
  CreditCard,
  User,
  Share2,
  Printer,
} from "lucide-react";

const generateRandomCode = (length) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const generateSN = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  let digits = "";
  for (let i = 0; i < 12; i++) {
    digits += Math.floor(Math.random() * 10);
  }
  return `SN${year}${month}${day}${digits}`;
};

function VerificationSuccess() {
  const location = useLocation();
  const state = location.state;

  const [copiedField, setCopiedField] = useState(null);
  const [transactionCode] = useState(() => state?.transactionCode || `TXN-${generateRandomCode(12)}`);
  const [invoiceCode] = useState(() => state?.invoiceCode || `INV-${new Date().getFullYear()}${generateRandomCode(10)}`);
  const [serialNumber] = useState(() => generateSN());
  const [currentTime] = useState(() =>
    new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })
  );

  useEffect(() => {
    if (state) {
      try {
        const historyKey = "webstore_order_history";
        const existing = JSON.parse(localStorage.getItem(historyKey) || "[]");
        const newRecord = {
          transactionCode,
          invoiceCode,
          serialNumber,
          title: state.title,
          itemName: state.selectedTopup?.name,
          totalBayar: state.totalBayar,
          methodName: state.selectedMethod?.name,
          date: new Date().toISOString(),
          status: "SUCCESS",
        };
        if (!existing.some((r) => r.invoiceCode === invoiceCode)) {
          localStorage.setItem(historyKey, JSON.stringify([newRecord, ...existing.slice(0, 19)]));
        }
      } catch {
        // Safe fallback
      }
    }
  }, [state, transactionCode, invoiceCode, serialNumber]);

  const handleCopy = (text, fieldName) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const renderAccountTarget = () => {
    const fd = state?.formData || {};
    if (fd.phoneNumber) {
      return `Nomor Tujuan: ${fd.phoneNumber}`;
    }
    if (fd.accountNumber) {
      return `Nomor Akun: ${fd.accountNumber}`;
    }
    if (fd.riotId) {
      return `Riot ID: ${fd.riotId}`;
    }
    if (fd.userId) {
      return `User ID: ${fd.userId}${fd.zoneId ? ` (${fd.zoneId})` : ""}${fd.server ? ` - ${fd.server}` : ""}`;
    }
    return "User: Pelanggan WebStore";
  };

  const productTitle = state?.title || "Layanan Digital PPOB";
  const itemTitle = state?.selectedTopup?.name || "Voucher Resmi";
  const productImage = state?.image || "/assets/product/Game/ML.jpeg";
  const totalAmount = state?.totalBayar || 0;
  const paymentMethodName = state?.selectedMethod?.name || "Pembayaran Digital";

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*BUKTI PEMBAYARAN WEBSTORE*\nNo. Invoice: ${invoiceCode}\nItem: ${productTitle} (${itemTitle})\nTotal: Rp ${totalAmount.toLocaleString("id-ID")}\nSN: ${serialNumber}\nStatus: LUNAS`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans">
      <div className="no-print">
        <Navbar />
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
        {/* Success Icon & Header */}
        <div className="text-center mb-8 no-print">
          <div className="w-14 h-14 mx-auto mb-3 bg-emerald-950/40 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-800/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800/60">
            Pembayaran Terverifikasi
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-2 tracking-tight">
            Transaksi Berhasil
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mt-1 leading-relaxed">
            Pembayaran Anda telah diterima. Produk otomatis diteruskan ke akun tujuan.
          </p>
        </div>

        {/* Receipt Container */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden mb-8 printable-receipt relative text-slate-100">
          {/* Header of Receipt */}
          <div className="bg-slate-950 p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-blue-400 font-medium">Bukti Transaksi Resmi</p>
              <h2 className="text-lg sm:text-xl font-bold mt-0.5 tracking-tight">WebStore Indonesia</h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">https://webstore.id</p>
            </div>

            <div className="flex items-center gap-2 no-print">
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-medium transition text-white cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 rounded-lg text-xs font-medium transition text-white border border-slate-700/60 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Struk</span>
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-5 relative">
            {/* Digital Stamp Watermark */}
            <div className="absolute right-5 top-6 hidden sm:block pointer-events-none">
              <div className="official-stamp text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>LUNAS</span>
              </div>
            </div>

            {/* Product Card */}
            <div className="flex items-center gap-3.5 p-3.5 bg-slate-950 rounded-lg border border-slate-800">
              <img
                src={productImage}
                alt={productTitle}
                className="w-12 h-12 rounded-lg object-cover border border-slate-700 flex-shrink-0"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Layanan:</span>
                <h3 className="font-bold text-white text-sm sm:text-base truncate">{productTitle}</h3>
                <p className="text-xs text-slate-300 font-medium">{itemTitle}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-[10px] text-slate-500 font-medium block">Status</span>
                <p className="text-xs font-semibold text-emerald-400">
                  SUKSES
                </p>
              </div>
            </div>

            {/* Transaction Key Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>Akun Tujuan</span>
                </div>
                <p className="font-medium text-xs sm:text-sm text-white font-mono">{renderAccountTarget()}</p>
                {state?.formData?.contactPhone && (
                  <p className="text-xs text-slate-400">Kontak: +62 {state.formData.contactPhone}</p>
                )}
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                  <span>Metode Pembayaran</span>
                </div>
                <p className="font-medium text-xs sm:text-sm text-white">{paymentMethodName}</p>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="w-3 h-3" />
                  <span>Waktu: {currentTime}</span>
                </div>
              </div>
            </div>

            {/* Official Serial Number (SN) Box */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-medium text-slate-400 tracking-wider">
                  Serial Number (SN Provider)
                </span>
                <p className="font-mono text-xs sm:text-sm font-semibold text-emerald-400 tracking-wider mt-0.5">
                  {serialNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(serialNumber, "sn")}
                className="text-xs font-medium text-slate-300 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-750 transition cursor-pointer"
              >
                {copiedField === "sn" ? "Tersalin" : "Salin SN"}
              </button>
            </div>

            {/* Reference Codes with Copy Function */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-medium text-slate-400 block">ID Transaksi</span>
                  <p className="font-mono text-xs font-semibold text-slate-200">{transactionCode}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(transactionCode, "tx")}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium px-2 py-1 cursor-pointer"
                >
                  {copiedField === "tx" ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3 h-3 stroke-[3]" /> Tersalin
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3 h-3" /> Salin
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-medium text-slate-400 block">Nomor Invoice</span>
                  <p className="font-mono text-xs font-semibold text-blue-400">{invoiceCode}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(invoiceCode, "inv")}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium px-2 py-1 cursor-pointer"
                >
                  {copiedField === "inv" ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3 h-3 stroke-[3]" /> Tersalin
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3 h-3" /> Salin
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="border-t border-slate-800 pt-3.5 space-y-1.5">
              <div className="flex justify-between text-xs sm:text-sm text-slate-400">
                <span>Harga Produk:</span>
                <span className="font-medium text-white font-mono">
                  {state?.selectedTopup?.price || `Rp ${totalAmount.toLocaleString("id-ID")}`}
                </span>
              </div>
              {state?.discount > 0 && (
                <div className="flex justify-between text-xs sm:text-sm text-emerald-400 font-medium">
                  <span>Diskon Promo:</span>
                  <span className="font-mono">- Rp {state.discount.toLocaleString("id-ID")}</span>
                </div>
              )}
              <div className="flex justify-between text-xs sm:text-sm text-slate-400">
                <span>Biaya Admin Gateway:</span>
                <span className="font-medium text-white font-mono">
                  {state?.paymentFee === 0 ? "Gratis" : `Rp ${(state?.paymentFee || 0).toLocaleString("id-ID")}`}
                </span>
              </div>
              <div className="pt-2.5 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Total Dibayar:</span>
                <span className="text-lg font-bold text-blue-400 font-mono">
                  Rp {totalAmount.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 no-print">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-xs sm:text-sm transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Beli Layanan Lain</span>
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-lg font-semibold text-xs sm:text-sm transition"
          >
            <span>Kembali ke Beranda</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5 no-print">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Struk ini sah dikeluarkan secara otomatis oleh server WebStore Indonesia.</span>
        </div>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}

export default VerificationSuccess;