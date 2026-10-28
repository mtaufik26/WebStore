import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BannerSection from '../components/home/BannerSection';
import PopularSection from '../components/home/PopularSection';
import CategorySelector from '../components/home/CategorySelector';
import ProductGrid from '../components/home/ProductGrid';
import LiveFeedSection from '../components/home/LiveFeedSection';
import TrustSection from '../components/home/TrustSection';

function Home({ defaultCategory = 'games' }) {
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  useEffect(() => {
    if (defaultCategory) {
      setSelectedCategory(defaultCategory);
    }
  }, [defaultCategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [defaultCategory]);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 w-full flex-1 space-y-6 sm:space-y-7">
        <BannerSection />
        <LiveFeedSection />
        <PopularSection />
        <CategorySelector selected={selectedCategory} onSelect={setSelectedCategory} />
        <ProductGrid category={selectedCategory} />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
