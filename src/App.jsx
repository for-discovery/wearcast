import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getCountryByCode } from "./data/worldLocations";
import { resolveLocationCoordinates } from "./services/geocodingService";
import { fetchWeatherData } from "./services/weatherService";
import { loadUserSettings, saveUserSettings } from "./services/storageService";
import {
  evaluateOutfitForMoment,
  generateSmartWeatherAlerts,
  buildWeeklyOutfitForecast,
} from "./engine/outfitEngine";
import LocationTimeForm from "./components/LocationTimeForm";
import ThermometerStage from "./components/ThermometerStage";
import OutfitResultPanel from "./components/OutfitResultPanel";
import SmartAlertsBanner from "./components/SmartAlertsBanner";
import WeeklyForecastSection from "./components/WeeklyForecastSection";

export default function App() {
  const saved = useMemo(() => loadUserSettings(), []);

  // Site açıldığında cihazın gerçek yerel saat ve dakikasını al
  const deviceTime = useMemo(() => {
    const now = new Date();
    return {
      hour: String(now.getHours()).padStart(2, "0"),
      minute: String(now.getMinutes()).padStart(2, "0"),
    };
  }, []);

  // 1. İstek: Tema Modu ("auto" | "light" | "dark") - Kullanıcı siteye girdiğinde varsayılan olarak "auto" (otomatik) modda açılır
  const [themeMode, setThemeMode] = useState("auto");

  // 1. SOL FORMDAKİ TASLAK (DRAFT) SEÇİMLER (Site açılışında cihaz saatiyle başlar)
  const [draftCountry, setDraftCountry] = useState(saved?.countryCode || "TR");
  const [draftCity, setDraftCity] = useState(saved?.city || "İstanbul");
  const [draftDistrict, setDraftDistrict] = useState(
    saved?.district || "Kadıköy"
  );
  const [draftHour, setDraftHour] = useState(deviceTime.hour);
  const [draftMinute, setDraftMinute] = useState(deviceTime.minute);

  // 2. SAĞ TERMOMETRE GUI VE SONUÇ EKRANINDA GÖSTERİLEN ONAYLANMIŞ (COMMITTED) SEÇİMLER
  const [committedQuery, setCommittedQuery] = useState({
    countryCode: saved?.countryCode || "TR",
    city: saved?.city || "İstanbul",
    district: saved?.district || "Kadıköy",
    hour: deviceTime.hour,
    minute: deviceTime.minute,
  });

  const [rememberConsent, setRememberConsent] = useState(
    saved?.rememberConsent ?? true
  );
  const [alertsEnabled, setAlertsEnabled] = useState(
    saved?.alertsEnabled ?? true
  );

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const committedNumericHour = useMemo(() => {
    const h = parseInt(committedQuery.hour, 10);
    return isNaN(h) ? 13 : Math.max(0, Math.min(23, h));
  }, [committedQuery.hour]);

  // Saat 18:00 ile sabah 06:00 arası girildiğinde otomatik mod doğrudan Dark (5. Tema) olur,
  // 06:00 ile 17:59 arası girildiğinde ise Light (1. Tema) olur.
  const activeThemeHour = useMemo(() => {
    const h = parseInt(draftHour, 10);
    if (!isNaN(h) && h >= 0 && h <= 23) return h;
    return committedNumericHour;
  }, [draftHour, committedNumericHour]);

  const resolvedTheme = useMemo(() => {
    if (themeMode === "light") return "light";
    if (themeMode === "dark") return "dark";
    const isNightTime = activeThemeHour >= 18 || activeThemeHour < 6;
    return isNightTime ? "dark" : "light";
  }, [themeMode, activeThemeHour]);

  // Tema değişimini document.documentElement üzerine uygula
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }, [resolvedTheme]);

  const handleCountryChange = (newCountryCode) => {
    setDraftCountry(newCountryCode);
    const countryObj = getCountryByCode(newCountryCode);
    const firstCity = countryObj.cities[0];
    setDraftCity(firstCity.name);
    setDraftDistrict(firstCity.districts[0]);
  };

  const handleCityChange = (newCity) => {
    setDraftCity(newCity);
    const countryObj = getCountryByCode(draftCountry);
    const cityObj = countryObj.cities.find((c) => c.name === newCity);
    const firstDist = cityObj?.districts?.[0] || "Merkez";
    setDraftDistrict(firstDist);
  };

  const handleDistrictChange = (newDist) => {
    setDraftDistrict(newDist);
  };

  const handleHourChange = (newHour) => {
    setDraftHour(newHour);
  };

  const handleMinuteChange = (newMin) => {
    setDraftMinute(newMin);
  };

  const handleStepHour = (delta) => {
    const currentH = parseInt(draftHour, 10) || 0;
    const nextH = (currentH + delta + 24) % 24;
    setDraftHour(String(nextH).padStart(2, "0"));
  };

  const loadWeatherForLocation = useCallback(
    async (
      targetCity,
      targetDistrict,
      targetCountryCode = "TR",
      force = false
    ) => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const coords = await resolveLocationCoordinates(
          targetCity,
          targetDistrict,
          targetCountryCode
        );
        const data = await fetchWeatherData(coords.lat, coords.lon, force);
        setWeatherData(data);
        return data;
      } catch (err) {
        setErrorMsg(
          err.message ||
            "Hava durumu verileri alınırken bir sorun oluştu. Lütfen bağlantını kontrol et."
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadWeatherForLocation(
      committedQuery.city,
      committedQuery.district,
      committedQuery.countryCode
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      loadWeatherForLocation(
        committedQuery.city,
        committedQuery.district,
        committedQuery.countryCode,
        true
      );
    }, 15 * 60 * 1000);
    return () => clearInterval(timer);
  }, [
    committedQuery.city,
    committedQuery.district,
    committedQuery.countryCode,
    loadWeatherForLocation,
  ]);

  const handleAnalyzeClick = async () => {
    const normH = String(
      Math.max(0, Math.min(23, parseInt(draftHour, 10) || 0))
    ).padStart(2, "0");
    const normM = String(
      Math.max(0, Math.min(59, parseInt(draftMinute, 10) || 0))
    ).padStart(2, "0");

    setDraftHour(normH);
    setDraftMinute(normM);

    await loadWeatherForLocation(draftCity, draftDistrict, draftCountry);

    setCommittedQuery({
      countryCode: draftCountry,
      city: draftCity,
      district: draftDistrict,
      hour: normH,
      minute: normM,
    });

    saveUserSettings({
      countryCode: draftCountry,
      city: draftCity,
      district: draftDistrict,
      hour: normH,
      minute: normM,
      rememberConsent,
      alertsEnabled,
    });

    setHasAnalyzed(true);
  };

  const activeWeatherPoint = useMemo(() => {
    if (!weatherData) return null;
    return (
      weatherData.hourly.find((h) => h.hour === committedNumericHour) ||
      weatherData.current
    );
  }, [weatherData, committedNumericHour]);

  const dailyContext = useMemo(() => {
    if (!weatherData) return { todayMin: 12, todayMax: 19 };
    return {
      todayMin: weatherData.todayMin,
      todayMax: weatherData.todayMax,
    };
  }, [weatherData]);

  const currentOutfit = useMemo(() => {
    if (!activeWeatherPoint) return null;
    return evaluateOutfitForMoment(activeWeatherPoint, dailyContext);
  }, [activeWeatherPoint, dailyContext]);

  const smartAlerts = useMemo(() => {
    if (!weatherData) return [];
    return generateSmartWeatherAlerts(
      weatherData.hourly,
      dailyContext,
      committedNumericHour
    );
  }, [weatherData, dailyContext, committedNumericHour]);

  const weeklyForecast = useMemo(() => {
    if (!weatherData) return [];
    return buildWeeklyOutfitForecast(
      weatherData.daily,
      {},
      activeWeatherPoint
    );
  }, [weatherData, activeWeatherPoint]);

  const formattedCommittedTime = `${String(committedNumericHour).padStart(
    2,
    "0"
  )}:${String(parseInt(committedQuery.minute, 10) || 0).padStart(2, "0")}`;

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        {/* Üst Bar: Logo, Tema Seçici (Otomatik / Açık / Koyu), Son Güncelleme ve Hatırla */}
        <header
          className="py-6 flex flex-wrap items-center justify-between gap-4 border-b mb-14"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-baseline gap-3.5">
            <span
              className="font-display text-[26px] font-semibold tracking-[-0.02em]"
              style={{ color: "var(--text-primary)" }}
            >
              wearcast
            </span>
            <span
              className="text-[16px]"
              style={{ color: "var(--text-secondary)" }}
            >
              günlük hava ve giyim asistanı
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[15px]">
            {/* Tema Seçici: Otomatik (Varsayılan) | Açık (1. Tema) | Koyu (5. Tema) */}
            <div className="wc-inset p-1.5 rounded-[10px] inline-flex items-center gap-1">
              {[
                { id: "auto", label: "otomatik" },
                { id: "light", label: "açık" },
                { id: "dark", label: "koyu" },
              ].map((item) => {
                const active = themeMode === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setThemeMode(item.id)}
                    className={`px-3.5 py-1.5 rounded-[8px] text-[14px] font-medium transition-colors cursor-pointer ${
                      active ? "wc-btn-primary" : ""
                    }`}
                    style={
                      active
                        ? undefined
                        : { color: "var(--text-secondary)" }
                    }
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {weatherData?.fetchedAt && (
              <span
                className="font-mono-num"
                style={{ color: "var(--text-secondary)" }}
              >
                son güncelleme {weatherData.fetchedAt}
              </span>
            )}

            <label
              className="inline-flex items-center gap-2 cursor-pointer select-none"
              style={{ color: "var(--text-secondary)" }}
            >
              <input
                type="checkbox"
                checked={rememberConsent}
                onChange={(e) => setRememberConsent(e.target.checked)}
                className="w-4 h-4 accent-[#0284C7] rounded-[4px] cursor-pointer"
              />
              <span>seçimimi hatırla</span>
            </label>
          </div>
        </header>

        {errorMsg && (
          <div className="mb-10 rounded-[14px] p-5 wc-card border-[#DC2626]/40 text-[16px] text-[#EF4444] flex items-center justify-between">
            <span>{errorMsg}</span>
            <button
              type="button"
              onClick={() =>
                loadWeatherForLocation(
                  committedQuery.city,
                  committedQuery.district,
                  committedQuery.countryCode,
                  true
                )
              }
              className="underline font-semibold cursor-pointer"
            >
              tekrar dene
            </button>
          </div>
        )}

        {/* İKİ SÜTUNLU ANA SAHNE: Sol (Taslak Form) - Sağ (Onaylanmış Termometre GUI) (Geniş ve ferah gap-12 lg:gap-14) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <LocationTimeForm
              countryCode={draftCountry}
              city={draftCity}
              district={draftDistrict}
              hour={draftHour}
              minute={draftMinute}
              onCountryChange={handleCountryChange}
              onCityChange={handleCityChange}
              onDistrictChange={handleDistrictChange}
              onHourChange={handleHourChange}
              onMinuteChange={handleMinuteChange}
              onStepHour={handleStepHour}
              onAnalyze={handleAnalyzeClick}
              loading={loading}
            />
          </div>

          <div className="lg:col-span-7">
            <ThermometerStage
              city={committedQuery.city}
              district={committedQuery.district}
              selectedTime={formattedCommittedTime}
              activeWeather={activeWeatherPoint}
              loading={loading}
              hasAnalyzed={hasAnalyzed}
            />
          </div>
        </div>

        {/* SADECE "bugün ne giymeliyim?" BUTONUNA BASILDIKTAN SONRA AÇILAN BÖLÜMLER */}
        <OutfitResultPanel
          visible={hasAnalyzed}
          outfit={currentOutfit}
          selectedTime={formattedCommittedTime}
          city={committedQuery.city}
          district={committedQuery.district}
        />

        <SmartAlertsBanner
          visible={hasAnalyzed}
          alerts={smartAlerts}
          alertsEnabled={alertsEnabled}
          onToggleAlerts={() => setAlertsEnabled((prev) => !prev)}
        />

        <WeeklyForecastSection
          visible={hasAnalyzed}
          weekly={weeklyForecast}
          city={committedQuery.city}
          district={committedQuery.district}
        />
      </div>
    </div>
  );
}
