"use client";

import { motion } from "motion/react";
import { Sparkline } from "@/components/ui/Sparkline";
import { ChangeText } from "@/components/ui/ChangeText";
import { markets } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export function TradingVisual() {
  const featured = markets.slice(0, 5);

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0a1529] p-4 shadow-[0_20px_58px_rgba(2,6,23,0.7)] md:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(62,224,176,0.09),transparent_35%)]" />

      <div className="relative z-10 mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-[15px] font-semibold tracking-[-0.02em] text-white/95">Live market board</p>
          <p className="mt-1 text-[12px] text-slate-400">Simulated session snapshot</p>
        </div>

        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="inline-flex items-center rounded-full border border-[#5cecc0]/60 bg-[#173c35]/80 px-3 py-1.5 text-[12px] font-semibold text-[#6feec8] shadow-[0_0_18px_rgba(62,224,176,0.18)]">
            Market open
          </span>
        </motion.div>
      </div>

      <div className="relative z-10 mb-5 overflow-hidden rounded-[18px] border border-white/10 bg-[#0d1d33] p-3.5">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:22px_22px]" />

        <motion.svg
          viewBox="0 0 560 180"
          className="relative z-10 h-36 w-full"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <defs>
            <linearGradient id="marketArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3ee0b0" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#3ee0b0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 125 C 35 118, 68 92, 110 98 S 175 148, 220 122 S 296 42, 355 68 S 432 146, 478 112 S 528 80, 560 88 L 560 180 L 0 180 Z"
            fill="url(#marketArea)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
          <motion.path
            d="M0 125 C 35 118, 68 92, 110 98 S 175 148, 220 122 S 296 42, 355 68 S 432 146, 478 112 S 528 80, 560 88"
            fill="none"
            stroke="#3ee0b0"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>

      <div className="relative z-10 space-y-3">
        {featured.map((item, index) => {
          const positive = item.changePercent >= 0;

          return (
            <motion.div
              key={item.id}
              className="grid grid-cols-[1.3fr_1fr_auto] items-center gap-3 rounded-xl border border-transparent px-1 py-1.5"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + index * 0.08 }}
            >
              <div className="min-w-0">
                <p className="text-[14px] font-semibold tracking-[-0.02em] text-white/95">{item.symbol}</p>
                <p className="text-[11px] text-slate-400">{item.name}</p>
              </div>

              <div className="flex justify-center">
                <Sparkline
                  data={item.sparkline}
                  positive={positive}
                  className="h-8 w-28 opacity-95"
                />
              </div>

              <div className="text-right">
                <p className="font-mono-numbers text-[14px] font-semibold tracking-[-0.02em] text-white/95">
                  {formatNumber(item.price, item.price > 100 ? 2 : 4)}
                </p>
                <div className="mt-0.5">
                  <ChangeText value={item.changePercent} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
