"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";

export function VerifyBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-3xl border border-border bg-surface px-5 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.1)] sm:px-8 sm:py-7"
    >
      <div className="pointer-events-none absolute -right-8 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative grid items-center gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            Set up and verify your profile
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Complete your profile to unlock real trading. Meanwhile, keep practicing on demo with
            full market tools and live-style charts.
          </p>

          <div className="mt-5 max-w-md">
            <div className="mb-2 flex items-center justify-between text-xs text-subtle">
              <span>Profile progress</span>
              <span>40%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: "40%" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/dashboard/profile" className="rounded-full px-5">
              Try real trading
            </Button>
            <Button href="/dashboard/markets" variant="secondary" className="rounded-full px-5">
              Explore markets
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs">
          <div className="rounded-2xl border border-border bg-bg-elevated p-4 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <div className="mb-3 flex items-center justify-between text-xs text-subtle">
              <span>BTC/USD</span>
              <span className="text-success">+1.84%</span>
            </div>
            <svg viewBox="0 0 220 110" className="h-28 w-full" aria-hidden>
              <defs>
                <linearGradient id="bannerFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3ee0b0" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#3ee0b0" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 78 C 24 70, 36 88, 54 72 S 90 40, 112 52 S 150 78, 176 46 S 204 30, 220 38 L 220 110 L 0 110 Z"
                fill="url(#bannerFill)"
              />
              <path
                d="M0 78 C 24 70, 36 88, 54 72 S 90 40, 112 52 S 150 78, 176 46 S 204 30, 220 38"
                fill="none"
                stroke="#3ee0b0"
                strokeWidth="2.5"
              />
              {[
                [30, 74, 58],
                [58, 68, 48],
                [88, 56, 42],
                [118, 60, 50],
                [148, 70, 44],
                [178, 48, 36],
              ].map(([x, open, close], index) => {
                const bull = close < open;
                return (
                  <g key={index}>
                    <line
                      x1={x}
                      x2={x}
                      y1={close - 10}
                      y2={open + 10}
                      stroke={bull ? "#34d399" : "#fb7185"}
                      strokeWidth="1.5"
                    />
                    <rect
                      x={x - 5}
                      y={Math.min(open, close)}
                      width="10"
                      height={Math.max(4, Math.abs(open - close))}
                      rx="1.5"
                      fill={bull ? "#3ee0b0" : "#fb7185"}
                    />
                  </g>
                );
              })}
            </svg>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="font-mono-numbers text-text">68,420.00</span>
              <Link href="/dashboard/markets?cat=crypto" className="font-semibold text-accent">
                Trade →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
