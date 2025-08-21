import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BannerSection from '../components/BannerSection';
import PopularSection from '../components/PopularSection';
import CategorySelector from '../components/CategorySelector';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';


function Home() {
  const [selectedCategory, setSelectedCategory] = useState('games');

  return (
    <div className='bg-gradient-to-br from-blue-50 to-white min-h-screen'>
      <Navbar />
      <main className="p-4">
        <BannerSection />
        <PopularSection />
        <CategorySelector selected={selectedCategory} onSelect={setSelectedCategory} />
        <ProductGrid category={selectedCategory} />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
