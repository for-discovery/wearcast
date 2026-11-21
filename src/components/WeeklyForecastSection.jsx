import React from "react";
import { getThermometerGradient } from "./ThermometerStage";
import WeatherSceneAnimation from "./WeatherSceneAnimation";

export default function WeeklyForecastSection({
  visible,
  weekly,
  city,
  district,
}) {
  if (!visible || !weekly || weekly.length === 0) return null;

  return (
    <div className="mt-16 md:mt-20 space-y-6 animate-fadeIn">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div className="space-y-1">
          <h2
            className="font-display text-[24px] md:text-[26px] font-semibold tracking-[-0.015em]"
            style={{ color: "var(--text-primary)" }}
          >
            7 günlük tahmin
          </h2>
          <p
            className="text-[16px]"
            style={{ color: "var(--text-secondary)" }}
          >
            önümüzdeki 7 günün hava koşulları ve önerilen mevsimlik kombinler
          </p>
          {city && district && (
            <p
              className="font-display text-[17px] font-semibold pt-1"
              style={{ color: "var(--accent)" }}
            >
              {city}, {district}
            </p>
          )}
        </div>
        <span
          className="text-[14px]"
          style={{ color: "var(--text-muted)" }}
        >
          uzun vadeli tahminler gün yaklaştıkça güncellenir
        </span>
      </div>

      {/* 7 Günlük Grid Kartlar (Ferah aralıklı ve büyütülmüş okunaklı yazılar) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {weekly.map((day, idx) => {
          const isToday = idx === 0;
          const dotColor = getThermometerGradient(day.maxTemp).top;

          return (
            <div
              key={day.date}
              className={`relative overflow-hidden text-left rounded-[16px] p-5 flex flex-col justify-between space-y-5 ${
                isToday ? "wc-card-raised" : "wc-card"
              }`}
            >
              {/* Kart içi canlı hava durumu animasyonu */}
              <WeatherSceneAnimation
                condition={day.condition}
                rainProb={day.rainProb}
                precipitation={day.precipitationSum}
                variant="card"
              />

              <div className="relative z-10 space-y-0.5">
                <span
                  className="font-display block text-[17px] font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {day.dayName.toLowerCase()}
                </span>
                <span
                  className="block text-[14px] font-mono-num"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {day.formattedDate}
                </span>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 font-mono-num">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: dotColor }}
                  />
                  <span
                    className="text-[24px] font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {day.maxTemp}°
                  </span>
                  <span
                    className="text-[15px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    / {day.minTemp}°
                  </span>
                </div>
                <span
                  className="block text-[15px] font-semibold mt-2 truncate"
                  style={{ color: "var(--text-primary)" }}
                >
                  {day.weatherLabel}
                </span>
                <span
                  className="block text-[14px] font-mono-num mt-0.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  yağış %{day.rainProb}
                </span>
              </div>

              <div
                className="relative z-10 pt-3.5 border-t text-[14px] space-y-1"
                style={{ borderColor: "var(--border-soft)" }}
              >
                <span
                  className="block font-semibold truncate"
                  style={{ color: "var(--text-primary)" }}
                  title={day.outfit.topWear}
                >
                  {day.outfit.topWear}
                </span>
                <span
                  className="block truncate"
                  style={{ color: "var(--text-secondary)" }}
                  title={day.outfit.footwear}
                >
                  {day.outfit.footwear}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
