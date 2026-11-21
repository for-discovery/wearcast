# WearCast — Günlük Giyim Asistanı

Hava durumu verilerine göre anlık, saatlik ve 7 günlük **kişiselleştirilmiş giyim önerileri** sunan modern bir web uygulaması.

## Özellikler

- **Akıllı Giyim Motoru (`outfitEngine`)**: Sıcaklık, hissedilen sıcaklık, rüzgâr hızı, nem ve yağış ihtimaline göre katmanlı giyim önerileri üretir.
- **Türkiye ve Dünya Konum Desteği**: Türkiye il/ilçe verileri ve dünya şehirleri için Open-Meteo Geocoding API üzerinden koordinat çözümlemesi yapar.
- **Saatlik ve 7 Günlük Tahminler**: Gün içindeki sıcaklık değişimlerine göre saatlik kıyafet planlaması ve haftalık görünüm sunar.
- **Akıllı Uyarılar & Görsel Sahne**: Hava durumuna uygun animasyonlu sahneler, termometre göstergesi ve rüzgâr/yağış uyarı banner'ları içerir.
- **Önbellekleme (Caching)**: Konum koordinatlarını ve hava durumu verilerini tarayıcıda önbelleğe alarak hızlı yanıt verir.
- **API Anahtarı Gerektirmez**: [Open-Meteo](https://open-meteo.com/) Weather ve Geocoding API'lerini ücretsiz olarak kullanır.

## Kullanılan Teknolojiler

- **React 18** & **Vite 6**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Open-Meteo API** (Hava durumu & Geocoding)

## Kurulum ve Çalıştırma

Projeyi yerel ortamında çalıştırmak için:

```bash
# Depoyu klonla
git clone https://github.com/for-discovery/wearcast.git
cd wearcast

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Üretim (production) derlemesi almak ve önizlemek için:

```bash
npm run build
npm run preview
```

## Proje Yapısı

```text
src/
├── components/   # Arayüz bileşenleri (Termometre, Saatlik/Haftalık tahmin, Uyarılar vb.)
├── data/         # Türkiye ve dünya konum listeleri
├── engine/       # Giyim önerisi hesaplama motoru
├── services/     # Open-Meteo API, geocoding ve localStorage önbellek servisleri
├── App.jsx
└── main.jsx
```

## Lisans

Bu proje kişisel kullanım ve öğrenme amaçlı geliştirilmiştir.
