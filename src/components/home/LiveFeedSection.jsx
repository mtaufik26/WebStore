import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

const TRANSACTIONS = [
  { phone: "0812••••8901", item: "86 Diamonds Mobile Legends", time: "Baru saja" },
  { phone: "0857••••3312", item: "Saldo DANA Rp 50.000", time: "18 detik lalu" },
  { phone: "0821••••9821", item: "Pulsa Telkomsel Rp 25.000", time: "34 detik lalu" },
  { phone: "0819••••4510", item: "125 UC PUBG Mobile", time: "1 menit lalu" },
  { phone: "0896••••6723", item: "140 Diamonds Free Fire", time: "1 menit lalu" },
  { phone: "0852••••1290", item: "Saldo GoPay Rp 100.000", time: "2 menit lalu" },
  { phone: "0878••••5519", item: "420 VP Valorant", time: "2 menit lalu" },
  { phone: "0813••••4491", item: "Pulsa Indosat Rp 50.000", time: "3 menit lalu" },
];

function LiveFeedSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TRANSACTIONS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const active = TRANSACTIONS[currentIndex];

  return (
    <div className="bg-slate-900/50 rounded-lg px-4 py-2.5 border border-slate-800/50 flex items-center justify-between gap-3 text-sm overflow-hidden">
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-medium text-slate-400 text-xs uppercase tracking-wider hidden sm:inline">
          Live
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center sm:justify-start gap-2 truncate text-sm">
        <span className="font-mono text-slate-400 text-xs">
          {active.phone}
        </span>
        <span className="text-slate-600">·</span>
        <span className="text-slate-200 truncate">
          {active.item}
        </span>
        <span className="text-slate-500 text-xs hidden md:inline">
          {active.time}
        </span>
      </div>

      <div className="flex items-center gap-1 text-emerald-400 text-xs flex-shrink-0">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Berhasil</span>
      </div>
    </div>
  );
}

export default LiveFeedSection;
