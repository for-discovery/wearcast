/**
 * WearCast Yapay Zekâ Destekli Giyim Önerisi ve Akıllı Karar Motoru
 *
 * Güncelleme:
 * - "Dış katman", "iç kabuk", "katman" gibi robotik/çeviri kokan ifadeler tamamen kaldırıldı.
 * - Günlük hayatta bir arkadaşının konuşacağı doğal, samimi ve insanca Türkçe ifadeler kullanıldı.
 */

export function evaluateOutfitForMoment(weatherPoint, dailyContext = {}, preferences = {}) {
  const {
    temp = 17,
    feelsLike = 16,
    rainProb = 0,
    precipitation = 0,
    windSpeed = 10,
    condition = "cloudy",
    hour = 13,
  } = weatherPoint;

  const { todayMin = temp - 3, todayMax = temp + 3 } = dailyContext;
  const tempSwing = todayMax - todayMin;

  const sensitivity = preferences.sensitivity || "normal";
  const style = preferences.style || "casual";
  const dislikesUmbrella = preferences.dislikesUmbrella ?? false;
  const lovesLayering = preferences.lovesLayering ?? false;

  let windChillPenalty = 0;
  if (windSpeed >= 28) windChillPenalty = -3.5;
  else if (windSpeed >= 18) windChillPenalty = -2;
  else if (windSpeed >= 12) windChillPenalty = -1;

  let sensitivityOffset = 0;
  if (sensitivity === "cold") sensitivityOffset = -3.5;
  if (sensitivity === "hot") sensitivityOffset = +3.0;

  const effectiveComfort = feelsLike + windChillPenalty + sensitivityOffset;
  const isStormy = condition === "storm" || (rainProb >= 80 && windSpeed >= 22);
  const isHeavyRain =
    condition === "heavy_rain" || precipitation >= 2.5 || rainProb >= 75;
  const isRainy =
    isStormy ||
    isHeavyRain ||
    rainProb >= 45 ||
    precipitation > 0.25 ||
    ["rain", "drizzle"].includes(condition);
  const isSnowy = condition === "snow" || (isRainy && temp <= 2);
  const isWindy = windSpeed >= 22;
  const isSunny = condition === "clear" && hour >= 7 && hour <= 18;
  const isNight = hour >= 19 || hour < 6;
  const isHighSwing = tempSwing >= 8 || lovesLayering;

  let topWear = "Sweatshirt";
  let topDetail = "Gün boyu üşütmeden rahat ettirecek pamuklu üst";
  let footwear = "Mevsimlik günlük ayakkabı";
  let shoeDetail = "Günlük yürüyüşe uygun, rahat tabanlı mevsimlik model";
  const accessories = [];
  let accDetail = "Bugünkü havada yanında bulunması iyi olacak tamamlayıcı";

  // 1. KIYAFET PARÇALARININ SEÇİMİ (Doğal ve insanca açıklamalarla)
  if (effectiveComfort <= 3) {
    topWear = "Kazak ve kalın kışlık mont";
    topDetail = "Soğuğu ve rüzgârı geçirmeyen, içi sıcak tutan kışlık ikili";
    footwear = isSnowy ? "Kaymaz tabanlı kışlık bot" : "İçi sıcak tutan kışlık bot";
    shoeDetail = "Soğuk zemine ve suya dayanıklı kalın tabanlı kışlık bot";
    accessories.push("Bere", "Atkı", "Eldiven");
    accDetail = "Soğuk havada başını, boynunu ve ellerini sıcak tutacak kışlık set";
  } else if (effectiveComfort <= 10) {
    topWear = isRainy
      ? "Kazak ve su geçirmez kapüşonlu mont"
      : style === "classic"
      ? "Gömlek, kazak ve mevsimlik mont"
      : "Kazak ve mevsimlik mont";
    topDetail = isRainy
      ? "Yağmuru geçirmeyen kapüşonlu mont ve içini sıcak tutacak kazak"
      : "Serin havada rüzgârdan koruyan mont ve yumuşak triko kazak";
    footwear = isRainy ? "Su geçirmez mevsimlik bot" : "Mevsimlik deri bot";
    shoeDetail = isRainy
      ? "Yağmurlu zeminde su geçirmeyen, ayağı kuru tutan bot"
      : "Serin havada ayaklarını sıcak ve rahat tutacak mevsimlik bot";
    if (windSpeed >= 15 || effectiveComfort <= 8) accessories.push("Atkı");
    if (effectiveComfort <= 6) accessories.push("Bere");
    accDetail = "Boynunu serin rüzgârdan koruyacak yumuşak bir atkı";
  } else if (effectiveComfort <= 16) {
    if (isRainy) {
      topWear = "Sweatshirt ve su geçirmez ince mont";
      topDetail = "Yağmuru ve esintiyi kesen ince mont ile rahat bir sweatshirt";
    } else if (isHighSwing) {
      topWear = style === "classic" ? "Gömlek ve ince ceket" : "Sweatshirt ve ince mont";
      topDetail = "Hava ısınırsa montunu çıkarıp rahatça devam edebilirsin";
    } else {
      topWear = style === "classic" ? "Gömlek ve triko hırka" : "Sweatshirt";
      topDetail = "Serin havada tek başına bile ideal sıcaklık sağlayan rahat seçim";
    }
    footwear = isRainy ? "Su geçirmez mevsimlik ayakkabı" : "Mevsimlik günlük ayakkabı";
    shoeDetail = isRainy
      ? "Islak zeminde su almayan, günlük kullanıma uygun kapalı model"
      : "Ne çok kalın ne çok ince, bugünkü havaya tam uyan rahat ayakkabı";
  } else if (effectiveComfort <= 22) {
    if (isRainy) {
      topWear = "Uzun kollu tişört ve hafif yağmurluk";
      topDetail = "Ilık havada terletmeden yağmurdan koruyan ince yağmurluk";
    } else if (style === "classic") {
      topWear = isHighSwing ? "Gömlek ve ince hırka" : "Uzun kollu gömlek";
      topDetail = "Ilık havada terletmeyen, rahat ve şık kesimli gömlek";
    } else {
      topWear = isHighSwing ? "Tişört ve hafif hırka" : "Uzun kollu tişört";
      topDetail = isHighSwing
        ? "Gündüz tişörtle gezip akşam serinliğinde hırkanı giyebilirsin"
        : "Ilık havada terletmeyen, hafif ve rahat pamuklu üst";
    }
    footwear = isRainy ? "Su geçirmez mevsimlik ayakkabı" : "Mevsimlik yürüyüş ayakkabısı";
    shoeDetail = isRainy
      ? "Ilık ama ıslak zeminde ayağını kuru tutacak rahat model"
      : "Gün boyu ayağını yormayan, hafif ve esnek tabanlı ayakkabı";
  } else if (effectiveComfort <= 27) {
    topWear = isRainy
      ? "Tişört ve ince yağmurluk"
      : style === "classic"
      ? "İnce pamuklu gömlek"
      : "Tişört";
    topDetail = isRainy
      ? "Sıcak havada bunaltmadan yağmurdan koruyan ince yağmurluk"
      : "Güneşli ve ılık havada ferah tutan pamuklu kumaş";
    footwear = isRainy ? "Su itici hafif mevsimlik ayakkabı" : "Nefes alan yazlık ayakkabı";
    shoeDetail = "Sıcak havada ayağı terletmeyen, hafif ve ferah tasarım";
    if (isSunny && !isRainy) accessories.push("Güneş gözlüğü");
    accDetail = "Parlak güneş ışığında gözlerini rahatlatacak güneş gözlüğü";
  } else {
    topWear = "İnce pamuklu tişört";
    topDetail = "Sıcak havada terletmeyen, açık renkli ve ince dokulu tişört";
    footwear = "Fileli hafif yazlık ayakkabı";
    shoeDetail = "Ayağın hava almasını sağlayan çok hafif yazlık ayakkabı";
    accessories.push("Şapka", "Güneş gözlüğü");
    accDetail = "Yakıcı güneşe karşı başını ve gözlerini koruyacak ikili";
  }

  // Aksesuarlar
  if (isSnowy) {
    if (!accessories.includes("Bere")) accessories.unshift("Bere");
    if (!accessories.includes("Eldiven")) accessories.push("Eldiven");
    accDetail = "Karlı havada üşümemen için bere ve eldiven ikilisi";
  } else if (isRainy) {
    if (!dislikesUmbrella && !accessories.includes("Şemsiye")) {
      accessories.unshift("Şemsiye");
    }
    accDetail = `Yağmur ihtimali %${rainProb} olduğu için çıkarken yanına almayı unutma`;
  }

  if (isSunny && !isRainy && !accessories.includes("Güneş gözlüğü") && effectiveComfort >= 13) {
    accessories.push("Güneş gözlüğü");
    accDetail = "Güneşli havada dışarıda rahat etmeni sağlayacak gözlük";
  }

  if (accessories.length === 0) {
    if (!isNight && hour >= 7 && hour <= 17) {
      accessories.push("Güneş gözlüğü");
      accDetail = "Gün ışığında yürüyüş konforunu artıran hafif tamamlayıcı";
    } else if (windSpeed >= 14 || effectiveComfort <= 15) {
      accessories.push("İnce şal veya fular");
      accDetail = "Akşam esintisinde boynunu koruyacak hafif bir dokunuş";
    } else {
      accessories.push("Günlük sırt veya omuz çantası");
      accDetail = "Şemsiye veya kalın aksesuar gerektirmeyen sakin bir hava var";
    }
  }

  // 2. DOĞAL, İNSANCA VE SAMİMİ BAŞLIKLAR
  let headline = "";
  let explanation = "";

  if (isSnowy) {
    headline = `Dışarıda kar ve soğuk var (${temp}°) — kalın giyinip botlarını çek`;
    explanation = `${topWear} ve ${footwear.toLowerCase()} ile sıcacık kal, çıkarken ${accessories.slice(0, 2).join(" ile ").toLowerCase()} almayı unutma.`;
  } else if (isStormy) {
    headline = `Kuvvetli yağmur (%${rainProb}) ve sert rüzgâr (${windSpeed} km/s) bir arada`;
    explanation = `Islanıp üşümemek için ${topWear.toLowerCase()} ve ${footwear.toLowerCase()} giy, şemsiyeni mutlaka yanına al.`;
  } else if (isHeavyRain) {
    headline = `Yağmur ihtimali çok yüksek (%${rainProb}) — şemsiyesiz ve montsuz çıkma`;
    explanation = `${topWear} ve ${footwear.toLowerCase()} bugün seni kuru tutar; şemsiyeni yanından ayırma.`;
  } else if (isRainy) {
    headline = `Bugün yağmur geçişi var (%${rainProb} yağış ihtimali) — hazırlıklı çık`;
    explanation = `Ani yağmura yakalanmamak için ${topWear.toLowerCase()} ve ${footwear.toLowerCase()} giy, şemsiyeni çantana at.`;
  } else if (isWindy) {
    headline = `Rüzgâr epey sert esiyor (${windSpeed} km/s) — hava ${feelsLike}° gibi hissediliyor`;
    explanation = `Rüzgârı yememek için ${topWear.toLowerCase()} ve rahat bir ${footwear.toLowerCase()} bugün en iyi seçim.`;
  } else if (effectiveComfort <= 5) {
    headline = `Dışarısı buz gibi (${temp}°, hissedilen ${feelsLike}°) — sıkı giyinmelisin`;
    explanation = `Üşümemek için ${topWear.toLowerCase()} ve ${footwear.toLowerCase()} giy, ${accessories.slice(0, 2).join(" ve ").toLowerCase()} almayı unutma.`;
  } else if (effectiveComfort <= 13) {
    headline = isNight
      ? `Akşam serinliği çöktü (${temp}°) — montunu almadan çıkma`
      : `Hava oldukça serin (${temp}°) — üstüne mont veya ceket iyi gider`;
    explanation = `${topWear} ve ${footwear.toLowerCase()} seni hem serinlikten korur hem de rahat ettirir.`;
  } else if (effectiveComfort <= 20) {
    headline = isNight
      ? `Tatlı bir akşam serinliği var (${temp}°) — ince bir üstle tam kararında`
      : `Hava hafif serin ve keyifli (${temp}°) — ne çok kalın ne çok ince`;
    explanation = `Sadece tişörtle çıkarsan üşüyebilirsin; ${topWear.toLowerCase()} ve ${footwear.toLowerCase()} bugün için ideal.`;
  } else if (effectiveComfort <= 26) {
    headline = isSunny
      ? `Güneşli ve ılık bir hava var (${temp}°) — ince kıyafetlerle çıkabilirsin`
      : `Ilık ve çok rahat bir hava (${temp}°) — mont ve hırkaya gerek yok`;
    explanation = `${topWear} ve ${footwear.toLowerCase()} ile gün boyu bunalmadan ferahça gezebilirsin.`;
  } else {
    headline = `Hava bugün epey sıcak (${temp}°, hissedilen ${feelsLike}°) — en hafif kıyafetlerini seç`;
    explanation = `Terletmeyen bir ${topWear.toLowerCase()} ve ${footwear.toLowerCase()} giy, güneşten korunmak için ${accessories.slice(0, 2).join(" ve ").toLowerCase()} tak.`;
  }

  return {
    headline,
    topWear,
    topDetail,
    footwear,
    shoeDetail,
    accessories,
    accessorySummary: accessories.slice(0, 2).join(" · "),
    accDetail,
    explanation,
  };
}

