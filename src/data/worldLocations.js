import { TURKEY_PROVINCES } from "./turkeyLocations";

/**
 * Ülke Seçici için Kübik/Yuvarlatılmış Gerçek Vektörel (SVG) Bayrakları
 * Windows tarayıcılarında emoji bayraklar "TR", "FR" harfi olarak göründüğü için
 * her ülkenin gerçek bayrağı SVG olarak çizilmiştir.
 */
export const WORLD_COUNTRIES = [
  {
    code: "TR",
    name: "Türkiye",
    cities: TURKEY_PROVINCES,
  },
  {
    code: "FR",
    name: "Fransa",
    cities: [
      { name: "Paris", lat: 48.8566, lon: 2.3522, districts: ["Merkez (Louvre)", "Montmartre", "Le Marais", "Saint-Germain", "Champs-Élysées", "Quartier Latin"] },
      { name: "Nice", lat: 43.7102, lon: 7.2620, districts: ["Promenade des Anglais", "Vieux Nice", "Cimiez", "Port Lympia"] },
      { name: "Lyon", lat: 45.7640, lon: 4.8357, districts: ["Presqu'île", "Vieux Lyon", "Croix-Rousse", "Part-Dieu"] },
      { name: "Marsilya", lat: 43.2965, lon: 5.3698, districts: ["Vieux-Port", "Le Panier", "La Joliette", "Prado"] },
      { name: "Bordeaux", lat: 44.8378, lon: -0.5792, districts: ["Centre-Ville", "Chartrons", "Saint-Pierre", "Bastide"] },
      { name: "Strazburg", lat: 48.5734, lon: 7.7521, districts: ["Grande Île", "Petite France", "Krutenau", "Neudorf"] },
    ],
  },
  {
    code: "ES",
    name: "İspanya",
    cities: [
      { name: "Barselona", lat: 41.3874, lon: 2.1686, districts: ["Eixample", "Barri Gòtic", "El Born", "Gràcia", "Barceloneta"] },
      { name: "Madrid", lat: 40.4168, lon: -3.7038, districts: ["Centro (Sol)", "Salamanca", "Malasaña", "Retiro", "Chamberí"] },
      { name: "Sevilla", lat: 37.3891, lon: -5.9845, districts: ["Santa Cruz", "Triana", "Macarena", "Nervión"] },
      { name: "Valensiya", lat: 39.4699, lon: -0.3763, districts: ["Ciutat Vella", "Ruzafa", "El Cabanyal", "Benimaclet"] },
      { name: "Malaga", lat: 36.7213, lon: -4.4214, districts: ["Centro Histórico", "La Malagueta", "Soho", "Marbella"] },
      { name: "Granada", lat: 37.1773, lon: -3.5986, districts: ["Albaicín", "Centro", "Realejo", "Sacromonte"] },
    ],
  },
  {
    code: "IT",
    name: "İtalya",
    cities: [
      { name: "Roma", lat: 41.9028, lon: 12.4964, districts: ["Centro Storico", "Trastevere", "Prati", "Monti", "Testaccio"] },
      { name: "Milano", lat: 45.4642, lon: 9.1900, districts: ["Duomo", "Brera", "Navigli", "Porta Nuova", "Isola"] },
      { name: "Venedik", lat: 45.4408, lon: 12.3155, districts: ["San Marco", "Cannaregio", "Dorsoduro", "Castello", "Murano"] },
      { name: "Floransa", lat: 43.7696, lon: 11.2558, districts: ["Duomo", "Santa Croce", "Oltrarno", "San Lorenzo"] },
      { name: "Napoli", lat: 40.8518, lon: 14.2681, districts: ["Centro Storico", "Chiaia", "Vomero", "Posillipo"] },
      { name: "Bologna", lat: 44.4949, lon: 11.3426, districts: ["Centro", "Santo Stefano", "Saragozza", "Bolognina"] },
    ],
  },
  {
    code: "US",
    name: "ABD",
    cities: [
      { name: "New York", lat: 40.7128, lon: -74.0060, districts: ["Manhattan", "Brooklyn", "Queens", "SoHo", "Upper East Side"] },
      { name: "Los Angeles", lat: 34.0522, lon: -118.2437, districts: ["Santa Monica", "Beverly Hills", "Hollywood", "Downtown LA", "Venice"] },
      { name: "Miami", lat: 25.7617, lon: -80.1918, districts: ["South Beach", "Brickell", "Wynwood", "Coral Gables"] },
      { name: "San Francisco", lat: 37.7749, lon: -122.4194, districts: ["Union Square", "Fisherman's Wharf", "Mission District", "Nob Hill"] },
      { name: "Chicago", lat: 41.8781, lon: -87.6298, districts: ["The Loop", "River North", "Lincoln Park", "West Loop"] },
      { name: "Las Vegas", lat: 36.1699, lon: -115.1398, districts: ["The Strip", "Downtown", "Summerlin", "Henderson"] },
    ],
  },
  {
    code: "GB",
    name: "Birleşik Krallık",
    cities: [
      { name: "Londra", lat: 51.5074, lon: -0.1278, districts: ["Westminster", "Soho", "Kensington", "Camden", "Shoreditch", "Greenwich"] },
      { name: "Edinburgh", lat: 55.9533, lon: -3.1883, districts: ["Old Town", "New Town", "Leith", "Stockbridge"] },
      { name: "Manchester", lat: 53.4808, lon: -2.2426, districts: ["Northern Quarter", "Deansgate", "Ancoats", "Salford"] },
      { name: "Oxford", lat: 51.7520, lon: -1.2577, districts: ["City Centre", "Jericho", "Headington", "Cowley"] },
      { name: "Liverpool", lat: 53.4084, lon: -2.9916, districts: ["Albert Dock", "City Centre", "Baltic Triangle", "Ropewalks"] },
    ],
  },
  {
    code: "DE",
    name: "Almanya",
    cities: [
      { name: "Berlin", lat: 52.5200, lon: 13.4050, districts: ["Mitte", "Kreuzberg", "Prenzlauer Berg", "Charlottenburg", "Friedrichshain"] },
      { name: "Münih", lat: 48.1351, lon: 11.5820, districts: ["Altstadt", "Schwabing", "Maxvorstadt", "Haidhausen"] },
      { name: "Hamburg", lat: 53.5511, lon: 9.9937, districts: ["HafenCity", "St. Pauli", "Altona", "Eppendorf"] },
      { name: "Frankfurt", lat: 50.1109, lon: 8.6821, districts: ["Innenstadt", "Sachsenhausen", "Westend", "Bornheim"] },
      { name: "Köln", lat: 50.9375, lon: 6.9603, districts: ["Altstadt", "Ehrenfeld", "Belgisches Viertel", "Deutz"] },
    ],
  },
  {
    code: "JP",
    name: "Japonya",
    cities: [
      { name: "Tokyo", lat: 35.6762, lon: 139.6503, districts: ["Shibuya", "Shinjuku", "Ginza", "Asakusa", "Roppongi", "Akihabara"] },
      { name: "Kyoto", lat: 35.0116, lon: 135.7681, districts: ["Gion", "Arashiyama", "Higashiyama", "Nakagyo"] },
      { name: "Osaka", lat: 34.6937, lon: 135.5023, districts: ["Dotonbori (Namba)", "Umeda", "Shinsaibashi", "Tennoji"] },
      { name: "Yokohama", lat: 35.4437, lon: 139.6380, districts: ["Minato Mirai", "Chinatown", "Kannai"] },
      { name: "Sapporo", lat: 43.0618, lon: 141.3545, districts: ["Odori", "Susukino", "Chuo-ku"] },
    ],
  },
  {
    code: "GR",
    name: "Yunanistan",
    cities: [
      { name: "Atina", lat: 37.9838, lon: 23.7275, districts: ["Plaka", "Syntagma", "Monastiraki", "Kolonaki", "Glyfada"] },
      { name: "Selanik", lat: 40.6401, lon: 22.9444, districts: ["Ladadika", "Aristotelous", "Ano Poli", "Kalamaria"] },
      { name: "Santorini", lat: 36.3932, lon: 25.4615, districts: ["Oia", "Fira", "Imerovigli", "Kamari"] },
      { name: "Rodos", lat: 36.4341, lon: 28.2176, districts: ["Old Town", "Lindos", "Faliraki", "Ialyssos"] },
      { name: "Girit", lat: 35.3387, lon: 25.1442, districts: ["Kandiye (Heraklion)", "Hanya (Chania)", "Resmo (Rethymno)"] },
    ],
  },
  {
    code: "NL",
    name: "Hollanda",
    cities: [
      { name: "Amsterdam", lat: 52.3676, lon: 4.9041, districts: ["Centrum", "Jordaan", "De Pijp", "Oud-Zuid", "Amsterdam-Noord"] },
      { name: "Rotterdam", lat: 51.9244, lon: 4.4777, districts: ["Centrum", "Kralingen", "Delfshaven", "Kop van Zuid"] },
      { name: "Lahey", lat: 52.0705, lon: 4.3007, districts: ["Centrum", "Scheveningen", "Zeeheldenkwartier"] },
      { name: "Utrecht", lat: 52.0907, lon: 5.1214, districts: ["Binnenstad", "Lombok", "Wittevrouwen"] },
      { name: "Eindhoven", lat: 51.4416, lon: 5.4697, districts: ["Centrum", "Strijp-S", "Woensel"] },
    ],
  },
  {
    code: "AE",
    name: "Birleşik Arap Emirlikleri",
    cities: [
      { name: "Dubai", lat: 25.2048, lon: 55.2708, districts: ["Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "Jumeirah Beach", "Deira"] },
      { name: "Abu Dabi", lat: 24.4539, lon: 54.3773, districts: ["Corniche", "Yas Island", "Saadiyat Island", "Al Maryah"] },
      { name: "Şarja", lat: 25.3463, lon: 55.4209, districts: ["Al Majaz", "Al Khan", "Heart of Sharjah"] },
    ],
  },
  {
    code: "SA",
    name: "Suudi Arabistan",
    cities: [
      { name: "Riyad", lat: 24.7136, lon: 46.6753, districts: ["Olaya", "Al Malqa", "Diriyah", "Al Murabba", "Diplomatic Quarter"] },
      { name: "Cidde", lat: 21.5433, lon: 39.1728, districts: ["Al-Balad", "Al Hamra", "Obhur", "Al Rawdah", "Corniche"] },
      { name: "Mekke", lat: 21.3891, lon: 39.8579, districts: ["Merkez (Harem)", "Aziziyah", "Ajyad", "Alawali"] },
      { name: "Medine", lat: 24.5247, lon: 39.5692, districts: ["Merkez (Mescid-i Nebevi)", "Quba", "Al Awali", "Uhud"] },
      { name: "El-Ula (AlUla)", lat: 26.6084, lon: 37.9232, districts: ["Old Town", "Hegra (Mada'in Salih)", "AlJadidah"] },
      { name: "Dammam", lat: 26.4207, lon: 50.0888, districts: ["Al Shati", "Al Faisaliyah", "Al Mazruiyah", "El-Huber (Khobar)"] },
    ],
  },
];

export function getCountryByCode(code) {
  return WORLD_COUNTRIES.find((c) => c.code === code) || WORLD_COUNTRIES[0];
}

export function getCityInCountry(countryCode, cityName) {
  const country = getCountryByCode(countryCode);
  return (
    country.cities.find((c) => c.name === cityName) || country.cities[0]
  );
}
