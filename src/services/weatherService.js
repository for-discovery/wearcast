import { getCachedWeather, setCachedWeather } from "./storageService";

/**
 * WMO Hava Durumu Kodlarını Türkçe ve Samimi Açıklamalara Dönüştürür
 */
export function describeWeatherCode(code) {
  const map = {
    0: { label: "Açık ve Güneşli", condition: "clear" },
    1: { label: "Çoğunlukla Açık", condition: "clear" },
    2: { label: "Parçalı Bulutlu", condition: "cloudy" },
    3: { label: "Çok Bulutlu", condition: "overcast" },
    45: { label: "Sisli", condition: "fog" },
    48: { label: "Kırağı ve Sisli", condition: "fog" },
    51: { label: "Hafif Çisenti", condition: "drizzle" },
    53: { label: "Çisenti Yağışlı", condition: "drizzle" },
    55: { label: "Yoğun Çisenti", condition: "rain" },
    61: { label: "Hafif Yağmurlu", condition: "rain" },
    63: { label: "Yağmurlu", condition: "rain" },
    65: { label: "Kuvvetli Yağmurlu", condition: "heavy_rain" },
    71: { label: "Hafif Kar Yağışlı", condition: "snow" },
    73: { label: "Kar Yağışlı", condition: "snow" },
    75: { label: "Yoğun Kar Yağışlı", condition: "snow" },
    80: { label: "Hafif Sağanak", condition: "rain" },
    81: { label: "Sağanak Yağışlı", condition: "heavy_rain" },
    82: { label: "Kuvvetli Sağanak", condition: "heavy_rain" },
    95: { label: "Gök Gürültülü Sağanak", condition: "storm" },
    96: { label: "Fırtına ve Sağanak", condition: "storm" },
    99: { label: "Şiddetli Fırtına", condition: "storm" },
  };
  return map[code] || { label: "Parçalı Bulutlu", condition: "cloudy" };
}

/**
 * Open-Meteo API üzerinden gerçek hava durumu verilerini çeker.
 * İçerik: Anlık sıcaklık, hissedilen, saatlik tahminler, yağmur ihtimali, yağış miktarı,
 * rüzgâr hızı, nem oranı, hava durumu kodu, günlük min/max ve 7 günlük tahmin.
 */
