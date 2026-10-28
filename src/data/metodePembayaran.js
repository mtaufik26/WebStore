const paymentMethods = [
  // QRIS
  {
    name: "QRIS",
    code: "qris",
    logo: "/assets/payment/Qris.png",
    category: "qris",
    type: "qr",
    price: 0,
    feeType: "flat",
    isActive: true,
    description: "Bayar dengan scan QR pakai aplikasi e-wallet (DANA, GoPay, dll).",
    instructions: [
      "Scan QR dari layar menggunakan aplikasi e-wallet Anda.",
      "Konfirmasi pembayaran.",
      "Tunggu status berhasil otomatis."
    ]
  },

  // Virtual Account (Bank Umum)
  {
    name: "Bank BCA",
    code: "bca_va",
    logo: "/assets/payment/BCA.png",
    category: "virtual-account",
    type: "virtual-account",
    price: 1000,
    feeType: "flat",
    isActive: true,
    minAmount: 10000,
    maxAmount: 25000000,
    description: "Transfer ke Virtual Account BCA.",
    instructions: [
      "Buka BCA Mobile / KlikBCA / ATM.",
      "Pilih menu Transfer > Virtual Account.",
      "Masukkan nomor VA dan bayar sesuai nominal."
    ]
  },
  {
    name: "Bank BRI",
    code: "bri_va",
    logo: "/assets/payment/BRI.png",
    category: "virtual-account",
    type: "virtual-account",
    price: 1000,
    feeType: "flat",
    isActive: true,
    minAmount: 10000,
    maxAmount: 25000000,
    description: "Transfer ke Virtual Account BRI.",
    instructions: [
      "Gunakan ATM / BRImo / Internet Banking.",
      "Masukkan nomor VA dan jumlah pembayaran.",
      "Selesaikan transaksi."
    ]
  },
  {
    name: "Bank BNI",
    code: "bni_va",
    logo: "/assets/payment/BNI.png",
    category: "virtual-account",
    type: "virtual-account",
    price: 1000,
    feeType: "flat",
    isActive: true,
    minAmount: 10000,
    maxAmount: 25000000,
    description: "Transfer ke Virtual Account BNI.",
    instructions: [
      "Gunakan BNI Mobile / ATM BNI.",
      "Masukkan nomor VA dan nominal sesuai tagihan."
    ]
  },
  {
    name: "Bank Mandiri",
    code: "mandiri_va",
    logo: "/assets/payment/Mandiri.png",
    category: "virtual-account",
    type: "virtual-account",
    price: 1000,
    feeType: "flat",
    isActive: true,
    minAmount: 10000,
    maxAmount: 25000000,
    description: "Transfer ke Virtual Account Mandiri.",
    instructions: [
      "Akses Livin' by Mandiri atau ATM.",
      "Pilih pembayaran > VA > masukkan nomor VA."
    ]
  },

  // E-Wallet Populer
  {
    name: "DANA",
    code: "dana",
    logo: "/assets/payment/Dana.png",
    category: "e-wallet",
    type: "e-wallet",
    price: 1000,
    feeType: "flat",
    isActive: true,
    minAmount: 1000,
    maxAmount: 2000000,
    description: "Pembayaran cepat dengan saldo DANA.",
    instructions: [
      "Masuk ke aplikasi DANA.",
      "Pilih menu Kirim atau Scan QR.",
      "Ikuti instruksi dan bayar."
    ]
  },
  {
    name: "OVO",
    code: "ovo",
    logo: "/assets/payment/OVO.png",
    category: "e-wallet",
    type: "e-wallet",
    price: 1000,
    feeType: "flat",
    isActive: true,
    minAmount: 1000,
    maxAmount: 2000000,
    description: "Gunakan OVO untuk membayar transaksi.",
    instructions: [
      "Masuk ke aplikasi OVO.",
      "Pilih menu Transfer / Bayar Merchant.",
      "Masukkan kode atau scan QR."
    ]
  },
  {
    name: "GoPay",
    code: "gopay",
    logo: "/assets/payment/Gopay.png",
    category: "e-wallet",
    type: "e-wallet",
    price: 1000,
    feeType: "flat",
    isActive: true,
    minAmount: 1000,
    maxAmount: 2000000,
    description: "Bayar pakai GoPay langsung dari Gojek.",
    instructions: [
      "Masuk ke aplikasi Gojek.",
      "Gunakan menu Bayar.",
      "Scan kode atau masukkan merchant ID."
    ]
  },
  {
    name: "ShopeePay",
    code: "shopeepay",
    logo: "/assets/payment/ShopeePay.png",
    category: "e-wallet",
    type: "e-wallet",
    price: 1000,
    feeType: "flat",
    isActive: true,
    minAmount: 1000,
    maxAmount: 2000000,
    description: "Bayar lewat ShopeePay langsung.",
    instructions: [
      "Masuk ke aplikasi Shopee.",
      "Buka ShopeePay > Bayar.",
      "Gunakan scan QR atau kode bayar."
    ]
  },

  // Minimarket
  {
    name: "Alfamart",
    code: "alfamart",
    logo: "/assets/payment/Alfamart.png",
    category: "convenience-store",
    type: "retail",
    price: 1500,
    feeType: "flat",
    isActive: true,
    minAmount: 10000,
    maxAmount: 250000,
    description: "Bayar tunai di kasir Alfamart.",
    instructions: [
      "Datang ke Alfamart terdekat.",
      "Tunjukkan kode bayar ke kasir.",
      "Bayar sesuai nominal dan simpan struk."
    ]
  },
  {
    name: "Indomaret",
    code: "indomaret",
    logo: "/assets/payment/Indomaret.png",
    category: "convenience-store",
    type: "retail",
    price: 1500,
    feeType: "flat",
    isActive: true,
    minAmount: 10000,
    maxAmount: 250000,
    description: "Bayar langsung di Indomaret.",
    instructions: [
      "Tunjukkan kode pembayaran di kasir.",
      "Bayar dan simpan bukti pembayaran."
    ]
  }
];

export default paymentMethods;
