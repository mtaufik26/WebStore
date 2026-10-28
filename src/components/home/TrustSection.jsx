import React from 'react';
import { ShieldCheck, Zap, CreditCard, Headphones } from 'lucide-react';

const PILLARS = [
  {
    icon: Zap,
    title: 'Proses 1–60 Detik',
    desc: 'Terintegrasi langsung dengan server provider. Produk masuk otomatis setelah pembayaran.',
  },
  {
    icon: ShieldCheck,
    title: 'Produk Legal & Resmi',
    desc: 'Seluruh voucher dan kuota dari publisher dan distributor resmi berizin.',
  },
  {
    icon: CreditCard,
    title: 'Pembayaran Lengkap',
    desc: 'QRIS, Virtual Account seluruh bank, E-Wallet, dan gerai ritel.',
  },
  {
    icon: Headphones,
    title: 'Bantuan 24/7',
    desc: 'Tim Customer Care siap membantu melalui WhatsApp dan tiket bantuan.',
  },
];

function TrustSection() {
  return (
    <section className="py-4">
      <h2 className="text-lg font-bold text-white mb-4">Mengapa WebStore</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PILLARS.map((p, idx) => {
          const IconComp = p.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-800/50 bg-slate-900/30"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 mb-4">
                <IconComp className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-white mb-1.5">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TrustSection;
