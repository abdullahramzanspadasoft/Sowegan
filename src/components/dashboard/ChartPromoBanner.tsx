"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function ChartPromoBanner() {
  const [open, setOpen] = useState(true);

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8, height: 0 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-surface px-5 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.1)] sm:px-8"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-lg p-1.5 text-subtle transition hover:bg-white/5 hover:text-text"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl pr-8">
              <h3 className="text-xl font-semibold tracking-tight">
                Trade with professional charts
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Advanced candles, live-style ticks, and multi-asset tools for forex, crypto,
                commodities, and indices — 24/5 coverage in demo.
              </p>
              <Link
                href="/dashboard/markets"
                className="mt-4 inline-flex text-sm font-semibold text-accent hover:text-accent-hover"
              >
                Open markets desk →
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent-dim text-lg font-bold text-accent">
                S
              </span>
              <span className="text-subtle">⟷</span>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface text-sm font-bold text-text">
                TV
              </span>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
