const data = {
  games: {
    "Mobile Legends": {
      ID: "1",
      CategoryGame: "ML",
      title: "Mobile Legends",
      image: "/assets/product/Game/ML.jpeg",
      background: "/assets/background/Game/ML.png",
      creator: "Moonton",
      category: "game",
      currency: "Diamonds",
      idFields: [
        { name: "userId", label: "User ID", placeholder: "Masukkan User ID", required: true },
        { name: "zoneId", label: "Zone ID", placeholder: "Masukkan Zone ID", required: true }
      ],
      topupOptions: [
        { id: 1, name: "86 Diamonds", price: "Rp 20.000", bonus: "+4 Bonus" },
        { id: 2, name: "172 Diamonds", price: "Rp 40.000", bonus: "+8 Bonus" },
        { id: 3, name: "257 Diamonds", price: "Rp 60.000", bonus: "+12 Bonus" },
        { id: 4, name: "344 Diamonds", price: "Rp 80.000", bonus: "+16 Bonus" },
        { id: 5, name: "429 Diamonds", price: "Rp 100.000", bonus: "+20 Bonus" },
        { id: 6, name: "514 Diamonds", price: "Rp 120.000", bonus: "+24 Bonus" },
        { id: 7, name: "706 Diamonds", price: "Rp 160.000", bonus: "+32 Bonus" },
        { id: 8, name: "878 Diamonds", price: "Rp 200.000", bonus: "+40 Bonus" }
      ],
      guide: "Masuk ke profil akun game Anda, User ID dan Zone ID akan terlihat di bawah nickname Anda."
    },
    "PUBG Mobile": {
      ID: "2",
      CategoryGame: "PM",
      title: "PUBG Mobile",
      image: "/assets/product/Game/PUBG.png",
      background: "/assets/background/Game/PUBG.png",
      creator: "Tencent Games",
      category: "game",
      currency: "UC",
      idFields: [
        { name: "userId", label: "Player ID", placeholder: "Masukkan Player ID", required: true }
      ],
      topupOptions: [
        { id: 1, name: "60 UC", price: "Rp 15.000", bonus: "+6 Bonus" },
        { id: 2, name: "125 UC", price: "Rp 30.000", bonus: "+13 Bonus" },
        { id: 3, name: "250 UC", price: "Rp 60.000", bonus: "+25 Bonus" },
        { id: 4, name: "500 UC", price: "Rp 120.000", bonus: "+50 Bonus" },
        { id: 5, name: "750 UC", price: "Rp 180.000", bonus: "+75 Bonus" },
        { id: 6, name: "1500 UC", price: "Rp 360.000", bonus: "+150 Bonus" },
        { id: 7, name: "3000 UC", price: "Rp 720.000", bonus: "+300 Bonus" },
        { id: 8, name: "6000 UC", price: "Rp 1.440.000", bonus: "+600 Bonus" }
      ],
      guide: "Buka PUBG Mobile, tap avatar di pojok kiri atas, Player ID akan terlihat di bawah nama karakter Anda."
    },
    "Free Fire": {
      ID: "3",
      CategoryGame: "FF",
      title: "Free Fire",
      image: "/assets/product/Game/FF.png",
      background: "/assets/background/Game/FF.png",
      creator: "Garena",
      category: "game",
      currency: "Diamonds",
      idFields: [
        { name: "userId", label: "User ID", placeholder: "Masukkan User ID", required: true }
      ],
      topupOptions: [
        { id: 1, name: "40 Diamonds", price: "Rp 6.000", bonus: "+3 Bonus" },
        { id: 2, name: "70 Diamonds", price: "Rp 10.000", bonus: "+7 Bonus" },
        { id: 3, name: "140 Diamonds", price: "Rp 20.000", bonus: "+14 Bonus" },
        { id: 4, name: "355 Diamonds", price: "Rp 50.000", bonus: "+36 Bonus" },
        { id: 5, name: "720 Diamonds", price: "Rp 100.000", bonus: "+72 Bonus" },
        { id: 6, name: "1450 Diamonds", price: "Rp 200.000", bonus: "+145 Bonus" },
        { id: 7, name: "2180 Diamonds", price: "Rp 300.000", bonus: "+218 Bonus" },
        { id: 8, name: "3640 Diamonds", price: "Rp 500.000", bonus: "+364 Bonus" },
        { id: 9, name: "7290 Diamonds", price: "Rp 1.000.000", bonus: "+729 Bonus" }
      ],
      guide: "Buka Free Fire, tap avatar di pojok kiri atas, User ID akan terlihat di profil Anda."
    },
    "Genshin Impact": {
      ID: "4",
      CategoryGame: "GI",
      title: "Genshin Impact",
      image: "/assets/product/Game/GS.png",
      background: "/assets/background/Game/GS.png",
      creator: "HoYoverse",
      category: "game",
      currency: "Genesis Crystal",
      idFields: [
        { name: "userId", label: "UID", placeholder: "Masukkan UID", required: true },
        { name: "server", label: "Server", placeholder: "Pilih Server", required: true, type: "select", options: ["Asia", "America", "Europe", "TW/HK/MO"] }
      ],
      topupOptions: [
        { id: 1, name: "60 Genesis Crystal", price: "Rp 15.000", bonus: "+300 Primogems" },
        { id: 2, name: "330 Genesis Crystal", price: "Rp 75.000", bonus: "+1600 Primogems" },
        { id: 3, name: "1090 Genesis Crystal", price: "Rp 240.000", bonus: "+5400 Primogems" },
        { id: 4, name: "2240 Genesis Crystal", price: "Rp 480.000", bonus: "+11200 Primogems" },
        { id: 5, name: "3880 Genesis Crystal", price: "Rp 800.000", bonus: "+19400 Primogems" },
        { id: 6, name: "8080 Genesis Crystal", price: "Rp 1.600.000", bonus: "+40400 Primogems" }
      ],
      guide: "Buka Genshin Impact, tekan Esc atau Menu, pilih Settings, UID akan terlihat di pojok kiri bawah."
    },
    "Valorant": {
      ID: "5",
      CategoryGame: "VAL",
      title: "Valorant",
      image: "/assets/product/Game/VALO.png",
      background: "/assets/background/Game/VALO.png",
      creator: "Riot Games",
      category: "game",
      currency: "VP",
      idFields: [
        { name: "riotId", label: "Riot ID", placeholder: "Username#TAG", required: true }
      ],
      topupOptions: [
        { id: 1, name: "125 VP", price: "Rp 20.000", bonus: "+25 Bonus" },
        { id: 2, name: "420 VP", price: "Rp 65.000", bonus: "+85 Bonus" },
        { id: 3, name: "700 VP", price: "Rp 105.000", bonus: "+150 Bonus" },
        { id: 4, name: "1375 VP", price: "Rp 200.000", bonus: "+300 Bonus" },
        { id: 5, name: "2400 VP", price: "Rp 350.000", bonus: "+550 Bonus" },
        { id: 6, name: "4000 VP", price: "Rp 570.000", bonus: "+950 Bonus" }
      ],
      guide: "Buka Valorant, masuk ke Collection, klik pada avatar Anda, Riot ID akan terlihat di profil."
    }
  },
  pulsa: {
    "TRI": {
      ID: "1",
      CategoryPulsa: "Tri",
      title: "Pulsa Tri",
      image: "/assets/product/Pulsa/TRI.png",
      background: "/assets/background/Pulsa/TRI.png",
      creator: "Tri Indonesia",
      category: "pulsa",
      currency: "Pulsa",
      idFields: [
        { name: "phoneNumber", label: "Nomor Telepon", placeholder: "Masukkan Nomor Telepon", required: true }
      ],
      topupOptions: [
        { id: 1, name: "Pulsa Rp 10.000", price: "Rp 10.000" },
        { id: 2, name: "Pulsa Rp 20.000", price: "Rp 20.000" },
        { id: 3, name: "Pulsa Rp 50.000", price: "Rp 50.000" },
        { id: 4, name: "Pulsa Rp 100.000", price: "Rp 100.000" },
        { id: 5, name: "Pulsa Rp 200.000", price: "Rp 200.000" }
      ],
      guide: "Masukkan nomor telepon yang aktif untuk menerima pulsa."
    },
    "TELKOMSEL": {
      ID: "2",
      CategoryPulsa: "TKL",
      title: "Pulsa Telkomsel",
      image: "/assets/product/Pulsa/TKL.png",
      background: "/assets/background/Pulsa/TKL.png",
      creator: "Telkomsel",
      category: "pulsa",
      currency: "Pulsa",
      idFields: [
        { name: "phoneNumber", label: "Nomor Telepon", placeholder: "Masukkan Nomor Telepon", required: true }
      ],
      topupOptions: [
        { id: 1, name: "Pulsa Rp 10.000", price: "Rp 10.000" },
        { id: 2, name: "Pulsa Rp 20.000", price: "Rp 20.000" },
        { id: 3, name: "Pulsa Rp 50.000", price: "Rp 50.000" },
        { id: 4, name: "Pulsa Rp 100.000", price: "Rp 100.000" },
        { id: 5, name: "Pulsa Rp 200.000", price: "Rp 200.000" }
      ],
      guide: "Masukkan nomor telepon yang aktif untuk menerima pulsa."
    },
    "INDOSAT": {
      ID: "3",
      CategoryPulsa: "IT",
      title: "Pulsa Indosat",
      image: "/assets/product/Pulsa/IT.png",
      background: "/assets/background/Pulsa/IT.png",
      creator: "Indosat Ooredoo Hutchison",
      category: "pulsa",
      currency: "Pulsa",
      idFields: [
        { name: "phoneNumber", label: "Nomor Telepon", placeholder: "Masukkan Nomor Telepon", required: true }
      ],
      topupOptions: [
        { id: 1, name: "Pulsa Rp 10.000", price: "Rp 10.000" },
        { id: 2, name: "Pulsa Rp 20.000", price: "Rp 20.000" },
        { id: 3, name: "Pulsa Rp 50.000", price: "Rp 50.000" },
        { id: 4, name: "Pulsa Rp 100.000", price: "Rp 100.000" },
        { id: 5, name: "Pulsa Rp 200.000", price: "Rp 200.000" }
      ],
      guide: "Masukkan nomor telepon yang aktif untuk menerima pulsa."
    }
  },
  emoney: {
    "Dana": {
      ID: "1",
      CategoryEmoney: "DN",
      title: "Dana",
      image: "/assets/product/E-Wallet/DN.png",
      background: "/assets/background/E-Wallet/DN.png",
      creator: "PT Espay Debit Indonesia Koe",
      category: "emoney",
      currency: "Saldo",
      idFields: [
        { name: "accountNumber", label: "Nomor Akun", placeholder: "Masukkan Nomor Akun", required: true }
      ],
      topupOptions: [
        { id: 1, name: "Saldo Rp 10.000", price: "Rp 10.000" },
        { id: 2, name: "Saldo Rp 20.000", price: "Rp 20.000" },
        { id: 3, name: "Saldo Rp 50.000", price: "Rp 50.000" },
        { id: 4, name: "Saldo Rp 100.000", price: "Rp 100.000" },
        { id: 5, name: "Saldo Rp 200.000", price: "Rp 200.000" }
      ],
      guide: "Masukkan nomor akun e-money Anda untuk top-up saldo."
    },
    "OVO": {
      ID: "2",
      CategoryEmoney: "OVO",
      title: "OVO",
      image: "/assets/product/E-Wallet/OVO.png",
      background: "/assets/background/E-Wallet/OVO.png",
      creator: "PT Visionet Internasional",
      category: "emoney",
      currency: "Saldo",
      idFields: [
        { name: "accountNumber", label: "Nomor Akun", placeholder: "Masukkan Nomor Akun", required: true }
      ],
      topupOptions: [
        { id: 1, name: "Saldo Rp 10.000", price: "Rp 10.000" },
        { id: 2, name: "Saldo Rp 20.000", price: "Rp 20.000" },
        { id: 3, name: "Saldo Rp 50.000", price: "Rp 50.000" },
        { id: 4, name: "Saldo Rp 100.000", price: "Rp 100.000" },
        { id: 5, name: "Saldo Rp 200.000", price: "Rp 200.000" }
      ],
      guide: "Masukkan nomor akun e-money Anda untuk top-up saldo."
    },
    "GOPAY": {
      ID: "3",
      CategoryEmoney: "GP",
      title: "GoPay",
      image: "/assets/product/E-Wallet/GP.png",
      background: "/assets/background/E-Wallet/GP.png",
      creator: "PT Dompet Anak Bangsa",
      category: "emoney",
      currency: "Saldo",
      idFields: [
        { name: "accountNumber", label: "Nomor Akun", placeholder: "Masukkan Nomor Akun", required: true }
      ],
      topupOptions: [
        { id: 1, name: "Saldo Rp 10.000", price: "Rp 10.000" },
        { id: 2, name: "Saldo Rp 20.000", price: "Rp 20.000" },
        { id: 3, name: "Saldo Rp 50.000", price: "Rp 50.000" },
        { id: 4, name: "Saldo Rp 100.000", price: "Rp 100.000" },
        { id: 5, name: "Saldo Rp 200.000", price: "Rp 200.000" }
      ],
      guide: "Masukkan nomor akun e-money Anda untuk top-up saldo."
    }
  },
  codepromo: {
    "Promo1": {
      ID: "1",
      title: "Diskon 10%",
      description: "Dapatkan diskon 10% untuk transaksi pilihan Anda.",
      code: "PROMO10",
      validUntil: "2026-12-31",
      category: "diskon"
    },
    "Promo2": {
      ID: "2",
      title: "Potongan Rp 5.000",
      description: "Potongan langsung Rp 5.000 untuk minimal transaksi.",
      code: "HEMAT5RB",
      discountAmount: 5000,
      validUntil: "2026-12-31",
      category: "promo"
    }
  }
};

export default data;