import React from "react";

/**
 * Kombin Önerisi Paneli:
 * - Üst bölümle arasındaki bol ve ferah boşluk (mt-16 md:mt-20) korundu.
 * - Başlığın altındaki uzun açıklama yazısı kaldırılmış halde sadece büyük başlık (headline) yer alıyor.
 * - 3 kombin kartındaki sevilen küçük kıyafet resimleri (Üst Giyim, Ayakkabı, Aksesuar SVG görselleri)
 *   büyük ve estetik başlıklarla (23px-25px) birlikte geri getirildi.
 */
export default function OutfitResultPanel({
  visible,
  outfit,
  selectedTime,
  city,
  district,
}) {
  if (!visible || !outfit) return null;

  const showcaseCards = [
    {
      id: "top",
      category: "üst giyim",
      title: outfit.topWear,
      detail: outfit.topDetail,
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8.5 3L4 6.2L6.2 10.5L8.5 9.2V21H15.5V9.2L17.8 10.5L20 6.2L15.5 3C14.3 4.8 9.7 4.8 8.5 3Z" />
        </svg>
      ),
    },
    {
      id: "footwear",
      category: "ayakkabı",
      title: outfit.footwear,
      detail: outfit.shoeDetail,
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 17.5V11L8.5 9.8L11.8 13L17.5 14C20 14.4 21 15.8 21 17.5V18.5H3V17.5Z" />
          <path d="M3 20.5H21" />
        </svg>
      ),
    },
    {
      id: "accessory",
      category: "aksesuar",
      title: outfit.accessorySummary,
      detail: outfit.accDetail,
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3V4M12 20V21M4.2 11C4.7 6.8 8 4 12 4C16 4 19.3 6.8 19.8 11H4.2Z" />
          <path d="M12 11V17.5C12 18.9 10.9 20 9.5 20C8.1 20 7 18.9 7 17.5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-16 md:mt-20 animate-fadeIn">
      <div className="wc-card rounded-[20px] p-8 md:p-10 space-y-8">
        {/* Konum/Saat Etiketi ve Büyük Estetik Başlık */}
        <div
          className="space-y-3 pb-7 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-wrap items-center gap-3 text-[15px]">
            <span className="font-medium" style={{ color: "var(--accent)" }}>
              kombin önerisi ·{" "}
              <span className="font-mono-num">{selectedTime}</span>
            </span>
            <span style={{ color: "var(--text-muted)" }}>·</span>
            <span
              className="font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              {city}, {district}
            </span>
          </div>

          {outfit.headline && (
            <h2
              className="font-display text-[26px] md:text-[30px] font-semibold tracking-[-0.02em] leading-[1.22]"
              style={{ color: "var(--text-primary)" }}
            >
              {outfit.headline}
            </h2>
          )}
        </div>

        {/* 3 Kombin Kartı (Küçük Kıyafet Resimleri + Büyük Estetik Başlıklar) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseCards.map((item) => (
            <div
              key={item.id}
              className="wc-inset rounded-[16px] p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <span
                    className="w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "var(--accent-soft)",
                      color: "var(--accent)",
                    }}
                  >
                    {item.icon}
                  </span>
                  <span
                    className="font-display block text-[20px] md:text-[22px] font-semibold tracking-[-0.01em]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.category}
                  </span>
                </div>

                <h3
                  className="font-display text-[23px] md:text-[25px] font-semibold tracking-[-0.015em] leading-[1.25]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </h3>
              </div>

              <p
                className="text-[16px] leading-[24px] pt-4 border-t"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "var(--border-soft)",
                }}
              >
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
