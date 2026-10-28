import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
} from 'lucide-react';

function AuthPage({ initialMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isDaftarPath = location.pathname === '/daftar' || initialMode === 'register';
  const [isLogin, setIsLogin] = useState(!isDaftarPath);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    setIsLogin(location.pathname !== '/daftar');
  }, [location.pathname]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitized = value.replace(/[<>"'`]/g, '');
    setFormData((prev) => ({
      ...prev,
      [name]: sanitized,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: 'bg-slate-800' };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { score: 1, label: 'Lemah', color: 'bg-rose-500', text: 'text-rose-400' };
    if (score <= 3) return { score: 2, label: 'Sedang', color: 'bg-amber-500', text: 'text-amber-400' };
    return { score: 3, label: 'Kuat', color: 'bg-emerald-500', text: 'text-emerald-400' };
  };

  const pwdStrength = getPasswordStrength(formData.password);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Masukkan alamat email yang valid.');
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setErrorMessage('Kata sandi minimal 6 karakter.');
      return;
    }

    if (!isLogin && !formData.fullName.trim()) {
      setErrorMessage('Nama lengkap wajib diisi.');
      return;
    }

    const userSession = {
      name: isLogin ? formData.email.split('@')[0] : formData.fullName.trim(),
      email: formData.email.toLowerCase().trim(),
      isLoggedIn: true,
      lastLogin: new Date().toISOString(),
    };
    try {
      localStorage.setItem('webstore_user', JSON.stringify(userSession));
    } catch {
      // safe fallback
    }

    setSuccessMessage(
      isLogin
        ? 'Berhasil masuk. Mengalihkan...'
        : 'Akun berhasil dibuat. Mengalihkan...'
    );

    setTimeout(() => {
      navigate('/');
    }, 900);
  };

  const inputClass = "w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition";

  return (
    <div className="min-h-screen flex bg-slate-950 font-sans text-slate-100">
      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-800 relative">
            <button
              type="button"
              onClick={() => setShowForgotPasswordModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <h3 className="font-bold text-lg text-white">Pemulihan Akun</h3>
              <p className="text-sm text-slate-400 mt-1">
                Hubungi tim kami untuk memulihkan akses akun Anda.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-sm text-slate-300 space-y-1.5 mb-5">
              <p>1. Hubungi WhatsApp CS di <strong className="text-white">+62 812-3456-7890</strong></p>
              <p>2. Sebutkan email akun WebStore Anda</p>
              <p>3. Kami akan mengirim tautan reset kata sandi</p>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(false)}
                className="px-4 py-2.5 text-sm text-slate-400 hover:bg-slate-800 rounded-lg transition cursor-pointer"
              >
                Tutup
              </button>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition cursor-pointer"
              >
                Hubungi WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Left Side — Brand & Value Proposition */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-[45%] bg-slate-900 relative flex-col justify-between p-10 xl:p-14">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </Link>

          <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
            {isLogin
              ? 'Selamat datang kembali.'
              : 'Mulai transaksi digital yang lebih cepat.'}
          </h1>
          <p className="text-base text-slate-400 leading-relaxed max-w-md">
            {isLogin
              ? 'Masuk untuk melanjutkan top-up game, pulsa, dan saldo e-wallet dengan proses otomatis.'
              : 'Buat akun untuk menikmati pelacakan pesanan, riwayat transaksi, dan promo eksklusif.'}
          </p>
        </div>

        <div className="space-y-4 mt-10">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-white">Proses otomatis 1–60 detik</p>
              <p className="text-sm text-slate-400">Langsung masuk ke akun tujuan</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-white">Produk resmi berlisensi</p>
              <p className="text-sm text-slate-400">Terhubung langsung ke server provider</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-white">Pembayaran QRIS & VA</p>
              <p className="text-sm text-slate-400">Seluruh bank nasional & e-wallet</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-10">
          © 2026 WebStore Indonesia
        </p>
      </div>

      {/* Right Side — Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-10">
        {/* Mobile back link */}
        <Link
          to="/"
          className="lg:hidden inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition mb-8 self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Link>

        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Mode switcher */}
          <div className="flex gap-6 mb-8 border-b border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`pb-3 text-sm font-medium transition border-b-2 -mb-px cursor-pointer ${
                isLogin ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`pb-3 text-sm font-medium transition border-b-2 -mb-px cursor-pointer ${
                !isLogin ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Daftar
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {isLogin ? 'Masuk ke akun Anda' : 'Buat akun baru'}
            </h2>
            <p className="text-sm text-slate-400 mt-1.5">
              {isLogin
                ? 'Masukkan email dan kata sandi untuk melanjutkan'
                : 'Isi data di bawah untuk mendaftar'}
            </p>
          </div>

          {/* Feedback */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-950/40 border border-rose-800/40 rounded-lg flex items-center gap-2.5 text-sm text-rose-300 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-lg flex items-center gap-2.5 text-sm text-emerald-300">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="fullName">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Nama lengkap Anda"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-300" htmlFor="password">
                  Kata Sandi
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(true)}
                    className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
                  >
                    Lupa?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Minimal 6 karakter"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${inputClass} pr-10 font-mono`}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength */}
              {!isLogin && formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Kekuatan:</span>
                    <span className={pwdStrength.text}>{pwdStrength.label}</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                    <div className={`h-full rounded-full transition-all ${pwdStrength.score >= 1 ? pwdStrength.color : 'bg-transparent'} flex-1`} />
                    <div className={`h-full rounded-full transition-all ${pwdStrength.score >= 2 ? pwdStrength.color : 'bg-transparent'} flex-1`} />
                    <div className={`h-full rounded-full transition-all ${pwdStrength.score >= 3 ? pwdStrength.color : 'bg-transparent'} flex-1`} />
                  </div>
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-slate-900 border-slate-700 rounded cursor-pointer"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-slate-400 cursor-pointer">
                  Ingat saya
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg transition mt-2 cursor-pointer"
            >
              {isLogin ? 'Masuk' : 'Daftar'}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="mt-6 text-center text-sm text-slate-400">
            {isLogin ? (
              <p>
                Belum punya akun?{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  Daftar
                </button>
              </p>
            ) : (
              <p>
                Sudah punya akun?{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  Masuk
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
