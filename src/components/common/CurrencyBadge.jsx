import React from 'react';

/**
 * Professional vector currency badges for PPOB and game top-up items.
 * Replaces generic emojis with game-authentic, crisp SVG badges.
 */
export function CurrencyBadge({ currency = '', className = 'w-4 h-4' }) {
  const norm = currency.toLowerCase().trim();

  // Mobile Legends / Free Fire Diamonds
  if (norm.includes('diamond')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} flex-shrink-0 text-sky-400`}
        aria-label="Diamond"
      >
        <path
          d="M6 3L2 9L12 22L22 9L18 3H6Z"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M2 9H22M12 22L7.5 9L10 3M12 22L16.5 9L14 3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // PUBG Mobile Unknown Cash (UC)
  if (norm.includes('uc')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} flex-shrink-0 text-amber-500`}
        aria-label="PUBG UC"
      >
        <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
        <text
          x="12"
          y="15"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8.5"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          letterSpacing="-0.5"
        >
          UC
        </text>
      </svg>
    );
  }

  // Genshin Impact Genesis Crystal
  if (norm.includes('genesis') || norm.includes('crystal') || norm.includes('primogem')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} flex-shrink-0 text-indigo-400`}
        aria-label="Genesis Crystal"
      >
        <path
          d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"
          fill="currentColor"
          fillOpacity="0.3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2.5" fill="#38BDF8" />
      </svg>
    );
  }

  // Valorant Points (VP)
  if (norm.includes('vp') || norm.includes('valorant')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} flex-shrink-0 text-rose-500`}
        aria-label="Valorant VP"
      >
        <path
          d="M12 2L21 7V17L12 22L3 17V7L12 2Z"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 7.5L12 16.5L16.5 7.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Pulsa (Cellular Credit)
  if (norm.includes('pulsa')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} flex-shrink-0 text-emerald-500`}
        aria-label="Pulsa"
      >
        <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M9 7L15 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M15 11L9 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // E-Money / Saldo
  if (norm.includes('saldo') || norm.includes('emoney')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} flex-shrink-0 text-blue-500`}
        aria-label="Saldo E-Money"
      >
        <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.15" />
        <path d="M3 10H21" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.5" cy="15" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  // Default Digital Token
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} flex-shrink-0 text-blue-500`}
      aria-label="Token"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7V17M9 10H15M9 14H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default CurrencyBadge;
