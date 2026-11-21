import React from "react";

/**
 * Gerçek 6 Kollu Dallı Kar Kristali SVG İkonu
 */
function SnowflakeCrystalSvg({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 3 Ana Eksen (6 Kol) */}
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="3.34" y1="7" x2="20.66" y2="17" />
      <line x1="20.66" y1="7" x2="3.34" y2="17" />
      {/* Dallar (Kristal uçları) */}
      <polyline points="9.5 4.5 12 6.5 14.5 4.5" />
      <polyline points="9.5 19.5 12 17.5 14.5 19.5" />
      <polyline points="4.5 9.8 7.2 9.2 6.8 6.5" />
      <polyline points="17.2 17.5 16.8 14.8 19.5 14.2" />
      <polyline points="19.5 9.8 16.8 9.2 17.2 6.5" />
      <polyline points="6.8 17.5 7.2 14.8 4.5 14.2" />
      {/* Merkez Altıgen Çekirdek */}
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

/**
 * Hava durumuna göre hem Termometre GUI panelinde (sola çekilmiş orta boşlukta) hem de 7 Günlük kartlarda
 * çalışan, şiddete duyarlı SVG/CSS hava animasyonu bileşeni.
 */
export default function WeatherSceneAnimation({
  condition = "cloudy",
  rainProb = 0,
  precipitation = 0,
  variant = "stage",
}) {
  const isCard = variant === "card";

  let rainIntensity = 1;
  if (
    condition === "heavy_rain" ||
    condition === "storm" ||
    precipitation >= 4 ||
    rainProb >= 80
  ) {
    rainIntensity = 3;
  } else if (condition === "rain" || precipitation >= 1.2 || rainProb >= 55) {
    rainIntensity = 2;
  }

  const isRainCondition = ["drizzle", "rain", "heavy_rain", "storm"].includes(
    condition
  );
  const isSnowCondition = condition === "snow";
  const isSunnyCondition = condition === "clear";
  const isCloudyCondition = ["cloudy", "overcast", "fog"].includes(condition);

  const dropCount = isCard
    ? rainIntensity === 3
      ? 11
      : rainIntensity === 2
      ? 7
      : 4
    : rainIntensity === 3
    ? 16
    : rainIntensity === 2
    ? 11
    : 6;

  const rainDrops = Array.from({ length: dropCount }, (_, i) => {
    const left = ((i * 37 + 9) % 82) + 9;
    const delay = ((i * 0.27) % 1.4).toFixed(2);
    const duration =
      rainIntensity === 3
        ? (0.55 + (i % 3) * 0.08).toFixed(2)
        : rainIntensity === 2
        ? (0.78 + (i % 3) * 0.12).toFixed(2)
        : (1.05 + (i % 3) * 0.14).toFixed(2);
    const height = rainIntensity === 3 ? 15 : rainIntensity === 2 ? 12 : 9;
    return { id: i, left, delay, duration, height };
  });

  // Gerçek 6 kollu SVG kar kristalleri dizisi
  const flakeCount = isCard ? 7 : 11;
  const snowFlakes = Array.from({ length: flakeCount }, (_, i) => {
    const left = ((i * 39 + 8) % 82) + 6;
    const delay = ((i * 0.45) % 3.2).toFixed(2);
    const duration = (2.8 + (i % 4) * 0.45).toFixed(2);
    const size = isCard
      ? i % 3 === 0
        ? 13
        : i % 2 === 0
        ? 11
        : 9
      : i % 3 === 0
      ? 18
      : i % 2 === 0
      ? 15
      : 12;
    return { id: i, left, delay, duration, size };
  });

  const containerClass = isCard
    ? "pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
    : "pointer-events-none absolute left-[33%] top-4 w-[142px] h-[126px] overflow-hidden select-none z-0 hidden sm:block";

  return (
    <div aria-hidden="true" className={containerClass}>
      {/* 1. GÜNEŞLİ / AÇIK HAVA ANİMASYONU */}
      {isSunnyCondition && (
        <div
          className={`absolute ${
            isCard ? "-top-4 -right-4 w-20 h-20" : "inset-0 m-auto w-28 h-28"
          } flex items-center justify-center`}
        >
          <div className="absolute inset-2 rounded-full bg-[#F59E0B]/25 wc-sun-pulse" />
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full wc-sun-spin"
            fill="none"
          >
            <circle cx="60" cy="60" r="24" fill="#F59E0B" fillOpacity="0.45" />
            <circle cx="60" cy="60" r="16" fill="#EA580C" fillOpacity="0.55" />
            <g
              stroke="#EA580C"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeOpacity="0.65"
            >
              <line x1="60" y1="10" x2="60" y2="22" />
              <line x1="60" y1="98" x2="60" y2="110" />
              <line x1="10" y1="60" x2="22" y2="60" />
              <line x1="98" y1="60" x2="110" y2="60" />
              <line x1="24.6" y1="24.6" x2="33.1" y2="33.1" />
              <line x1="86.9" y1="86.9" x2="95.4" y2="95.4" />
              <line x1="95.4" y1="24.6" x2="86.9" y2="33.1" />
              <line x1="33.1" y1="86.9" x2="24.6" y2="95.4" />
            </g>
          </svg>
        </div>
      )}

      {/* 2. PARÇALI BULUTLU / BULUTLU ANİMASYONU */}
      {(isCloudyCondition || isRainCondition) && (
        <div className="absolute inset-0">
          {condition === "cloudy" && (
            <div
              className={`absolute ${
                isCard ? "top-2 right-3 w-8 h-8" : "top-3 left-10 w-12 h-12"
              } rounded-full bg-[#F59E0B]/30 wc-sun-pulse`}
            />
          )}

          <svg
            viewBox="0 0 120 60"
            className={`absolute ${
              isCard ? "top-1.5 right-2 w-16 h-8" : "top-2 left-1 w-24 h-12"
            } wc-cloud-drift-slow`}
            fill="none"
          >
            <path
              d="M28 46H88C97.9 46 106 37.9 106 28C106 18.8 99.1 11.2 90.2 10.1C86.1 4.1 79.2 0 71.2 0C59.3 0 49.5 9 48.2 20.5C45.7 19.2 42.9 18.5 40 18.5C30.6 18.5 23 26.1 23 35.5C23 36.2 23 36.9 23.1 37.6C18.4 38.9 15 43.2 15 48.3"
              fill={isRainCondition ? "#64748B" : "var(--cloud-1)"}
              fillOpacity={isCard ? "0.38" : "0.58"}
            />
          </svg>

          <svg
            viewBox="0 0 120 60"
            className={`absolute ${
              isCard ? "top-6 right-5 w-14 h-7" : "top-9 left-8 w-20 h-10"
            } wc-cloud-drift-fast`}
            fill="none"
          >
            <path
              d="M28 46H88C97.9 46 106 37.9 106 28C106 18.8 99.1 11.2 90.2 10.1C86.1 4.1 79.2 0 71.2 0C59.3 0 49.5 9 48.2 20.5C45.7 19.2 42.9 18.5 40 18.5C30.6 18.5 23 26.1 23 35.5"
              fill={isRainCondition ? "#475569" : "var(--cloud-2)"}
              fillOpacity={isCard ? "0.32" : "0.65"}
            />
          </svg>
        </div>
      )}

      {/* 3. YAĞMURLU HAVA ANİMASYONU */}
      {isRainCondition && (
        <div className="absolute inset-0">
          {rainDrops.map((drop) => (
            <React.Fragment key={drop.id}>
              <span
                className="absolute top-3 rounded-full wc-raindrop"
                style={{
                  left: `${drop.left}%`,
                  width: rainIntensity === 3 ? "2px" : "1.5px",
                  height: `${drop.height}px`,
                  background:
                    "linear-gradient(to bottom, rgba(56, 189, 248, 0.1), rgba(2, 132, 199, 0.7))",
                  animationDelay: `${drop.delay}s`,
                  animationDuration: `${drop.duration}s`,
                }}
              />
              <span
                className="absolute bottom-1 rounded-full wc-rainsplash"
                style={{
                  left: `${drop.left}%`,
                  width: isCard ? "6px" : "9px",
                  height: isCard ? "2px" : "2.5px",
                  backgroundColor: "rgba(2, 132, 199, 0.45)",
                  animationDelay: `${drop.delay}s`,
                  animationDuration: `${drop.duration}s`,
                }}
              />
            </React.Fragment>
          ))}
        </div>
      )}

      {/* 4. KARLI HAVA ANİMASYONU (Gerçek 6 Kollu Dallı SVG Kar Kristalleri) */}
      {isSnowCondition && (
        <div className="absolute inset-0">
          {snowFlakes.map((flake) => (
            <span
              key={flake.id}
              className="absolute -top-3 text-[#38BDF8] drop-shadow-[0_1px_3px_rgba(56,189,248,0.45)] wc-snowflake"
              style={{
                left: `${flake.left}%`,
                animationDelay: `${flake.delay}s`,
                animationDuration: `${flake.duration}s`,
              }}
            >
              <SnowflakeCrystalSvg size={flake.size} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
