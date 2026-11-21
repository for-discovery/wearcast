/**
 * Kullanıcı İzniyle Konum ve Tercih Saklama Servisi (Madde 2, 7, 12)
 */
const STORAGE_KEY = "wearcast_user_settings_v1";
const WEATHER_CACHE_PREFIX = "wearcast_weather_cache_v3_";
const GEO_CACHE_PREFIX = "wearcast_geo_cache_v2_";

export function loadUserSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveUserSettings(settings) {
  try {
    if (!settings.rememberConsent) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Depolama hatası sessizce yoksayılır
  }
}

export function getCachedCoordinates(city, district) {
  try {
    const key = `${GEO_CACHE_PREFIX}${city}_${district}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCachedCoordinates(city, district, coords) {
  try {
    const key = `${GEO_CACHE_PREFIX}${city}_${district}`;
    localStorage.setItem(key, JSON.stringify(coords));
  } catch {
    // ignore
  }
}

export function getCachedWeather(lat, lon) {
  try {
    const key = `${WEATHER_CACHE_PREFIX}${lat.toFixed(3)}_${lon.toFixed(3)}`;
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // 15 dakika (900.000 ms) önbellek süresi
    if (Date.now() - parsed.timestamp > 15 * 60 * 1000) {
      sessionStorage.removeItem(key);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

export function setCachedWeather(lat, lon, data) {
  try {
    const key = `${WEATHER_CACHE_PREFIX}${lat.toFixed(3)}_${lon.toFixed(3)}`;
    sessionStorage.setItem(
      key,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      })
    );
  } catch {
    // ignore
  }
}