/**
 * Gün içi hava değişim notları: Seçilen saatten (selectedHour) geçmişte kalan saatleri yayınlamaz.
 */
export function generateSmartWeatherAlerts(hourly = [], dailyContext = {}, selectedHour = 13) {
  if (!hourly || hourly.length === 0) return [];
  const alerts = [];

  const upcomingHours = hourly.filter((h) => h.hour >= selectedHour);
  const currentPoint =
    hourly.find((h) => h.hour === selectedHour) || upcomingHours[0] || hourly[0];

  const laterEveningHours = upcomingHours.filter((h) => h.hour > selectedHour);
  if (laterEveningHours.length > 0) {
    const coldestLater = laterEveningHours.reduce(
      (min, h) => (h.temp < min.temp ? h : min),
      laterEveningHours[0]
    );
    const drop = currentPoint.temp - coldestLater.temp;
    if (drop >= 4) {
      alerts.push({
        id: "temp-drop",
        title: "İlerleyen saatlerde hava soğuyor",
        delta: `-${drop}°C (${currentPoint.time} → ${coldestLater.time})`,
        message: `Saat ${coldestLater.time} civarında sıcaklık ${drop} derece düşüyor (${currentPoint.temp}° → ${coldestLater.temp}°). Yanına mont veya hırka almayı unutma.`,
      });
    }

    const warmestLater = laterEveningHours.reduce(
      (max, h) => (h.temp > max.temp ? h : max),
      laterEveningHours[0]
    );
    const rise = warmestLater.temp - currentPoint.temp;
    if (rise >= 5) {
      alerts.push({
        id: "temp-rise",
        title: "Gün içinde hava ısınıyor",
        delta: `+${rise}°C (${currentPoint.time} → ${warmestLater.time})`,
        message: `Saat ${warmestLater.time} civarında sıcaklık ${rise} derece artıyor (${currentPoint.temp}° → ${warmestLater.temp}°). Isınınca çıkarabileceğin bir hırka veya ceketle çıkmak işini kolaylaştırır.`,
      });
    }
  }

  const rainyUpcoming = upcomingHours.filter((h) => h.rainProb >= 45);
  if (rainyUpcoming.length > 0) {
    const firstRain = rainyUpcoming[0];
    alerts.push({
      id: "rain-alert",
      title: "Yağmur beklentisi",
      delta: `${firstRain.time} · %${firstRain.rainProb}`,
      message: `Saat ${firstRain.time} itibarıyla yağmur ihtimali %${firstRain.rainProb} seviyesine çıkıyor. Şemsiyeni veya su geçirmez ayakkabını yanına alabilirsin.`,
    });
  }

  if (upcomingHours.length > 0) {
    const maxWindPoint = upcomingHours.reduce(
      (max, h) => (h.windSpeed > max.windSpeed ? h : max),
      upcomingHours[0]
    );
    if (maxWindPoint.windSpeed >= 24) {
      alerts.push({
        id: "wind-alert",
        title: "Kuvvetli rüzgâr",
        delta: `${maxWindPoint.time} · ${maxWindPoint.windSpeed} km/s`,
        message: `Saat ${maxWindPoint.time} civarında rüzgâr saatte ${maxWindPoint.windSpeed} km hıza ulaşıyor. Çok ince kıyafetlerle dışarı çıkmak üşütebilir.`,
      });
    }
  }

  if (alerts.length === 0) {
    alerts.push({
      id: "calm-day",
      title: "Dengeli hava seyri",
      delta: `${currentPoint.time} sonrası`,
      message: `Seçtiğin saatten (${currentPoint.time}) itibaren günün geri kalanında ani bir yağmur veya sert sıcaklık değişimi beklenmiyor.`,
    });
  }

  return alerts;
}

