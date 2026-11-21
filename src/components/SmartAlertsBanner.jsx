import React from "react";

/**
 * Uyarı türüne göre zarif, kompakt çizgi ikonu döndürür
 */
function AlertTypeIcon({ id }) {
  if (id === "rain-alert") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M16 14v6M8 14v6M12 16v6" />
      </svg>
    );
  }
  if (id === "temp-drop" || id === "temp-rise") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
        <path d="M12 9v6" />
      </svg>
    );
  }
  if (id === "wind-alert") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
        <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
        <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
      </svg>
    );
  }
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/**
 * Gün İçi Hava Değişim Notları (Kompakt, Zarif ve Ortalanmış Tasarım)
 */
export default function SmartAlertsBanner({
  visible,
  alerts,
  alertsEnabled,
  onToggleAlerts,
}) {
  if (!visible || !alerts || alerts.length === 0) return null;

  return (
    <div className="mt-14 md:mt-16 max-w-4xl mx-auto animate-fadeIn">
      <div className="wc-card relative overflow-hidden rounded-[18px] p-5 md:p-6">
        {/* Üst Başlık Sahnesi: Kibar, Kompakt ve Tam Ortalanmış */}
        <div
          className="relative flex flex-col items-center text-center space-y-1 pb-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Sağ üstte küçük gizle/göster kontrolü */}
          <div className="w-full flex justify-end sm:absolute sm:right-0 sm:top-0 sm:w-auto mb-1 sm:mb-0">
            <button
              type="button"
              onClick={onToggleAlerts}
              className="wc-inset text-[12px] font-medium px-3 h-7 rounded-[8px] hover:opacity-85 transition-opacity cursor-pointer"
              style={{ color: "var(--text-secondary)" }}
            >
              {alertsEnabled ? "gizle" : "göster"}
            </button>
          </div>

          <h2
            className="font-display text-[20px] md:text-[22px] font-semibold tracking-[-0.015em]"
            style={{ color: "var(--text-primary)" }}
          >
            Gün içi hava değişim notları
          </h2>

          <p
            className="text-[14px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Seçtiğin saatten sonraki sıcaklık, rüzgâr ve yağış beklentileri
          </p>
        </div>

        {/* Alt Not Kartları: Kompakt ve Dengeli */}
        {alertsEnabled && (
          <div
            className={`pt-4 grid gap-3.5 ${
              alerts.length === 1
                ? "grid-cols-1 max-w-2xl mx-auto"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="wc-inset rounded-[12px] p-4 flex items-start gap-3.5"
              >
                {/* Sol: Küçük Zarif İkon Rozeti (38x38px) */}
                <div
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    backgroundColor: "var(--accent-soft)",
                    color: "var(--accent)",
                  }}
                >
                  <AlertTypeIcon id={alert.id} />
                </div>

                {/* Sağ: Başlık, Saat/Değişim Etiketi ve Açıklama */}
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3
                      className="font-display text-[16px] font-semibold tracking-[-0.01em]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {alert.title}
                    </h3>

                    {alert.delta && (
                      <span
                        className="text-[12px] font-mono-num font-medium px-2.5 py-0.5 rounded-[6px]"
                        style={{
                          backgroundColor: "var(--accent-soft)",
                          color: "var(--accent)",
                        }}
                      >
                        {alert.delta}
                      </span>
                    )}
                  </div>

                  <p
                    className="text-[14px] leading-[21px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {alert.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
