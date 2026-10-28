import React from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const Contact = ({ value = "", handleInputChange, onUseDestinationNumber, destinationNumber }) => {
  const handleChange = (e) => {
    let cleaned = e.target.value.replace(/[^\d]/g, "");
    if (cleaned.startsWith("62")) {
      cleaned = cleaned.slice(2);
    }
    if (cleaned.startsWith("0")) {
      cleaned = cleaned.replace(/^0+/, "");
    }
    handleInputChange("contactPhone", cleaned);
  };

  const isValidPhone = value && value.length >= 8 && value.length <= 14;

  return (
    <div className="bg-slate-900 rounded-xl p-5 sm:p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-md flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0">
            4
          </div>
          <div>
            <label htmlFor="contactPhone" className="text-sm sm:text-base font-bold text-white block cursor-pointer">
              Nomor WhatsApp / Notifikasi
            </label>
            <p className="text-xs text-slate-400 mt-0.5">Bukti transaksi dan invoice otomatis dikirimkan ke nomor ini</p>
          </div>
        </div>

        {destinationNumber && destinationNumber !== value && (
          <button
            type="button"
            onClick={onUseDestinationNumber}
            className="hidden sm:inline-flex text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 px-2.5 py-1.5 rounded-lg transition border border-slate-700/60 cursor-pointer"
          >
            Sama dengan nomor tujuan
          </button>
        )}
      </div>

      {destinationNumber && destinationNumber !== value && (
        <div className="mb-3 sm:hidden">
          <button
            type="button"
            onClick={onUseDestinationNumber}
            className="w-full text-xs font-medium text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/60 cursor-pointer"
          >
            Gunakan nomor tujuan ({destinationNumber})
          </button>
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <span className="text-slate-400 font-bold text-xs sm:text-sm font-mono">+62</span>
        </div>
        <input
          id="contactPhone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="81234567890"
          aria-label="Nomor WhatsApp konfirmasi transaksi"
          value={value}
          onChange={handleChange}
          maxLength={14}
          className={`w-full border ${
            isValidPhone ? "border-slate-600 bg-slate-950/80 text-slate-100" : "border-slate-700/80 bg-slate-950/50 text-slate-100"
          } pl-12 pr-10 py-2.5 rounded-lg placeholder-slate-500 focus:outline-none focus:border-blue-500 transition text-xs sm:text-sm font-medium tracking-wide font-mono`}
        />
        {isValidPhone && (
          <div className="absolute inset-y-0 right-3 flex items-center text-emerald-400 pointer-events-none">
            <CheckCircle2 className="w-4 h-4 stroke-[2.4]" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          Nomor hanya digunakan untuk pengiriman invoice dan status pesanan.
        </span>
        {value && (
          <span className={`font-mono text-xs ${isValidPhone ? "text-emerald-400" : "text-amber-400"}`}>
            {value.length} digit
          </span>
        )}
      </div>
    </div>
  );
};

export default Contact;