export function buildWeeklyOutfitForecast(
  daily = [],
  preferences = {},
  activeWeatherPoint = null
) {
  const dayNames = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

  return daily.map((day, idx) => {
    const dObj = new Date(day.date);
    const dayName = idx === 0 ? "Bugün" : idx === 1 ? "Yarın" : dayNames[dObj.getDay()];
    const formattedDate = dObj.toLocaleDateString("tr-TR", { day: "numeric", month: "short" });

    if (idx === 0 && activeWeatherPoint) {
      const todayOutfit = evaluateOutfitForMoment(
        activeWeatherPoint,
        { todayMin: day.minTemp, todayMax: day.maxTemp },
        preferences
      );

      return {
        ...day,
        dayName,
        formattedDate,
        maxTemp: Math.max(day.maxTemp, activeWeatherPoint.temp),
        rainProb: activeWeatherPoint.rainProb ?? day.rainProb,
        precipitationSum: activeWeatherPoint.precipitation ?? 0,
        weatherCode: activeWeatherPoint.weatherCode,
        weatherLabel: activeWeatherPoint.weatherLabel,
        condition: activeWeatherPoint.condition,
        outfit: todayOutfit,
      };
    }

    const repTemp = Math.round(day.maxTemp * 0.65 + day.minTemp * 0.35);
    const outfit = evaluateOutfitForMoment(
      {
        temp: repTemp,
        feelsLike: repTemp,
        rainProb: day.rainProb,
        precipitation: day.precipitationSum,
        windSpeed: day.windMax,
        condition: day.condition,
        hour: 13,
      },
      { todayMin: day.minTemp, todayMax: day.maxTemp },
      preferences
    );

    return {
      ...day,
      dayName,
      formattedDate,
      outfit,
    };
  });
}
