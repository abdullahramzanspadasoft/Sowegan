"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function LoadingScreen({
  label = "Preparing your workspace",
  className,
  compact = false,
}: {
  label?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg text-text",
        compact && "min-h-[60vh]",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(62,224,176,0.10), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(228,197,107,0.06), transparent 55%), radial-gradient(ellipse 40% 30% at 15% 75%, rgba(251,113,133,0.05), transparent 50%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 45%, black, transparent)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Orbital mark */}
        <div className="relative mb-8 flex h-28 w-28 items-center justify-center sm:mb-10 sm:h-32 sm:w-32">
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border border-accent/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-2 rounded-full border border-dashed border-[#e4c56b]/25"
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-accent/10 blur-2xl"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.92, 1.05, 0.92] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Sweeping arc */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 128 128"
            aria-hidden
          >
            <motion.circle
              cx="64"
              cy="64"
              r="58"
              fill="none"
              stroke="url(#loadGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="90 280"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.35, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "64px 64px" }}
            />
            <defs>
              <linearGradient id="loadGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3ee0b0" stopOpacity="0" />
                <stop offset="45%" stopColor="#3ee0b0" />
                <stop offset="100%" stopColor="#e4c56b" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Logo tile */}
          <motion.div
            className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#14324a,#0e1d33_55%,#10283a)] shadow-[0_12px_40px_rgba(62,224,176,0.18)] ring-1 ring-accent/35 sm:h-[4.5rem] sm:w-[4.5rem]"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 32 32" className="h-9 w-9" aria-hidden>
              <path
                d="M8 21.5c0-3.4 2.4-5 7.2-6.1 3.2-.7 4.3-1.3 4.3-2.6 0-1.4-1.3-2.3-3.6-2.3-2.4 0-3.8.9-4.5 2.4"
                fill="none"
                stroke="#3ee0b0"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M24 10.8c0 3.5-2.5 5.1-7.4 6.3-3.1.7-4.2 1.4-4.2 2.7 0 1.5 1.4 2.4 3.7 2.4 2.6 0 4.1-1 4.8-2.6"
                fill="none"
                stroke="#e4c56b"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>

        <motion.h1
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Sowegan
        </motion.h1>
        <motion.p
          className="mt-2 text-sm text-muted sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {label}
        </motion.p>

        {/* Progress bar */}
        <div className="mt-8 h-1 w-44 overflow-hidden rounded-full bg-white/8 sm:w-56">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,#3ee0b0,#e4c56b,#3ee0b0)] bg-[length:200%_100%]"
            initial={{ x: "-100%", width: "40%" }}
            animate={{ x: ["-100%", "160%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Soft ticks */}
        <div className="mt-6 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-accent"
              animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1.15, 0.85] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
