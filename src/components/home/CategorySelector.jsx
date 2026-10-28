import React from 'react';
import { Gamepad2, Smartphone, Wallet } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'games',
    name: 'Game Online',
    count: '5 Game',
    icon: Gamepad2,
  },
  {
    id: 'pulsa',
    name: 'Pulsa & Data',
    count: '3 Operator',
    icon: Smartphone,
  },
  {
    id: 'emoney',
    name: 'E-Money',
    count: '3 Dompet',
    icon: Wallet,
  },
];

function CategorySelector({ selected = 'games', onSelect }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-4">Kategori</h2>

      <div className="grid grid-cols-3 gap-3">
        {CATEGORIES.map((category) => {
          const isSelected = selected === category.id;
          const IconComponent = category.icon;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect?.(category.id)}
              className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border transition text-left cursor-pointer ${
                isSelected
                  ? 'border-blue-500/50 bg-blue-950/20'
                  : 'border-slate-800/50 bg-slate-900/30 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </div>

              <div className="min-w-0">
                <h3 className={`text-sm font-semibold truncate ${
                  isSelected ? 'text-white' : 'text-slate-300'
                }`}>
                  {category.name}
                </h3>
                <span className="text-xs text-slate-500">
                  {category.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CategorySelector;