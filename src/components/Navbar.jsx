import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

// Sub-komponen untuk Logo
const Logo = () => (
  <Link to="/" className="flex items-center group">
    <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-800 transition-colors flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
      WebStore
    </div>
  </Link>
);

const UserAvatar = ({ initials = "TK" }) => (
  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
    {initials}
  </div>
);

const UserDropdown = ({ isLoggedIn, toggleLogin }) => {
  if (!isLoggedIn) {
    return (
      <div className="flex items-center space-x-3">
        <Link to="/daftar" className="text-blue-600 hover:text-blue-800 font-medium transition-colors whitespace-nowrap">
          Daftar
        </Link>
        <Link
          to="/masuk"
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
          onClick={toggleLogin}
        >
          Masuk
        </Link>
      </div>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 focus:outline-none">
        <UserAvatar />
        <svg
          className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-transform group-hover:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
        <Link
          to="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        >
          Profil Saya
        </Link>
        <div className="border-t border-gray-100"></div>
        <button
          onClick={toggleLogin}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

// Komponen Icon yang dapat digunakan kembali
const SearchIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
  </svg>
);

const MenuIcon = ({ isOpen }) => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {isOpen ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    )}
  </svg>
);

// Komponen Mobile Actions (Search & Menu Buttons)
const MobileActions = ({ 
  showMobileSearchDropdown, 
  setShowMobileSearchDropdown, 
  isMenuOpen, 
  setIsMenuOpen 
}) => (
  <div className="flex items-center space-x-1">
    {/* Search Button */}
    <button
      onClick={() => {
        setShowMobileSearchDropdown(!showMobileSearchDropdown);
        // Tutup menu jika search dibuka
        if (!showMobileSearchDropdown && isMenuOpen) {
          setIsMenuOpen(false);
        }
      }}
      className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-md hover:bg-gray-100"
      aria-label="Toggle search"
    >
      <SearchIcon />
    </button>

    {/* Menu Button */}
    <button
      onClick={() => {
        setIsMenuOpen(!isMenuOpen);
        // Tutup search dropdown jika menu dibuka
        if (!isMenuOpen && showMobileSearchDropdown) {
          setShowMobileSearchDropdown(false);
        }
      }}
      className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-md hover:bg-gray-100"
      aria-label="Toggle menu"
    >
      <MenuIcon isOpen={isMenuOpen} />
    </button>
  </div>
);

// Komponen Mobile Search Dropdown
const MobileSearchDropdown = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="md:hidden mt-3 px-1 animate-slideDown">
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-3">
        <Search />
      </div>
    </div>
  );
};

// Komponen Mobile User Profile
const MobileUserProfile = ({ isLoggedIn }) => {
  if (!isLoggedIn) return null;

  return (
    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-lg">
        TK
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">Taufik</p>
        <p className="text-sm text-gray-600">Member Gold</p>
      </div>
    </div>
  );
};

// Komponen Mobile Login Section
const MobileLoginSection = ({ isLoggedIn, toggleLogin, closeMenu }) => {
  if (isLoggedIn) return null;

  return (
    <div className="space-y-3 p-4">
      <Link
        to="/masuk"
        className="w-full block text-center bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        onClick={() => {
          toggleLogin();
          closeMenu();
        }}
      >
        Masuk
      </Link>
      <p className="text-sm text-center text-gray-600">
        Belum punya akun?{' '}
        <Link
          to="/daftar"
          className="text-blue-600 hover:text-blue-800 font-medium"
          onClick={closeMenu}
        >
          Daftar di sini
        </Link>
      </p>
    </div>
  );
};

// Komponen Mobile Menu Items
const MobileMenuItems = ({ isLoggedIn, toggleLogin, closeMenu }) => {
  if (!isLoggedIn) return null;

  const menuItems = [
    { to: "/profile", label: "Profil Saya", icon: "👤" },
    { to: "/orders", label: "Pesanan Saya", icon: "📦" },
    { to: "/wishlist", label: "Wishlist", icon: "❤️" },
    { to: "/settings", label: "Pengaturan", icon: "⚙️" }
  ];

  return (
    <div className="py-2">
      {menuItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          onClick={closeMenu}
        >
          <span className="mr-3">{item.icon}</span>
          {item.label}
        </Link>
      ))}
      
      <div className="border-t border-gray-100 mt-2 pt-2">
        <button
          onClick={() => {
            toggleLogin();
            closeMenu();
          }}
          className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <span className="mr-3">🚪</span>
          Keluar
        </button>
      </div>
    </div>
  );
};

// Komponen Mobile Menu utama
const MobileMenu = ({ isVisible, isLoggedIn, toggleLogin, closeMenu }) => {
  if (!isVisible) return null;

  return (
    <div className="md:hidden mt-3 animate-slideDown">
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
        {/* User Profile atau Login Section */}
        {isLoggedIn ? (
          <>
            <MobileUserProfile isLoggedIn={isLoggedIn} />
            <MobileMenuItems 
              isLoggedIn={isLoggedIn} 
              toggleLogin={toggleLogin} 
              closeMenu={closeMenu} 
            />
          </>
        ) : (
          <MobileLoginSection 
            isLoggedIn={isLoggedIn} 
            toggleLogin={toggleLogin} 
            closeMenu={closeMenu} 
          />
        )}
      </div>
    </div>
  );
};

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileSearchDropdown, setShowMobileSearchDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi untuk menutup semua dropdown mobile
  const closeMobileDropdowns = () => {
    setIsMenuOpen(false);
    setShowMobileSearchDropdown(false);
  };

  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  const navbarClasses = `
    bg-white 
    ${isScrolled ? 'bg-opacity-95 shadow-md' : 'bg-opacity-90 shadow-sm'} 
    backdrop-blur-sm 
    px-4 sm:px-6 lg:px-8 
    py-3 
    sticky top-0 z-50 
    transition-all duration-300
  `;

  return (
    <nav className={navbarClasses}>
      {/* Mobile Header */}
      <div className="flex items-center justify-between w-full md:hidden">
        <Logo />
        <MobileActions
          showMobileSearchDropdown={showMobileSearchDropdown}
          setShowMobileSearchDropdown={setShowMobileSearchDropdown}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>

      {/* Mobile Search Dropdown */}
      <MobileSearchDropdown 
        isVisible={showMobileSearchDropdown}
        onClose={() => setShowMobileSearchDropdown(false)}
      />

      {/* Mobile Menu */}
      <MobileMenu 
        isVisible={isMenuOpen}
        isLoggedIn={isLoggedIn} 
        toggleLogin={toggleLogin} 
        closeMenu={closeMobileDropdowns}
      />

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between w-full">
        <Logo />
        <div className="flex-1 max-w-xl mx-6 relative">
          <Search />
        </div>
        <div className="flex items-center space-x-4">
          <UserDropdown isLoggedIn={isLoggedIn} toggleLogin={toggleLogin} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;