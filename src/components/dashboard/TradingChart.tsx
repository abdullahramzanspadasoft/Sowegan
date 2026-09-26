"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn, formatNumber } from "@/lib/utils";

type Candle = {
  o: number;
  h: number;
  l: number;
  c: number;
};

function seedCandles(count: number): Candle[] {
  const candles: Candle[] = [];
  let price = 1.0872;
  for (let i = 0; i < count; i += 1) {
    const drift = Math.sin(i / 3.2) * 0.0018 + (Math.random() - 0.48) * 0.0014;
    const open = price;
    const close = Math.max(1.07, open + drift);
    const high = Math.max(open, close) + Math.random() * 0.0009;
    const low = Math.min(open, close) - Math.random() * 0.0009;
    candles.push({ o: open, h: high, l: low, c: close });
    price = close;
  }
  return candles;
}

export function TradingChart({
  symbol = "EUR/USD",
  className,
}: {
  symbol?: string;
  className?: string;
}) {
  const [candles, setCandles] = useState(() => seedCandles(28));
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      setCandles((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        const tick = (Math.random() - 0.45) * 0.0007;
        const close = Math.max(1.07, last.c + tick);
        const high = Math.max(last.h, close);
        const low = Math.min(last.l, close);
        next[next.length - 1] = { ...last, c: close, h: high, l: low };

        if (Math.random() > 0.72) {
          next.shift();
          next.push({
            o: close,
            h: close + Math.random() * 0.0005,
            l: close - Math.random() * 0.0005,
            c: close,
          });
        }
        return next;
      });
    }, 1100);
    return () => window.clearInterval(timer);
  }, [live]);

  const { min, max, last, change, points, area } = useMemo(() => {
    const lows = candles.map((c) => c.l);
    const highs = candles.map((c) => c.h);
    const minValue = Math.min(...lows);
    const maxValue = Math.max(...highs);
    const lastCandle = candles[candles.length - 1];
    const first = candles[0];
    const delta = lastCandle.c - first.o;
    const pct = (delta / first.o) * 100;

    const width = 640;
    const height = 240;
    const pad = 16;
    const span = maxValue - minValue || 0.001;
    const step = (width - pad * 2) / (candles.length - 1);

    const linePoints = candles
      .map((candle, index) => {
        const x = pad + index * step;
        const y = pad + ((maxValue - candle.c) / span) * (height - pad * 2);
        return `${x},${y}`;
      })
      .join(" ");

    const areaPath = `M ${pad},${height - pad} L ${candles
      .map((candle, index) => {
        const x = pad + index * step;
        const y = pad + ((maxValue - candle.c) / span) * (height - pad * 2);
        return `${x},${y}`;
      })
      .join(" L ")} L ${pad + (candles.length - 1) * step},${height - pad} Z`;

    return {
      min: minValue,
      max: maxValue,
      last: lastCandle.c,
      change: pct,
      points: linePoints,
      area: areaPath,
      width,
      height,
      pad,
      span,
      step,
    };
  }, [candles]);

  const width = 640;
  const height = 240;
  const pad = 16;
  const span = max - min || 0.001;
  const step = (width - pad * 2) / (candles.length - 1);
  const up = change >= 0;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{symbol}</h2>
            <Badge tone={live ? "success" : "neutral"}>
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
              {live ? "Live" : "Paused"}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-subtle">Attractive demo tape · 1m candles</p>
        </div>
        <div className="text-right">
          <p className="font-mono-numbers text-2xl font-semibold tracking-tight">
            {formatNumber(last, 5)}
          </p>
          <p className={cn("mt-1 text-sm font-medium", up ? "text-success" : "text-danger")}>
            {up ? "+" : ""}
            {change.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-2 sm:p-3">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-52 w-full sm:h-64" aria-hidden>
          <defs>
            <linearGradient id="tapeFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={up ? "#3ee0b0" : "#fb7185"} stopOpacity="0.28" />
              <stop offset="100%" stopColor={up ? "#3ee0b0" : "#fb7185"} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gridFade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
            <line
              key={ratio}
              x1={pad}
              x2={width - pad}
              y1={pad + ratio * (height - pad * 2)}
              y2={pad + ratio * (height - pad * 2)}
              stroke="url(#gridFade)"
              strokeWidth="1"
            />
          ))}

          <path d={area} fill="url(#tapeFill)" />
          <polyline
            points={points}
            fill="none"
            stroke={up ? "#3ee0b0" : "#fb7185"}
            strokeWidth="2.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {candles.map((candle, index) => {
            const x = pad + index * step;
            const yHigh = pad + ((max - candle.h) / span) * (height - pad * 2);
            const yLow = pad + ((max - candle.l) / span) * (height - pad * 2);
            const yOpen = pad + ((max - candle.o) / span) * (height - pad * 2);
            const yClose = pad + ((max - candle.c) / span) * (height - pad * 2);
            const bullish = candle.c >= candle.o;
            const bodyTop = Math.min(yOpen, yClose);
            const bodyHeight = Math.max(2.2, Math.abs(yClose - yOpen));
            const barW = Math.max(4, step * 0.42);
            return (
              <g key={index} opacity={0.9}>
                <line
                  x1={x}
                  x2={x}
                  y1={yHigh}
                  y2={yLow}
                  stroke={bullish ? "#34d399" : "#fb7185"}
                  strokeWidth="1.4"
                />
                <rect
                  x={x - barW / 2}
                  y={bodyTop}
                  width={barW}
                  height={bodyHeight}
                  rx="1.2"
                  fill={bullish ? "#3ee0b0" : "#fb7185"}
                />
              </g>
            );
          })}

          <motion.circle
            cx={pad + (candles.length - 1) * step}
            cy={pad + ((max - last) / span) * (height - pad * 2)}
            r="5"
            fill={up ? "#3ee0b0" : "#fb7185"}
            animate={{ r: [4, 6.5, 4], opacity: [0.9, 0.55, 0.9] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {["1m", "5m", "15m", "1H"].map((tf, index) => (
            <span
              key={tf}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                index === 0
                  ? "bg-accent-dim text-accent"
                  : "border border-border text-muted",
              )}
            >
              {tf}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setLive((value) => !value)}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted transition hover:border-accent/30 hover:text-text"
        >
          {live ? "Pause feed" : "Resume feed"}
        </button>
      </div>
    </Card>
  );
}
