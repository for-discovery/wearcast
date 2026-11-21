import React from "react";

/**
 * Her ülkenin gerçek bayrağını net SVG olarak çizen bileşen
 * (Windows'ta bayrak emojileri TR, FR şeklinde harf olarak göründüğü için gerçek SVG bayrak kullanılır)
 */
export default function CountryFlagIcon({ code, className = "w-6 h-4" }) {
  switch (code) {
    case "TR": // Türkiye
      return (
        <svg viewBox="0 0 36 24" className={`${className} rounded-[3px] shadow-xs shrink-0`}>
          <rect width="36" height="24" fill="#E30A17" />
          <circle cx="15" cy="12" r="6" fill="#FFFFFF" />
          <circle cx="16.6" cy="12" r="4.8" fill="#E30A17" />
          <polygon
            points="21.5,12 25.6,13.3 23.1,9.8 23.1,14.2 25.6,10.7"
            fill="#FFFFFF"
          />
        </svg>
      );
    case "FR": // Fransa
      return (
        <svg viewBox="0 0 36 24" className={`${className} rounded-[3px] shadow-xs shrink-0`}>
          <rect width="12" height="24" x="0" fill="#002395" />
          <rect width="12" height="24" x="12" fill="#FFFFFF" />
          <rect width="12" height="24" x="24" fill="#ED2939" />
        </svg>
      );
    case "ES": // İspanya
      return (
        <svg viewBox="0 0 36 24" className={`${className} rounded-[3px] shadow-xs shrink-0`}>
          <rect width="36" height="24" fill="#AA151B" />
          <rect width="36" height="12" y="6" fill="#F1BF00" />
          <circle cx="10" cy="12" r="2.3" fill="#AA151B" />
        </svg>
      );
    case "IT": // İtalya
      return (
        <svg viewBox="0 0 36 24" className={`${className} rounded-[3px] shadow-xs shrink-0`}>
          <rect width="12" height="24" x="0" fill="#009246" />
          <rect width="12" height="24" x="12" fill="#FFFFFF" />
          <rect width="12" height="24" x="24" fill="#CE2B37" />
        </svg>
      );
    case "US": // ABD
      return (
        <svg viewBox="0 0 36 24" className={`${className} rounded-[3px] shadow-xs shrink-0`}>
          <rect width="36" height="24" fill="#B22234" />
          <path
            d="M0,3.7H36 M0,7.4H36 M0,11.1H36 M0,14.8H36 M0,18.5H36 M0,22.2H36"
            stroke="#FFFFFF"
            strokeWidth="1.8"
          />
          <rect width="15" height="13" fill="#3C3B6E" />
          <circle cx="3.5" cy="3.5" r="0.9" fill="#FFFFFF" />
          <circle cx="7.5" cy="3.5" r="0.9" fill="#FFFFFF" />
          <circle cx="11.5" cy="3.5" r="0.9" fill="#FFFFFF" />
          <circle cx="5.5" cy="6.5" r="0.9" fill="#FFFFFF" />
          <circle cx="9.5" cy="6.5" r="0.9" fill="#FFFFFF" />
          <circle cx="3.5" cy="9.5" r="0.9" fill="#FFFFFF" />
          <circle cx="7.5" cy="9.5" r="0.9" fill="#FFFFFF" />
          <circle cx="11.5" cy="9.5" r="0.9" fill="#FFFFFF" />
        </svg>
      );
    case "GB": // Birleşik Krallık
      return (
        <svg viewBox="0 0 36 24" className={`${className} rounded-[3px] shadow-xs shrink-0`}>
          <rect width="36" height="24" fill="#012169" />
          <path d="M0,0 L36,24 M36,0 L0,24" stroke="#FFFFFF" strokeWidth="4" />
          <path d="M0,0 L36,24 M36,0 L0,24" stroke="#C8102E" strokeWidth="2" />
          <path d="M18,0 V24 M0,12 H36" stroke="#FFFFFF" strokeWidth="6.5" />
          <path d="M18,0 V24 M0,12 H36" stroke="#C8102E" strokeWidth="3.8" />
        </svg>
      );
    case "DE": // Almanya
      return (
        <svg viewBox="0 0 36 24" className={`${className} rounded-[3px] shadow-xs shrink-0`}>
          <rect width="36" height="8" y="0" fill="#000000" />
          <rect width="36" height="8" y="8" fill="#DD0000" />
          <rect width="36" height="8" y="16" fill="#FFCE00" />
        </svg>
      );
    case "JP": // Japonya
      return (
        <svg viewBox="0 0 36 24" className={`${className} rounded-[3px] shadow-xs shrink-0`}>
          <rect width="36" height="24" fill="#FFFFFF" />
          <circle cx="18" cy="12" r="6.5" fill="#BC002D" />
        </svg>
      );
    case "GR": // Yunanistan
      return (
        <svg viewBox="0 0 36 24" className={`${className} rounded-[3px] shadow-xs shrink-0`}>
          <rect width="36" height="24" fill="#0D5EAF" />
          <path
            d="M0,4H36 M0,9.3H36 M0,14.6H36 M0,20H36"
            stroke="#FFFFFF"
            strokeWidth="2.6"
          />
          <rect width="13.5" height="13.5" fill="#0D5EAF" />
          <path d="M6.75,0 V13.5 M0,6.75 H13.5" stroke="#FFFFFF" strokeWidth="2.6" />
        </svg>
      );
    case "NL": // Hollanda
      return (
        <svg viewBox="0 0 36 24" className={`${className} rounded-[3px] shadow-xs shrink-0`}>
          <rect width="36" height="8" y="0" fill="#AE1C28" />
          <rect width="36" height="8" y="8" fill="#FFFFFF" />
          <rect width="36" height="8" y="16" fill="#21468B" />
        </svg>
      );
    case "AE": // Birleşik Arap Emirlikleri
      return (
        <svg viewBox="0 0 36 24" className={`${className} rounded-[3px] shadow-xs shrink-0`}>
          <rect width="36" height="8" y="0" fill="#00732F" />
          <rect width="36" height="8" y="8" fill="#FFFFFF" />
          <rect width="36" height="8" y="16" fill="#000000" />
          <rect width="10" height="24" x="0" fill="#FF0000" />
        </svg>
      );
    case "SA": // Suudi Arabistan
      return (
        <svg viewBox="0 0 36 24" className={`${className} rounded-[3px] shadow-xs shrink-0`}>
          <rect width="36" height="24" fill="#006C35" />
          {/* Üst Hat Çizgileri */}
          <path
            d="M9,9.5 H27 M10,12 H26 M12,7.2 H24"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* Alt Kılıç */}
          <path
            d="M11,16.5 H24.5 M24.5,15.3 V17.7"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}
