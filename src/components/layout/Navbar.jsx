import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Search from './Search';
import {
  ShieldCheck,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Search as SearchIconLucide,
  Gamepad2,
  Smartphone,
  Wallet,
  ReceiptText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Zap,
} from 'lucide-react';

const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0" aria-label="WebStore Beranda">
    <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
      <Zap className="w-4 h-4 fill-white/20 stroke-[2.4]" />
    </div>
    <span className="text-lg font-bold tracking-tight text-white">
      WebStore
    </span>
  </Link>
);

const UserDropdown = ({ user, onLogout, onOpenTracker }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to="/daftar"
          className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
        >
          Daftar
        </Link>
        <Link
          to="/masuk"
          className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
        >
          Masuk
        </Link>
      </div>
    );
  }

  const initials = user.name ? user.name.slice(0, 2).toUpperCase() : 'US';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Menu akun pengguna"
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800/60 transition cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 font-bold text-xs flex items-center justify-center">
          {initials}
        </div>
        <span className="text-sm font-medium text-slate-200 max-w-[110px] truncate hidden sm:inline">
          {user.name}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div role="menu" className="absolute right-0 mt-2 w-52 bg-slate-900 rounded-xl shadow-xl border border-slate-800 py-1 z-50">
          <div className="px-4 py-2.5 border-b border-slate-800">
            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-400 truncate">{user.email || 'Member'}</p>
          </div>

          <div className="py-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onOpenTracker();
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition text-left cursor-pointer"
            >
              <ReceiptText className="w-4 h-4 text-slate-400" />
              <span>Riwayat Pesanan</span>
            </button>
          </div>

          <div className="pt-1 border-t border-slate-800">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-400 hover:bg-rose-950/30 transition text-left cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showTrackerModal, setShowTrackerModal] = useState(false);
  const [trackerQuery, setTrackerQuery] = useState('');
  const [trackerResult, setTrackerResult] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [copiedInvoice, setCopiedInvoice] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isGamesActive = location.pathname === '/games' || location.pathname.startsWith('/games/') || location.pathname.startsWith('/game/');
  const isPulsaActive = location.pathname === '/pulsa' || location.pathname.startsWith('/pulsa/');
  const isEmoneyActive = location.pathname === '/emoney' || location.pathname.startsWith('/emoney/');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    try {
      const stored = localStorage.getItem('webstore_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // safe fallback
    }

    try {
      const history = JSON.parse(localStorage.getItem('webstore_order_history') || '[]');
      setOrderHistory(history);
    } catch {
      // safe fallback
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('webstore_user');
    setUser(null);
    navigate('/');
  };

  const handleCopy = (text) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 2000);
  };

  const handleSearchInvoice = (e) => {
    e.preventDefault();
    if (!trackerQuery.trim()) return;

    const query = trackerQuery.trim().toUpperCase();
    const found = orderHistory.find(
      (item) => item.invoiceCode?.toUpperCase() === query || item.transactionCode?.toUpperCase() === query
    );

    if (found) {
      setTrackerResult({ found: true, data: found });
    } else {
      setTrackerResult({
        found: false,
        message: `Nomor invoice "${trackerQuery}" tidak ditemukan. Pastikan nomor invoice sesuai riwayat transaksi simulasi Anda atau pilih dari daftar di bawah.`,
      });
    }
  };

  const navLinkClass = (active) =>
    `text-sm font-medium transition px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
      active
        ? 'text-white bg-slate-800'
        : 'text-slate-400 hover:text-white'
    }`;

  return (
    <>
      {/* Tracker Modal */}
      {showTrackerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-800 relative">
            <button
              type="button"
              onClick={() => {
                setShowTrackerModal(false);
                setTrackerResult(null);
                setTrackerQuery('');
              }}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <h3 className="text-lg font-bold text-white">Lacak Pesanan</h3>
              <p className="text-sm text-slate-400 mt-0.5">Cek status transaksi dengan nomor invoice</p>
            </div>

            <form onSubmit={handleSearchInvoice} className="mb-5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Masukkan nomor invoice (INV-2026...)"
                  value={trackerQuery}
                  onChange={(e) => setTrackerQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
                >
                  Cari
                </button>
              </div>
            </form>

            {/* Result view */}
            {trackerResult && (
              <div className="mb-5">
                {trackerResult.found ? (
                  <div className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Status: {trackerResult.data.status || 'BERHASIL'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(trackerResult.data.invoiceCode)}
                        className="text-xs text-emerald-300 hover:text-emerald-100 inline-flex items-center gap-1 cursor-pointer"
                      >
                        {copiedInvoice ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedInvoice ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>
                    <div className="space-y-1.5 text-sm text-slate-300">
                      <p><span className="text-slate-400">Invoice:</span> <span className="font-mono text-blue-400">{trackerResult.data.invoiceCode}</span></p>
                      {trackerResult.data.title && <p><span className="text-slate-400">Layanan:</span> {trackerResult.data.title} {trackerResult.data.itemName ? `(${trackerResult.data.itemName})` : ''}</p>}
                      {trackerResult.data.totalBayar && (
                        <p><span className="text-slate-400">Total:</span> <span className="font-mono font-semibold text-white">Rp {Number(trackerResult.data.totalBayar).toLocaleString('id-ID')}</span></p>
                      )}
                      {trackerResult.data.serialNumber && (
                        <p><span className="text-slate-400">SN:</span> <span className="font-mono text-emerald-300">{trackerResult.data.serialNumber}</span></p>
                      )}
                      {trackerResult.data.note && <p className="text-xs text-emerald-300/80 mt-1">{trackerResult.data.note}</p>}
                    </div>

                    <div className="mt-3 pt-2 border-t border-emerald-800/30 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setShowTrackerModal(false);
                          navigate('/pulsa/beli/tkl/verificationsuccess', {
                            state: {
                              invoiceCode: trackerResult.data.invoiceCode,
                              transactionCode: trackerResult.data.transactionCode || 'TXN-TRACKED',
                              title: trackerResult.data.title || 'Produk WebStore',
                              selectedTopup: { name: trackerResult.data.itemName || 'Layanan Digital' },
                              totalBayar: trackerResult.data.totalBayar || 0,
                              selectedMethod: { name: trackerResult.data.methodName || 'Pembayaran Digital' },
                            },
                          });
                        }}
                        className="text-sm text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Buka Struk</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-xl flex items-start gap-2.5 text-sm text-amber-300">
                    <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>{trackerResult.message}</span>
                  </div>
                )}
              </div>
            )}

            {/* Recent Orders */}
            <div>
              <p className="text-sm font-medium text-slate-300 mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Transaksi Terakhir</span>
                </span>
                {orderHistory.length > 0 && (
                  <span className="text-xs text-slate-500">{orderHistory.length} transaksi</span>
                )}
              </p>
              {orderHistory.length === 0 ? (
                <div className="p-4 text-center bg-slate-950 rounded-lg border border-slate-800 text-sm text-slate-500">
                  Belum ada transaksi tersimpan.
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {orderHistory.slice(0, 4).map((rec, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setTrackerQuery(rec.invoiceCode);
                        setTrackerResult({ found: true, data: rec });
                      }}
                      className="p-3 bg-slate-950 hover:bg-slate-800/60 rounded-lg border border-slate-800 transition cursor-pointer flex items-center justify-between text-sm"
                    >
                      <div>
                        <p className="font-medium text-white">{rec.title} - {rec.itemName}</p>
                        <p className="text-xs font-mono text-slate-400">{rec.invoiceCode}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-blue-400 font-mono">
                          Rp {Number(rec.totalBayar || 0).toLocaleString('id-ID')}
                        </span>
                        <span className="block text-xs text-emerald-400">Lunas</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-md border-slate-800'
            : 'bg-slate-900/80 backdrop-blur-sm border-slate-800/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 gap-4">
            <Logo />

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg mx-4">
              <div className="w-full">
                <Search />
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              <Link to="/games" className={navLinkClass(isGamesActive)}>
                <Gamepad2 className="w-4 h-4" />
                <span>Game</span>
              </Link>
              <Link to="/pulsa" className={navLinkClass(isPulsaActive)}>
                <Smartphone className="w-4 h-4" />
                <span>Pulsa</span>
              </Link>
              <Link to="/emoney" className={navLinkClass(isEmoneyActive)}>
                <Wallet className="w-4 h-4" />
                <span>E-Money</span>
              </Link>

              <button
                type="button"
                onClick={() => setShowTrackerModal(true)}
                className="text-sm text-slate-400 hover:text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
              >
                <ReceiptText className="w-4 h-4" />
                <span className="hidden lg:inline">Lacak</span>
              </button>

              <div className="h-5 w-px bg-slate-800 mx-1"></div>

              <UserDropdown
                user={user}
                onLogout={handleLogout}
                onOpenTracker={() => setShowTrackerModal(true)}
              />
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-1">
              <button
                type="button"
                onClick={() => setShowTrackerModal(true)}
                className="p-2 text-slate-400 hover:text-white rounded-lg"
                aria-label="Lacak Pesanan"
              >
                <ReceiptText className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowMobileSearch(!showMobileSearch);
                  if (isMenuOpen) setIsMenuOpen(false);
                }}
                className="p-2 text-slate-400 hover:text-white rounded-lg"
                aria-label="Cari Produk"
              >
                <SearchIconLucide className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  if (showMobileSearch) setShowMobileSearch(false);
                }}
                className="p-2 text-slate-400 hover:text-white rounded-lg"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {showMobileSearch && (
            <div className="md:hidden py-3 border-t border-slate-800">
              <Search onSelect={() => setShowMobileSearch(false)} />
            </div>
          )}

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800 space-y-3">
              {user ? (
                <div className="p-3 bg-slate-800/40 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-white">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email || 'Member'}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="text-xs font-medium text-rose-400 px-3 py-1.5 rounded-lg border border-rose-900/30"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/masuk"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-center py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/daftar"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-center py-2.5 bg-slate-800 text-slate-200 rounded-lg font-medium text-sm border border-slate-700"
                  >
                    Daftar
                  </Link>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800 space-y-0.5">
                <Link
                  to="/games"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800/60 rounded-lg transition"
                >
                  <Gamepad2 className="w-4 h-4 text-slate-400" />
                  <span>Game Online</span>
                </Link>
                <Link
                  to="/pulsa"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800/60 rounded-lg transition"
                >
                  <Smartphone className="w-4 h-4 text-slate-400" />
                  <span>Pulsa & Data</span>
                </Link>
                <Link
                  to="/emoney"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800/60 rounded-lg transition"
                >
                  <Wallet className="w-4 h-4 text-slate-400" />
                  <span>E-Money</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowTrackerModal(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800/60 rounded-lg transition text-left"
                >
                  <ReceiptText className="w-4 h-4 text-slate-400" />
                  <span>Lacak Pesanan</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;