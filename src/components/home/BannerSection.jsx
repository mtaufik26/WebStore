import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const BANNERS = [
  {
    id: 1,
    title: "Top-Up Game Instan",
    subtitle: "Mobile Legends, Free Fire, Valorant & Genshin Impact — proses otomatis dalam hitungan detik.",
    tag: "PROMO",
    cta: "Top Up Sekarang",
    link: "/games/beli/ml",
    image: "/assets/background/Game/ML.png",
  },
  {
    id: 2,
    title: "Isi Saldo E-Wallet",
    subtitle: "DANA, OVO, GoPay — langsung masuk ke akun Anda via QRIS tanpa biaya admin.",
    tag: "BEBAS BIAYA",
    cta: "Isi Saldo",
    link: "/emoney/beli/dn",
    image: "/assets/BanerLogin.webp",
  },
  {
    id: 3,
    title: "Pulsa & Data Semua Operator",
    subtitle: "Telkomsel, Indosat, Tri — harga distributor resmi, pembayaran instan.",
    tag: "HARGA TERBAIK",
    cta: "Beli Pulsa",
    link: "/pulsa/beli/tkl",
    image: "/assets/background/Pulsa/TKL.png",
  },
];

function BannerSection() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % BANNERS.length);
  };

  const activeBanner = BANNERS[current];

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative min-h-[240px] sm:min-h-[300px] md:min-h-[340px] flex items-center transition-all duration-700 overflow-hidden">
        {/* Background */}
        {activeBanner.image && (
          <img
            src={activeBanner.image}
            alt=""
            aria-hidden="true"
            className="absolute right-0 top-0 h-full w-2/3 md:w-1/2 object-cover object-center opacity-20"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-transparent" />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3 block">
            {activeBanner.tag}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-3">
            {activeBanner.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6 max-w-md">
            {activeBanner.subtitle}
          </p>

          <Link
            to={activeBanner.link}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition"
          >
            <span>{activeBanner.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Nav */}
        <div className="absolute right-4 bottom-4 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Banner sebelumnya"
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Banner berikutnya"
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute left-6 sm:left-10 md:left-12 bottom-4 z-20 flex items-center gap-1.5">
          {BANNERS.map((b, i) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Banner ${i + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === current ? "w-6 bg-blue-500" : "w-2 bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BannerSection;