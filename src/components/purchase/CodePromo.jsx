import React, { useState } from "react";
import { CheckCircle2, Tag, X } from "lucide-react";
import data from "../../data/dataProduct";

const CodePromo = ({ promo = "", handleInputChange, onPromoApplied, appliedPromo }) => {
  const [isValid, setIsValid] = useState(appliedPromo ? true : null);
  const [isChecking, setIsChecking] = useState(false);
  const [promoMessage, setPromoMessage] = useState(
    appliedPromo ? `Promo ${appliedPromo.title} aktif` : ""
  );

  const availablePromos = Object.values(data.codepromo || {});

  const validateCode = (codeToTest) => {
    if (!codeToTest || !codeToTest.trim()) return;

    setIsChecking(true);
    const codeUpper = codeToTest.trim().toUpperCase();
    const matched = availablePromos.find((p) => p.code.toUpperCase() === codeUpper);

    setTimeout(() => {
      setIsChecking(false);
      if (matched) {
        setIsValid(true);
        setPromoMessage(`Berhasil! ${matched.title}: ${matched.description}`);
        onPromoApplied(matched);
      } else {
        setIsValid(false);
        setPromoMessage("Kode promo tidak valid atau kuota promo telah habis.");
        onPromoApplied(null);
      }
    }, 250);
  };

  const handleApplyClick = (e) => {
    e.preventDefault();
    validateCode(promo);
  };

  const handleChipClick = (code) => {
    handleInputChange("promo", code);
    validateCode(code);
  };

  const handleRemovePromo = () => {
    handleInputChange("promo", "");
    setIsValid(null);
    setPromoMessage("");
    onPromoApplied(null);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-5 sm:p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-md flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0">
            5
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">Kode Promo / Voucher</h3>
            <p className="text-xs text-slate-400 mt-0.5">Gunakan voucher diskon untuk potongan harga</p>
          </div>
        </div>

        {appliedPromo && (
          <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Aktif</span>
          </span>
        )}
      </div>

      {/* Quick Click Promo Chips */}
      <div className="mb-4">
        <span className="text-xs text-slate-500 block mb-2">
          Voucher Tersedia:
        </span>
        <div className="flex flex-wrap gap-2">
          {availablePromos.map((p) => (
            <button
              key={p.code}
              type="button"
              onClick={() => handleChipClick(p.code)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-950/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-medium text-slate-300 transition cursor-pointer"
            >
              <Tag className="w-3 h-3 text-blue-400" />
              <span className="font-mono">{p.code}</span>
              <span className="text-slate-500 text-[11px]">({p.title})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Input */}
      <form onSubmit={handleApplyClick} className="relative">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              id="promo-code-input"
              value={promo}
              onChange={(e) => {
                handleInputChange("promo", e.target.value.toUpperCase());
                if (isValid !== null) setIsValid(null);
              }}
              placeholder="Masukkan kode voucher"
              aria-label="Kode promo"
              className="w-full bg-slate-950/50 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono uppercase tracking-wider"
            />
            {promo && (
              <button
                type="button"
                onClick={handleRemovePromo}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
                aria-label="Hapus kode"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!promo.trim() || isChecking}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer disabled:bg-slate-800 disabled:text-slate-500 disabled:border disabled:border-slate-700/50 flex items-center justify-center gap-1.5"
          >
            {isChecking ? <span>Mengecek...</span> : <span>Terapkan</span>}
          </button>
        </div>
      </form>

      {/* Feedback status message */}
      {promoMessage && (
        <div
          className={`mt-3 p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
            isValid
              ? "bg-emerald-950/40 text-emerald-300 border border-emerald-800/40"
              : "bg-rose-950/40 text-rose-300 border border-rose-800/40"
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{promoMessage}</span>
        </div>
      )}
    </div>
  );
};

export default CodePromo;
