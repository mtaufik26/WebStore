import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Gamepad2,
  Smartphone,
  Wallet,
  X,
  HelpCircle,
  FileText,
  ShieldCheck,
  Zap,
} from 'lucide-react';

const HELP_MODAL_DATA = {
  cs: {
    title: "Pusat Bantuan",
    content: "Layanan Customer Care WebStore siap membantu 24 jam.\n\nJika pesanan mengalami kendala:\n1. Siapkan Nomor Invoice (contoh: INV-2026...).\n2. Hubungi WhatsApp resmi di +62 812-3456-7890.\n3. Atau email ke support@webstore.id.\n\nPengecekan ke server provider dilakukan dalam waktu kurang dari 5 menit."
  },
  faq: {
    title: "FAQ",
    content: "T: Berapa lama produk masuk?\nJ: Rata-rata 1-60 detik setelah pembayaran terverifikasi.\n\nT: Bagaimana jika belum masuk?\nJ: Cek status invoice di fitur Lacak Pesanan. Jika status 'BERHASIL' namun belum masuk, restart aplikasi atau hubungi CS.\n\nT: Ada garansi uang kembali?\nJ: Ya, 100% pengembalian dana jika gagal diproses dalam 1x24 jam."
  },
  terms: {
    title: "Syarat & Ketentuan",
    content: "1. Pastikan User ID, Server, atau Nomor Telepon tujuan sudah benar sebelum konfirmasi pembayaran.\n2. Kesalahan pengisian data akun di luar tanggung jawab WebStore.\n3. Harga dan biaya layanan tertera secara transparan pada rincian pesanan.\n4. Transaksi bersifat final setelah diteruskan ke provider."
  },
  privacy: {
    title: "Kebijakan Privasi",
    content: "1. Nomor kontak hanya digunakan untuk notifikasi invoice dan status transaksi.\n2. Data tidak akan dijual atau dibagikan kepada pihak ketiga.\n3. Seluruh komunikasi dilindungi dengan enkripsi SSL 256-Bit."
  }
};

const PAYMENT_LOGOS = [
  { name: 'QRIS', src: '/assets/payment/Qris.png' },
  { name: 'BCA', src: '/assets/payment/BCA.png' },
  { name: 'BRI', src: '/assets/payment/BRI.png' },
  { name: 'BNI', src: '/assets/payment/BNI.png' },
  { name: 'Mandiri', src: '/assets/payment/Mandiri.png' },
  { name: 'DANA', src: '/assets/payment/Dana.png' },
  { name: 'OVO', src: '/assets/payment/OVO.png' },
  { name: 'GoPay', src: '/assets/payment/Gopay.png' },
  { name: 'ShopeePay', src: '/assets/payment/ShopeePay.png' },
  { name: 'Alfamart', src: '/assets/payment/Alfamart.png' },
  { name: 'Indomaret', src: '/assets/payment/Indomaret.png' },
];

function Footer() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/60 mt-8 no-print">
      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-800 relative">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-lg text-white mb-4">
              {HELP_MODAL_DATA[activeModal].title}
            </h3>

            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950 p-4 rounded-xl border border-slate-800 mb-5">
              {HELP_MODAL_DATA[activeModal].content}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Zap className="w-4 h-4 fill-white/20 stroke-[2.4]" />
              </div>
              <span className="text-lg font-bold text-white">WebStore</span>
            </div>
            <p className="text-sm leading-relaxed">
              Platform transaksi produk digital, voucher game, dan PPOB terpercaya di Indonesia.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Layanan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/games" className="hover:text-white transition flex items-center gap-2">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  Game Online
                </Link>
              </li>
              <li>
                <Link to="/pulsa" className="hover:text-white transition flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5" />
                  Pulsa & Data
                </Link>
              </li>
              <li>
                <Link to="/emoney" className="hover:text-white transition flex items-center gap-2">
                  <Wallet className="w-3.5 h-3.5" />
                  E-Money
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Bantuan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button type="button" onClick={() => setActiveModal('cs')} className="hover:text-white transition cursor-pointer text-left">
                  Pusat Bantuan
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveModal('faq')} className="hover:text-white transition cursor-pointer text-left">
                  FAQ
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveModal('terms')} className="hover:text-white transition cursor-pointer text-left">
                  Syarat & Ketentuan
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveModal('privacy')} className="hover:text-white transition cursor-pointer text-left">
                  Kebijakan Privasi
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Kontak</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span>support@webstore.id</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span>Jakarta Selatan, DKI Jakarta</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment partners */}
        <div className="pt-6 border-t border-slate-800/60 mb-6">
          <p className="text-xs text-slate-500 mb-3">Mitra Pembayaran</p>
          <div className="flex flex-wrap items-center gap-3">
            {PAYMENT_LOGOS.map((m, idx) => (
              <div
                key={idx}
                className="h-9 px-2.5 bg-slate-900/50 rounded-lg border border-slate-800/40 flex items-center justify-center"
              >
                <img
                  src={m.src}
                  alt={m.name}
                  className="max-h-4 max-w-[55px] object-contain opacity-60 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.parentElement.querySelector('.payment-logo-fallback');
                    if (fallback) fallback.style.display = 'inline';
                  }}
                />
                <span className="payment-logo-fallback hidden text-xs text-slate-500">{m.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© 2026 WebStore Indonesia</p>
          <p className="text-center sm:text-right">
            Mitra switching & payment gateway berizin Bank Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;