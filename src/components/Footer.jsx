import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-50 to-whit text-gray-800 relative overflow-hidden border-t border-gray-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-40"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r text-blue-600">
                WebStore
              </h3>
            </div>
            <p className="text-gray-600 text-base leading-relaxed max-w-md mb-6">
              Platform terpercaya untuk kebutuhan digital Anda. Dari top-up game hingga pembayaran tagihan, 
              kami hadir untuk memudahkan hidup digital Anda.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, color: 'hover:text-blue-600' },
                { Icon: Twitter, color: 'hover:text-sky-500' },
                { Icon: Instagram, color: 'hover:text-pink-600' },
                { Icon: Youtube, color: 'hover:text-red-600' }
              ].map(({ Icon, color }, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 ${color} transition-all duration-300 hover:scale-110 hover:bg-gray-200`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6 relative">
              Layanan
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </h4>
            <ul className="space-y-4">
              {['Top-up Game', 'Pulsa', 'Top-up E-Money'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6 relative">
              Bantuan
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </h4>
            <ul className="space-y-4">
              {['Pusat Bantuan', 'Kontak Kami', 'FAQ', 'Cara Pembayaran', 'Syarat & Ketentuan'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="bg-gradient-to-br from-blue-50 to-whit rounded-2xl p-6 border border-gray-200 shadow-sm mb-12">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Hubungi Kami</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-gray-900">hello@webstore.id</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Telepon</p>
                <p className="text-gray-900">+62 123 4567 890</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <MapPin size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Alamat</p>
                <p className="text-gray-900">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 WebStore. Semua hak dilindungi undang-undang.
            </p>
            
            {/* Legal Links */}
            <div className="flex space-x-8">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="text-gray-500 hover:text-gray-900 text-sm transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;