export async function fetchWeatherData(lat, lon, forceRefresh = false) {
  if (!forceRefresh) {
    const cached = getCachedWeather(lat, lon);
    if (cached) return cached;
  }

  const params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lon.toFixed(4),
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
    ].join(","),
    hourly: [
      "temperature_2m",
      "apparent_temperature",
      "precipitation_probability",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
      "relative_humidity_2m",
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
      "precipitation_sum",
      "wind_speed_10m_max",
    ].join(","),
    timezone: "auto",
    forecast_days: "7",
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Hava durumu servisine şu an ulaşılamıyor. Lütfen biraz sonra tekrar dene.");
  }

  const raw = await response.json();

  // Bugünün 24 saatlik verisini ayrıştır (İlk 24 saat)
  // Open-Meteo'da tek bir saatlik dilimde yağış ihtimali düşük görünürken hemen önceki/sonraki saatte veya
  // weather_code / precipitation alanında yağış olabiliyor. Bu yüzden ±1 saatlik penceredeki maksimum
  // yağış ihtimalini ve aktif yağış kodunu birlikte değerlendiriyoruz.
  const todayHourly = [];
  for (let i = 0; i < 24 && i < raw.hourly.time.length; i++) {
    const timeStr = raw.hourly.time[i];
    const hourNum = new Date(timeStr).getHours();
    const code = raw.hourly.weather_code[i];
    const wInfo = describeWeatherCode(code);

    const pCurr = raw.hourly.precipitation_probability[i] ?? 0;
    const pPrev = i > 0 ? raw.hourly.precipitation_probability[i - 1] ?? 0 : pCurr;
    const pNext =
      i + 1 < raw.hourly.precipitation_probability.length
        ? raw.hourly.precipitation_probability[i + 1] ?? 0
        : pCurr;
    const precipMm = raw.hourly.precipitation[i] ?? 0;

    // Yakın saat penceresindeki en yüksek yağış olasılığı
    let effectiveRainProb = Math.max(pCurr, Math.round((pPrev + pCurr + pNext) / 3));
    if (pNext >= 60 || pPrev >= 60) {
      effectiveRainProb = Math.max(pCurr, Math.round(Math.max(pPrev, pNext) * 0.85));
    }

    // Eğer hava kodu doğrudan yağmurlu/sağanak/fırtına ise veya yağış miktarı > 0 ise olasılık düşük kalamaz
    if (["heavy_rain", "storm"].includes(wInfo.condition) || precipMm >= 1.0) {
      effectiveRainProb = Math.max(effectiveRainProb, 80);
    } else if (["rain", "drizzle"].includes(wInfo.condition) || precipMm > 0.1) {
      effectiveRainProb = Math.max(effectiveRainProb, 65);
    }

    todayHourly.push({
      hour: hourNum,
      time: `${String(hourNum).padStart(2, "0")}:00`,
      temp: Math.round(raw.hourly.temperature_2m[i]),
      feelsLike: Math.round(raw.hourly.apparent_temperature[i]),
      rainProb: effectiveRainProb,
      precipitation: precipMm,
      windSpeed: Math.round(raw.hourly.wind_speed_10m[i]),
      humidity: Math.round(raw.hourly.relative_humidity_2m[i]),
      weatherCode: code,
      weatherLabel: wInfo.label,
      condition: wInfo.condition,
    });
  }

  // 7 Günlük veriyi ayrıştır (Gece yarısı ekstrem weather_code yanılsamasını önlemek için
  // her günün aktif gündüz saatlerini [09:00 - 18:00] baz al)
  const dailyForecast = raw.daily.time.map((dateStr, idx) => {
    const dayStartIdx = idx * 24;
    // O günün öğle/gündüz saat dilimi (13:00 veya 14:00) gerçek dışarı çıkma havasını en doğru temsil eder
    const middayIdx = dayStartIdx + 13;
    const daytimeSlice = [];
    for (let h = 9; h <= 19; h++) {
      const hIdx = dayStartIdx + h;
      if (hIdx < raw.hourly.time.length) {
        daytimeSlice.push({
          code: raw.hourly.weather_code[hIdx],
          rainProb: raw.hourly.precipitation_probability[hIdx] ?? 0,
          precip: raw.hourly.precipitation[hIdx] ?? 0,
        });
      }
    }

    // Gündüz saatlerindeki ortalama/temsili yağış ihtimali ve öğle vakti hava durumu kodu
    const repCode =
      middayIdx < raw.hourly.weather_code.length
        ? raw.hourly.weather_code[middayIdx]
        : raw.daily.weather_code[idx];

    const daytimeMaxRainProb =
      daytimeSlice.length > 0
        ? Math.max(...daytimeSlice.map((s) => s.rainProb))
        : raw.daily.precipitation_probability_max[idx] ?? 0;

    const daytimePrecipSum =
      daytimeSlice.length > 0
        ? daytimeSlice.reduce((sum, s) => sum + s.precip, 0)
        : raw.daily.precipitation_sum[idx] ?? 0;

    const wInfo = describeWeatherCode(repCode);

    return {
      date: dateStr,
      minTemp: Math.round(raw.daily.temperature_2m_min[idx]),
      maxTemp: Math.round(raw.daily.temperature_2m_max[idx]),
      rainProb: daytimeMaxRainProb,
      precipitationSum: Number(daytimePrecipSum.toFixed(1)),
      windMax: Math.round(raw.daily.wind_speed_10m_max[idx]),
      weatherCode: repCode,
      weatherLabel: wInfo.label,
      condition: wInfo.condition,
    };
  });

  const currentInfo = describeWeatherCode(raw.current.weather_code);
  const nowHour = new Date().getHours();
  const currentHourSlot = todayHourly.find((h) => h.hour === nowHour) || todayHourly[0];

  const normalized = {
    fetchedAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    current: {
      temp: Math.round(raw.current.temperature_2m),
      feelsLike: Math.round(raw.current.apparent_temperature),
      humidity: Math.round(raw.current.relative_humidity_2m),
      precipitation: raw.current.precipitation ?? 0,
      rainProb: currentHourSlot?.rainProb ?? 0,
      windSpeed: Math.round(raw.current.wind_speed_10m),
      weatherCode: raw.current.weather_code,
      weatherLabel: currentInfo.label,
      condition: currentInfo.condition,
    },
    todayMin: dailyForecast[0]?.minTemp ?? Math.round(raw.current.temperature_2m),
    todayMax: dailyForecast[0]?.maxTemp ?? Math.round(raw.current.temperature_2m),
    hourly: todayHourly,
    daily: dailyForecast,
  };

  setCachedWeather(lat, lon, normalized);
  return normalized;
}
