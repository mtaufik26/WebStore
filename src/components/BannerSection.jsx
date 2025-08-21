import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  {
    id: 1,
    image: "/images/banner1.jpg",
    alt: "Diskon E-Money",
    title: "Diskon E-Money",
    features: [
      "Top Up Murah & Cepat",
      "Instant dengan harga termurah di pasaran"
    ],
    cta: "Top Up Sekarang",
    link: "/top-up",
    tag: "Populer di Semua Kategori"
  },
  {
    id: 2,
    image: "/images/banner2.jpg",
    alt: "Promo Game Online",
    title: "Promo Spesial Game Online",
    features: [
      "Diskon hingga 50%",
      "Untuk semua produk game terbaik"
    ],
    cta: "Beli Sekarang",
    link: "/promo-game",
    tag: "Terbaru"
  },
  {
    id: 3,
    image: "/images/banner3.jpg",
    alt: "Voucher Belanja",
    title: "Voucher Belanja Digital",
    features: [
      "Cashback 20% setiap hari",
      "Berlaku untuk semua merchant"
    ],
    cta: "Dapatkan Sekarang",
    link: "/voucher",
    tag: "Promo Minggu Ini"
  }
];

function BannerSection() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isHovered && !isMobile) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, current, isMobile]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const goToSlide = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const slideVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? "10%" : "-10%",
      opacity: 0,
      transition: { duration: 0.4 }
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1]
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? "-10%" : "10%",
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.33, 1, 0.68, 1]
      }
    })
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.1,
        ease: "easeOut"
      }
    }
  };

  return (
    <div
      className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden mt-4 md:mt-8 shadow-xl"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <div className="relative h-64 sm:h-80 md:h-96 w-full">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={banners[current].id}
            custom={direction}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0"
          >
            <motion.img
              src={banners[current].image}
              alt={banners[current].alt}
              className="w-full h-full object-cover"
              initial={{ scale: 1.01 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-4 sm:px-6 md:px-12">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="text-white max-w-md space-y-2 sm:space-y-4"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
                  {banners[current].title}
                </h2>

                <ul className="space-y-1 sm:space-y-3 mb-4 sm:mb-6">
                  {banners[current].features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start text-sm sm:text-base"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <span className="mr-2 text-blue-400">•</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  href={banners[current].link}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 rounded-lg font-medium text-sm sm:text-base md:text-lg shadow-md"
                  whileHover={{ scale: isMobile ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  {banners[current].cta}
                </motion.a>

                {banners[current].tag && (
                  <motion.div
                    className="mt-4 sm:mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <span className="text-xs sm:text-sm bg-white/20 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full inline-flex items-center">
                      ⭐ {banners[current].tag}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows - Always visible on mobile */}
      {(isHovered || isMobile) && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 sm:left-4 md:left-6 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 sm:p-3 md:p-4 shadow-lg z-10"
            aria-label="Previous banner"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 sm:right-4 md:right-6 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 sm:p-3 md:p-4 shadow-lg z-10"
            aria-label="Next banner"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === current ? "bg-white w-4 sm:w-6 md:w-8 scale-125" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerSection;