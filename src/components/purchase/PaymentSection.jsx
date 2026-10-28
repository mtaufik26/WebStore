import React, { useState } from "react";
import paymentMethods from "../../data/metodePembayaran";
import { ChevronDown, ChevronUp, Check, ShieldCheck, QrCode, CreditCard, Wallet, Store } from "lucide-react";

const CATEGORIES = [
  { key: "qris", label: "QRIS (Instan & Bebas Biaya Layanan)", badge: "Populer", icon: QrCode },
  { key: "e-wallet", label: "E-Wallet (DANA, OVO, GoPay, ShopeePay)", icon: Wallet },
  { key: "virtual-account", label: "Virtual Account (BCA, BRI, BNI, Mandiri)", icon: CreditCard },
  { key: "convenience-store", label: "Minimarket (Alfamart & Indomaret)", icon: Store },
];

const formatCurrency = (amount) => {
  if (amount === 0) return "Gratis";
  return `Rp ${(amount || 0).toLocaleString("id-ID")}`;
};

const MethodCard = ({ method, isSelected, onSelect, selectedTopup }) => {
  const rawPrice = selectedTopup
    ? parseInt(String(selectedTopup.price).replace(/[^\d]/g, ""), 10) || 0
    : 0;
  const totalWithMethod = rawPrice > 0 ? rawPrice + method.price : null;

  return (
    <button
      type="button"
      onClick={() => onSelect(method)}
      className={`relative w-full text-left p-3 sm:p-3.5 rounded-xl border transition cursor-pointer flex flex-col items-center justify-between gap-2 ${
        isSelected
          ? "border-blue-500/80 bg-blue-950/25"
          : "border-slate-800/80 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/30"
      }`}
    >
      {isSelected && (
        <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
        </div>
      )}

      {/* Method Logo with white container for dark mode readability */}
      <div className="h-8 flex items-center justify-center my-0.5 w-full px-2 bg-white/95 rounded-md border border-slate-200/50">
        <img
          src={method.logo}
          alt={method.name}
          className="max-h-5 max-w-[75px] object-contain"
          onError={(e) => {
            e.target.style.display = "none";
            const fallback = e.target.parentElement.querySelector(".method-logo-fallback");
            if (fallback) fallback.style.display = "block";
          }}
        />
        <span className="method-logo-fallback hidden font-bold text-xs text-slate-800">
          {method.name}
        </span>
      </div>

      <div className="w-full text-center">
        <p className="font-semibold text-xs text-slate-100 truncate">
          {method.name}
        </p>

        {totalWithMethod ? (
          <p className="text-xs font-semibold text-blue-400 font-mono mt-0.5">
            Rp {totalWithMethod.toLocaleString("id-ID")}
          </p>
        ) : (
          <p className="text-[11px] text-slate-500 mt-0.5">Pilih nominal</p>
        )}

        <div className="mt-1.5 pt-1.5 border-t border-slate-800/70 flex items-center justify-center gap-1 text-[11px] text-slate-400">
          <span>Admin:</span>
          <span className={`font-medium ${method.price === 0 ? "text-emerald-400" : "text-slate-300 font-mono"}`}>
            {formatCurrency(method.price)}
          </span>
        </div>
      </div>
    </button>
  );
};

const CategoryAccordion = ({
  category,
  isOpen,
  onToggle,
  selectedMethod,
  onSelectMethod,
  selectedTopup,
}) => {
  const methods = paymentMethods.filter((m) => m.category === category.key && m.isActive);
  const IconComponent = category.icon || CreditCard;

  return (
    <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-900 transition-all">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-950/50 hover:bg-slate-800/50 transition-colors text-left cursor-pointer"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center text-slate-300 flex-shrink-0">
            <IconComponent className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-xs sm:text-sm text-white truncate">{category.label}</span>
          {category.badge && (
            <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded flex-shrink-0">
              {category.badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <span className="text-xs text-slate-500 hidden sm:inline">{methods.length} pilihan</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </button>

      {!isOpen && (
        <div
          onClick={onToggle}
          className="px-4 py-2 bg-slate-950/30 flex flex-wrap items-center gap-2 border-t border-slate-800/60 cursor-pointer hover:bg-slate-800/30 transition-colors"
        >
          {methods.map((method) => (
            <div key={method.code} className="bg-white/95 rounded px-1.5 py-0.5 flex items-center justify-center border border-slate-200/40">
              <img
                src={method.logo}
                alt={method.name}
                className="h-3 max-w-[38px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="p-3.5 bg-slate-900 border-t border-slate-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {methods.map((method) => (
              <MethodCard
                key={method.code}
                method={method}
                isSelected={selectedMethod?.code === method.code}
                onSelect={onSelectMethod}
                selectedTopup={selectedTopup}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PaymentSection = ({ selectedMethod, setSelectedMethod, selectedTopup }) => {
  const [openCategory, setOpenCategory] = useState("qris");

  const handleToggle = (key) => {
    setOpenCategory((prev) => (prev === key ? null : key));
  };

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setOpenCategory(method.category);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-5 sm:p-6 border border-slate-800">
      <div className="flex items-center mb-5">
        <div className="w-6 h-6 bg-blue-600 text-white rounded-md flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0">
          3
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white">Metode Pembayaran</h3>
          <p className="text-xs text-slate-400 mt-0.5">Pilih metode pembayaran yang Anda inginkan</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {CATEGORIES.map((category) => (
          <CategoryAccordion
            key={category.key}
            category={category}
            isOpen={openCategory === category.key}
            onToggle={() => handleToggle(category.key)}
            selectedMethod={selectedMethod}
            onSelectMethod={handleSelectMethod}
            selectedTopup={selectedTopup}
          />
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-slate-500">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
        <span>Pembayaran otomatis terverifikasi langsung via gateway perbankan resmi.</span>
      </div>
    </div>
  );
};

export default PaymentSection;