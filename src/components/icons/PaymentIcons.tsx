export function UsdtIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden focusable="false">
      <circle cx="24" cy="24" r="24" fill="#26A17B" />
      <path
        fill="#fff"
        d="M26.6 21.3v-3.4h7.1V13H14.3v4.9h7.1v3.4c-5.8.3-10.1 1.5-10.1 3 0 1.6 4.7 2.9 10.5 3.1v9.3h4.8v-9.3c5.8-.2 10.4-1.5 10.4-3.1 0-1.5-4.2-2.7-10.4-3z"
      />
    </svg>
  );
}

export function UsdcIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden focusable="false">
      <circle cx="24" cy="24" r="24" fill="#2775CA" />
      <path
        fill="#fff"
        d="M24.1 10.5c-7.5 0-13.5 5.1-13.5 12.7 0 6.5 4.4 11.9 10.4 13.3v-4.1c-3.6-1.2-6.1-4.7-6.1-9.2 0-5.2 3.9-9.1 9.2-9.1s9.2 3.9 9.2 9.1c0 4.5-2.5 8-6.1 9.2v4.1c6-1.4 10.4-6.8 10.4-13.3 0-7.6-6-12.7-13.5-12.7zm-1.8 8.2v2.3c-1.7.3-2.7 1.2-2.7 2.6 0 1.6 1.2 2.5 3.4 3.1l1.1.3v-5.1c.6.1 1.2.3 1.8.5v2.2c1.6.4 2.5 1.3 2.5 2.6 0 1.7-1.3 2.7-3.6 3.2v3.3h-1.8v-3.2c-2.5-.4-4.1-1.7-4.1-3.8 0-2 1.3-3.2 3.4-3.7v-2.5c-1.9.3-3.2 1.5-3.4 3.3h-2.5c.2-3 2.3-5 5.9-5.4V12h1.8v2.2c2.3.3 3.9 1.7 3.9 3.8 0 .1 0 .2-.1.3h-2.5c-.1-1.1-.8-1.8-2.1-2z"
      />
    </svg>
  );
}

export function P2PIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden focusable="false">
      <rect x="6" y="6" width="36" height="36" rx="10" stroke="currentColor" strokeWidth="2.4" />
      <text
        x="24"
        y="29"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Arial, sans-serif"
        fontSize="12"
        fontWeight="700"
      >
        P2P
      </text>
    </svg>
  );
}

export function UsdIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden focusable="false">
      <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M24 12v24M28.5 17.5c-1-.9-2.3-1.5-4.2-1.5-2.8 0-4.5 1.4-4.5 3.5s1.7 3.2 5 3.8c3.2.6 5 1.8 5 4.1s-2 3.8-5.2 3.8c-2.2 0-3.8-.8-4.9-2"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TreasureIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden focusable="false">
      <rect x="6" y="18" width="36" height="24" rx="4" fill="#C9A227" />
      <rect x="6" y="18" width="36" height="7" rx="2" fill="#E4C56B" />
      <path d="M10 18V14a6 6 0 0 1 6-6h16a6 6 0 0 1 6 6v4" fill="#B8860B" />
      <rect x="20" y="28" width="8" height="10" rx="2" fill="#7A5A10" />
      <circle cx="24" cy="32" r="1.6" fill="#E4C56B" />
    </svg>
  );
}

export function Mt5StdBadge({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <img src="/images/mt5-std.svg" alt="MT5 Standard" className={className} />
  );
}

export function LoadingOrb() {
  return (
    <div className="relative mx-auto h-16 w-16">
      <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" />
      <span className="absolute inset-2 animate-pulse rounded-full border-2 border-accent/50" />
      <span className="absolute inset-5 rounded-full bg-accent shadow-[0_0_24px_rgba(62,224,176,0.55)]" />
    </div>
  );
}
