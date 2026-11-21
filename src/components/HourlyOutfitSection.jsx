import React from "react";
import { getThermometerGradient } from "./ThermometerStage";

/**
 * Unslop Pass 1, 5, 7 & 9:
 * - Active state: small surface step (#EFE9DF) with hairline highlight, no loud ring/glow.
 * - Signature detail: Thermal calibration dot next to each slot's temperature.
 * - Alignment: Right-aligned tabular figures, consistent row padding (p-5) and radius (16px).
 */
export default function HourlyOutfitSection({
  visible,
  slots,
  activeHour,
  onSelectSlotHour,
}) {
  if (!visible || !slots || slots.length === 0) return null;

  return (
    <div className="mt-8 space-y-3 animate-fadeIn">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="text-[16px] font-medium text-[#1F1B16]">
            günün saatlik giyim rehberi
          </h2>
          <p className="text-[13px] text-[#5E554A]">
            saat dilimine dokunarak o vaktin kombinini ve termometre ölçümünü inceleyebilirsin
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {slots.map((slot) => {
          const isSelected = activeHour === slot.targetHour;
          const dotColor = getThermometerGradient(slot.temp).top;

          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => onSelectSlotHour(slot.targetHour)}
              className={`text-left rounded-[16px] p-5 border transition-colors duration-150 cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? "bg-[#EFE9DF] border-[#C85A53]"
                  : "bg-[#FDFBF7] border-[#1F1B16]/[0.08] hover:bg-[#EFE9DF]/50"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="block text-[14px] font-medium text-[#1F1B16]">
                      {slot.title.toLowerCase()}
                    </span>
                    <span className="block text-[12px] text-[#7B7266] font-mono-num">
                      {slot.range}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: dotColor }}
                      />
                      <span className="text-[24px] leading-none font-medium text-[#1F1B16] font-mono-num">
                        {slot.temp}°
                      </span>
                    </div>
                    <span className="block text-[12px] text-[#7B7266] font-mono-num mt-1">
                      hissedilen {slot.feelsLike}°
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[12px] pt-2.5 border-t border-[#1F1B16]/[0.08]">
                  <span className="font-medium text-[#1F1B16]">
                    {slot.weatherLabel}
                  </span>
                  <span className="text-[#7B7266] font-mono-num">
                    yağış %{slot.rainProb}
                  </span>
                </div>

                <p className="text-[13px] leading-[19px] text-[#5E554A]">
                  {slot.shortNote}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1F1B16]/[0.08] space-y-1.5 text-[12px]">
                <div className="flex justify-between gap-2">
                  <span className="text-[#7B7266]">üst</span>
                  <span className="font-medium text-[#1F1B16] text-right">
                    {slot.outfit.topWear}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#7B7266]">alt ve ayakkabı</span>
                  <span className="font-medium text-[#1F1B16] text-right">
                    {slot.outfit.bottomWear} · {slot.outfit.footwear}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
