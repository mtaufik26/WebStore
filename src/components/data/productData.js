const data = {
  pulsa: {
    "TRI": {
      ID: "1",
      CategoryPulsa: "Tri",
      title: "Pulsa Tri",
      image: "/images/pulsa/tri.png",
      background: "/images/backgrounds/tri.jpg",
      creator: "Tri Indonesia",
      category: "pulsa",
      currency: "Pulsa",
      currencyIcon: "📱",
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
  },
  emoney: {
    "Dana": {
      ID: "1",
      CategoryEmoney: "DN",
      title: "Dana",
      image: "/images/emoney/dana.png",
      background: "/images/backgrounds/dana.jpg",
      creator: "PT Espay Debit Indonesia Koe",
      category: "emoney",
      currency: "Saldo",
      currencyIcon: "💳",
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
  },
    codepromo: {
    "Promo1": {
      ID: "1",
      title: "Diskon 10%",
      description: "Dapatkan diskon 10% untuk pembelian pertama Anda.",
      code: "PROMO10",
      validUntil: "2024-12-31",
      category: "diskon"
    }
  }
};

export default data ;