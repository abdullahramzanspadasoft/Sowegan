export function VolatilityIcon({
  value,
  className = "h-12 w-12",
}: {
  value: number | string;
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 56 48" aria-hidden focusable="false">
      {/* Badge */}
      <rect x="14" y="1" width="22" height="13" rx="6.5" fill="#1A2744" />
      <text
        x="25"
        y="10.5"
        textAnchor="middle"
        fill="#F4F7FB"
        fontFamily="Arial, sans-serif"
        fontSize="9"
        fontWeight="700"
      >
        {value}
      </text>

      {/* Candles: green up / red down */}
      {/* candle 1 - red */}
      <line x1="8" y1="20" x2="8" y2="42" stroke="#FB7185" strokeWidth="1.4" />
      <rect x="5.2" y="24" width="5.6" height="12" rx="1" fill="#FB7185" />

      {/* candle 2 - green */}
      <line x1="17" y1="18" x2="17" y2="40" stroke="#34D399" strokeWidth="1.4" />
      <rect x="14.2" y="22" width="5.6" height="11" rx="1" fill="#34D399" />

      {/* candle 3 - red */}
      <line x1="26" y1="19" x2="26" y2="43" stroke="#FB7185" strokeWidth="1.4" />
      <rect x="23.2" y="26" width="5.6" height="10" rx="1" fill="#FB7185" />

      {/* candle 4 - green */}
      <line x1="35" y1="16" x2="35" y2="38" stroke="#34D399" strokeWidth="1.4" />
      <rect x="32.2" y="19" width="5.6" height="13" rx="1" fill="#34D399" />

      {/* candle 5 - green */}
      <line x1="44" y1="17" x2="44" y2="41" stroke="#34D399" strokeWidth="1.4" />
      <rect x="41.2" y="21" width="5.6" height="14" rx="1" fill="#34D399" />
    </svg>
  );
}

export function StepIndexIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 48" aria-hidden focusable="false">
      <rect x="4" y="14" width="48" height="30" rx="8" fill="#1A2744" />
      <rect x="12" y="32" width="8" height="7" rx="1.5" fill="#94A3B8" />
      <rect x="24" y="26" width="8" height="13" rx="1.5" fill="#CBD5E1" />
      <rect x="36" y="20" width="8" height="19" rx="1.5" fill="#E2E8F0" />
    </svg>
  );
}
