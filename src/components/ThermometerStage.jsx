import React from "react";
import WeatherSceneAnimation from "./WeatherSceneAnimation";

export function getThermometerGradient(temp) {
  if (temp <= 5) {
    return { top: "#38BDF8", bottom: "#1D4ED8" };
  }
  if (temp <= 13) {
    return { top: "#22D3EE", bottom: "#0284C7" };
  }
  if (temp <= 20) {
    return { top: "#34D399", bottom: "#059669" };
  }
  if (temp <= 27) {
    return { top: "#F59E0B", bottom: "#EA580C" };
  }
  return { top: "#F43F5E", bottom: "#E11D48" };
}

export default function ThermometerStage({
  city,
  district,
  selectedTime,
  activeWeather,
  loading,
  hasAnalyzed,
}) {
  const temp = activeWeather?.temp ?? 17;
  const feelsLike = activeWeather?.feelsLike ?? 16;
  const weatherLabel = activeWeather?.weatherLabel ?? "Yükleniyor...";
  const condition = activeWeather?.condition ?? "cloudy";
  const windSpeed = activeWeather?.windSpeed ?? 0;
  const rainProb = activeWeather?.rainProb ?? 0;
  const precipitation = activeWeather?.precipitation ?? 0;
  const humidity = activeWeather?.humidity ?? 0;

  const clamped = Math.max(-8, Math.min(38, temp));
  const ratio = (clamped - -8) / (38 - -8);
  const translateY = Math.round((1 - ratio) * 157);

  const colors = getThermometerGradient(temp);

  return (
    <div className="wc-card relative overflow-hidden rounded-[20px] p-8 md:p-9">
      {/* Hava Durumu Animasyonu (Sola çekilmiş, termometreye yaklaşmayan orta boşluk) */}
      <WeatherSceneAnimation
        condition={condition}
        rainProb={rainProb}
        precipitation={precipitation}
        variant="stage"
      />

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
        {/* Sol Taraf (8 birim): Büyütülmüş Estetik Başlıklar, Derece ve Metrikler */}
        <div className="sm:col-span-8 space-y-7 pr-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p
                className="font-display text-[24px] font-semibold tracking-[-0.015em]"
                style={{ color: "var(--text-primary)" }}
              >
                {city}, {district}
              </p>
              <p
                className="text-[15px] font-mono-num"
                style={{ color: "var(--text-secondary)" }}
              >
                saat {selectedTime} ölçümü
              </p>
            </div>
            {loading && (
              <span
                className="text-[14px] px-3.5 py-1.5 rounded-[8px] wc-inset font-mono-num"
                style={{ color: "var(--text-secondary)" }}
              >
                güncelleniyor
              </span>
            )}
          </div>

          {/* Büyük Sıcaklık (76px) ve Durum (21px) */}
          <div className="flex items-center gap-5">
            <span
              className="text-[76px] font-semibold tracking-[-0.03em] leading-none font-mono-num"
              style={{ color: "var(--text-primary)" }}
            >
              {temp}°
            </span>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full shrink-0 transition-colors duration-300"
                  style={{ backgroundColor: colors.top }}
                />
                <p
                  className="font-display text-[21px] font-semibold leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {weatherLabel}
                </p>
              </div>
              <p
                className="text-[16px] font-mono-num"
                style={{ color: "var(--text-secondary)" }}
              >
                hissedilen {feelsLike}°
              </p>
            </div>
          </div>

          {/* Yatay Hava Özeti Barı (15px etiket, 20px değer) */}
          <div className="wc-inset grid grid-cols-3 gap-5 p-5 rounded-[12px]">
            <div className="space-y-1.5">
              <span
                className="block text-[15px]"
                style={{ color: "var(--text-secondary)" }}
              >
                rüzgâr
              </span>
              <span
                className="block text-[20px] font-semibold font-mono-num"
                style={{ color: "var(--text-primary)" }}
              >
                {windSpeed} km/s
              </span>
            </div>
            <div className="space-y-1.5">
              <span
                className="block text-[15px]"
                style={{ color: "var(--text-secondary)" }}
              >
                yağış ihtimali
              </span>
              <span
                className="block text-[20px] font-semibold font-mono-num"
                style={{ color: "var(--text-primary)" }}
              >
                %{rainProb}
              </span>
            </div>
            <div className="space-y-1.5">
              <span
                className="block text-[15px]"
                style={{ color: "var(--text-secondary)" }}
              >
                nem oranı
              </span>
              <span
                className="block text-[20px] font-semibold font-mono-num"
                style={{ color: "var(--text-primary)" }}
              >
                %{humidity}
              </span>
            </div>
          </div>

          <p
            className="text-[16px] leading-[24px]"
            style={{ color: "var(--text-secondary)" }}
          >
            {hasAnalyzed ? (
              <span>
                Seçtiğin saate göre giyim tavsiyen aşağıda listeleniyor
              </span>
            ) : (
              <span>
                Kıyafet önerini görmek için soldaki{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  bugün ne giymeliyim?
                </span>{" "}
                butonuna dokun
              </span>
            )}
          </p>
        </div>

        {/* Sağ Taraf (4 birim): Özel Yumuşak Sahne İçinde Yüklenen Termometre SVG */}
        <div className="wc-inset relative overflow-hidden sm:col-span-4 rounded-[12px] py-6 px-4 flex flex-col items-center justify-center select-none">
          <svg
            width="98"
            height="222"
            viewBox="0 0 120 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
          >
            <defs>
              <linearGradient id="thermoGradMain" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={colors.top}
                  style={{
                    transition:
                      "stop-color 400ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
                <stop
                  offset="100%"
                  stopColor={colors.bottom}
                  style={{
                    transition:
                      "stop-color 400ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              </linearGradient>
              <clipPath id="innerTubeMain">
                <rect x="52" y="28" width="24" height="185" rx="12" />
                <circle cx="64" cy="228" r="24" />
              </clipPath>
            </defs>

            {/* Sol 9 Kademe Çizgisi */}
            <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
              <line x1="18" y1="44" x2="33" y2="44" />
              <line x1="24" y1="62" x2="33" y2="62" />
              <line x1="18" y1="80" x2="33" y2="80" />
              <line x1="24" y1="98" x2="33" y2="98" />
              <line x1="18" y1="116" x2="33" y2="116" />
              <line x1="24" y1="134" x2="33" y2="134" />
              <line x1="18" y1="152" x2="33" y2="152" />
              <line x1="24" y1="170" x2="33" y2="170" />
              <line x1="18" y1="188" x2="33" y2="188" />
            </g>

            {/* Kalın Dış Gövde */}
            <path
              d="M42 36 C42 23.85 51.85 14 64 14 C76.15 14 86 23.85 86 36 V192.5 C97.6 200.4 105 213.4 105 228 C105 250.6 86.6 269 64 269 C41.4 269 23 250.6 23 228 C23 213.4 30.4 200.4 42 192.5 V36 Z"
              fill="#FFFFFF"
              stroke="#1E293B"
              strokeWidth="8.5"
              strokeLinejoin="round"
            />

            {/* İç Boşluk */}
            <rect x="52" y="28" width="24" height="185" rx="12" fill="#E2E8F0" />
            <circle cx="64" cy="228" r="24" fill="#E2E8F0" />

            {/* Dinamik Sıvı */}
            <g clipPath="url(#innerTubeMain)">
              <rect
                x="48"
                y="30"
                width="32"
                height="190"
                rx="6"
                fill="url(#thermoGradMain)"
                style={{
                  transform: `translateY(${translateY}px)`,
                  transition: "transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              <circle cx="64" cy="228" r="25" fill="url(#thermoGradMain)" />
            </g>

            {/* Cam Yansıması */}
            <ellipse
              cx="55"
              cy="219"
              rx="6.5"
              ry="5.5"
              fill="#FFFFFF"
              opacity="0.55"
              transform="rotate(-25 55 219)"
            />
            <rect
              x="55"
              y="34"
              width="3.5"
              height="150"
              rx="1.75"
              fill="#FFFFFF"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
