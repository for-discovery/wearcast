import React, { useState, useRef, useEffect } from "react";
import { WORLD_COUNTRIES, getCountryByCode, getCityInCountry } from "../data/worldLocations";
import CountryFlagIcon from "./CountryFlagIcon";

export default function LocationTimeForm({
  countryCode,
  city,
  district,
  hour,
  minute,
  onCountryChange,
  onCityChange,
  onDistrictChange,
  onHourChange,
  onMinuteChange,
  onStepHour,
  onAnalyze,
  loading,
}) {
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentCountry = getCountryByCode(countryCode);
  const currentCityObj = getCityInCountry(countryCode, city);

  // Dışarı tıklandığında ülke açılır menüsünü kapat
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Saat yazılırken 23'ten büyük değer girilmesini anında engelle
  const handleHourInput = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val === "") {
      onHourChange("");
      return;
    }
    const num = parseInt(val, 10);
    if (num > 23) return;
    onHourChange(val);
  };

  const handleHourBlur = () => {
    let num = parseInt(hour, 10);
    if (isNaN(num) || num < 0) num = 0;
    if (num > 23) num = 23;
    onHourChange(String(num).padStart(2, "0"));
  };

  // Dakika yazılırken 59'dan (60 ve sonrası) büyük değer girilmesini anında engelle
  const handleMinInput = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val === "") {
      onMinuteChange("");
      return;
    }
    const num = parseInt(val, 10);
    if (num > 59) return;
    onMinuteChange(val);
  };

  const handleMinBlur = () => {
    let num = parseInt(minute, 10);
    if (isNaN(num) || num < 0) num = 0;
    if (num > 59) num = 59;
    onMinuteChange(String(num).padStart(2, "0"));
  };

  return (
    <div className="space-y-7">
      <div className="space-y-4">
        <h1
          className="font-display text-[40px] md:text-[46px] font-semibold tracking-[-0.025em] leading-[1.12]"
          style={{ color: "var(--text-primary)" }}
        >
          Bugün dışarı çıkarken <br />
          <span style={{ color: "var(--accent)" }}>ne giymelisin?</span>
        </h1>
        <p
          className="text-[18px] leading-[28px] max-w-[36rem]"
          style={{ color: "var(--text-secondary)" }}
        >
          Ülkeni, şehrini ve dışarı çıkacağın saati seç. Hava koşullarını senin
          için yorumlayıp en uygun kombini hazırlayayım.
        </p>
      </div>

      {/* ÜLKE SEÇİMİ (En başta Türkiye + En Turistik 10 Ülke, Yanlarında Gerçek SVG Bayrak Resimleriyle) */}
      <div className="space-y-2" ref={dropdownRef}>
        <label
          className="block text-[15px] font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          ülke
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setCountryDropdownOpen((prev) => !prev)}
            className="wc-card w-full h-[54px] rounded-[12px] px-4 text-[17px] font-medium flex items-center justify-between cursor-pointer"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="flex items-center gap-3">
              <CountryFlagIcon code={currentCountry.code} className="w-6 h-4" />
              <span>{currentCountry.name}</span>
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#647D94"
              strokeWidth="2"
              className={`transition-transform duration-150 ${
                countryDropdownOpen ? "rotate-180" : ""
              }`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {/* Açılır Bayraklı Ülke Listesi */}
          {countryDropdownOpen && (
            <div
              className="wc-card absolute left-0 right-0 top-[60px] z-30 rounded-[12px] py-2 max-h-[280px] overflow-y-auto shadow-lg"
              style={{ borderColor: "var(--border)" }}
            >
              {WORLD_COUNTRIES.map((c) => {
                const isSelected = c.code === currentCountry.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      onCountryChange(c.code);
                      setCountryDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-[16px] flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected ? "font-semibold" : "font-normal"
                    }`}
                    style={{
                      backgroundColor: isSelected
                        ? "var(--accent-soft)"
                        : "transparent",
                      color: isSelected
                        ? "var(--accent)"
                        : "var(--text-primary)",
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <CountryFlagIcon code={c.code} className="w-6 h-4" />
                      <span>{c.name}</span>
                    </span>
                    {isSelected && (
                      <span className="text-[13px] font-mono-num">seçili</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Şehir ve İlçe/Bölge Seçimi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label
            htmlFor="city-select"
            className="block text-[15px] font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            şehir
          </label>
          <select
            id="city-select"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            className="clean-select w-full h-[54px] rounded-[12px] px-4 text-[17px] font-medium"
          >
            {currentCountry.cities.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="district-select"
            className="block text-[15px] font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            ilçe / bölge
          </label>
          <select
            id="district-select"
            value={district}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="clean-select w-full h-[54px] rounded-[12px] px-4 text-[17px] font-medium"
          >
            {currentCityObj.districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Saat Seçici */}
      <div className="wc-card rounded-[16px] p-5 space-y-3.5">
        <span
          className="block text-[15px] font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          dışarı çıkacağın saat
        </span>

        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onStepHour(-1)}
            className="wc-inset w-12 h-12 rounded-[10px] font-semibold text-[22px] flex items-center justify-center active:scale-[0.98] transition-transform cursor-pointer"
            style={{ color: "var(--text-primary)" }}
            title="1 saat geri"
          >
            −
          </button>

          <div className="wc-inset flex-1 h-12 flex items-center justify-center gap-2 rounded-[10px] font-mono-num">
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={hour}
              onChange={handleHourInput}
              onBlur={handleHourBlur}
              aria-label="Saat"
              className="w-11 text-[24px] font-semibold text-center bg-transparent focus:outline-none"
              style={{ color: "var(--text-primary)" }}
            />
            <span
              className="font-semibold text-[24px]"
              style={{ color: "var(--text-muted)" }}
            >
              :
            </span>
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={minute}
              onChange={handleMinInput}
              onBlur={handleMinBlur}
              aria-label="Dakika"
              className="w-11 text-[24px] font-semibold text-center bg-transparent focus:outline-none"
              style={{ color: "var(--text-primary)" }}
            />
          </div>

          <button
            type="button"
            onClick={() => onStepHour(1)}
            className="wc-inset w-12 h-12 rounded-[10px] font-semibold text-[22px] flex items-center justify-center active:scale-[0.98] transition-transform cursor-pointer"
            style={{ color: "var(--text-primary)" }}
            title="1 saat ileri"
          >
            +
          </button>
        </div>
      </div>

      {/* Ana Aksiyon Butonu */}
      <button
        type="button"
        onClick={onAnalyze}
        disabled={loading}
        className="wc-btn-primary w-full h-14 rounded-[12px] font-display font-semibold text-[18px] tracking-[-0.01em] cursor-pointer disabled:opacity-60"
      >
        {loading ? "hava durumu okunuyor..." : "bugün ne giymeliyim?"}
      </button>
    </div>
  );
}
