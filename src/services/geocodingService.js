import { getCityInCountry } from "../data/worldLocations";
import { getCachedCoordinates, setCachedCoordinates } from "./storageService";

/**
 * Seçilen Ülke (ISO kodu), Şehir ve İlçe/Bölge için Open-Meteo Geocoding API üzerinden koordinat bulur.
 * Eğer ilçe koordinatı bulunamazsa o şehrin merkez koordinatlarına güvenli geçiş (fallback) yapar.
 */
export async function resolveLocationCoordinates(
  city,
  district,
  countryCode = "TR"
) {
  const cacheKeyCity = `${countryCode}_${city}`;
  const cached = getCachedCoordinates(cacheKeyCity, district);
  if (cached) return cached;

  const cityObj = getCityInCountry(countryCode, city);
  const fallback = {
    lat: cityObj.lat,
    lon: cityObj.lon,
    resolvedName: `${city}, ${district}`,
  };

  if (!district || district.startsWith("Merkez")) {
    setCachedCoordinates(cacheKeyCity, district, fallback);
    return fallback;
  }

  try {
    const query = encodeURIComponent(district);
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=tr&format=json`;
    const res = await fetch(url);
    if (!res.ok) return fallback;

    const json = await res.json();
    if (!json.results || json.results.length === 0) {
      setCachedCoordinates(cacheKeyCity, district, fallback);
      return fallback;
    }

    // Seçilen ülke içindeki ve ilgili şehre yakın (~0.85 derece / 85 km) sonuçları filtrele
    const countryResults = json.results.filter(
      (r) => r.country_code === countryCode
    );
    const matched = countryResults.find((r) => {
      const dist = Math.hypot(
        r.latitude - cityObj.lat,
        r.longitude - cityObj.lon
      );
      const adminMatches =
        r.admin1 &&
        r.admin1
          .toLocaleLowerCase("tr-TR")
          .includes(city.toLocaleLowerCase("tr-TR"));
      return adminMatches || dist < 0.85;
    });

    if (matched) {
      const coords = {
        lat: matched.latitude,
        lon: matched.longitude,
        resolvedName: `${city}, ${district}`,
      };
      setCachedCoordinates(cacheKeyCity, district, coords);
      return coords;
    }
  } catch {
    // Ağ hatasında şehir merkez koordinatına dön
  }

  setCachedCoordinates(cacheKeyCity, district, fallback);
  return fallback;
}
