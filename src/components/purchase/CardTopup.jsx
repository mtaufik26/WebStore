import React, { useState, useMemo } from "react";
import { Check, Sparkles } from "lucide-react";
import CurrencyBadge from "../common/CurrencyBadge";

const CardTopup = ({ topupOptions = [], selectedTopup, setSelectedTopup, currency = "" }) => {
  const [filterType, setFilterType] = useState("all");

  const filteredList = useMemo(() => {
    if (filterType === "bonus") {
      return topupOptions.filter((item) => item.bonus);
    }
    return topupOptions;
  }, [topupOptions, filterType]);

  const hasBonusItems = topupOptions.some((item) => item.bonus);

  return (
    <div className="bg-slate-900 rounded-xl p-5 sm:p-6 border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-md flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0">
            2
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">Pilih Nominal Layanan</h3>
            <p className="text-xs text-slate-400 mt-0.5">Pilih produk atau nominal yang ingin Anda beli</p>
          </div>
        </div>

        {hasBonusItems && (
          <div className="flex items-center gap-1 self-start sm:self-auto bg-slate-950/60 border border-slate-800 p-0.5 rounded-lg">
            <button
              type="button"
              onClick={() => setFilterType("all")}
              className={`px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer ${
                filterType === "all" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Semua ({topupOptions.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType("bonus")}
              className={`px-2.5 py-1 rounded text-xs font-medium transition flex items-center gap-1 cursor-pointer ${
                filterType === "bonus" ? "bg-slate-800 text-emerald-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Ada Bonus</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {filteredList.map((item) => {
          const isSelected = selectedTopup?.id === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedTopup(item)}
              className={`relative text-left p-3 sm:p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between gap-2.5 ${
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

              <div className="pr-4">
                <div className="flex items-center gap-1.5 font-semibold text-slate-100 text-xs sm:text-sm leading-snug">
                  <CurrencyBadge currency={currency || item.name} className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </div>
                {item.bonus && (
                  <div className="inline-block text-[10px] font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 rounded px-1.5 py-0.5 mt-1.5">
                    {item.bonus}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800/70 flex items-baseline justify-between">
                <span className="text-[11px] text-slate-500">Harga</span>
                <span className="text-xs sm:text-sm font-semibold text-blue-400 font-mono">
                  {item.price}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CardTopup;
