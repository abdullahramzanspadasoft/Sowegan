"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeftRight,
  ArrowRight,
  CandlestickChart,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Sparkline } from "@/components/ui/Sparkline";
import { StepIndexIcon, VolatilityIcon } from "@/components/icons/OptionsIcons";
import {
  getCfdViewMode,
  getTradeProfile,
  saveCfdViewMode,
  saveTradingMode,
  type TradingMode,
} from "@/lib/preferences";
import { CompleteProfileModal } from "@/components/dashboard/cfds/CompleteProfileModal";
import { optionsMarkets, type OptionsMarket } from "@/lib/options-markets";
import { cn, formatNumber } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function OptionsDesk() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<TradingMode>("demo");
  const [hidden, setHidden] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [pendingTradeId, setPendingTradeId] = useState("v25");
  const [ticks, setTicks] = useState<OptionsMarket[]>(optionsMarkets);

  useEffect(() => {
    setViewMode(getCfdViewMode());
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTicks((prev) =>
        prev.map((item) => {
          const drift = (Math.random() - 0.5) * (item.price * 0.00035);
          const nextPrice = Math.max(1, item.price + drift);
          const nextSpark = [...item.spark.slice(1), nextPrice];
          const change = ((nextPrice - item.spark[0]) / item.spark[0]) * 100;
          return { ...item, price: nextPrice, spark: nextSpark, change };
        }),
      );
    }, 1600);
    return () => window.clearInterval(timer);
  }, []);

  const balanceLabel = useMemo(
    () => (hidden ? "•••• USD" : "0.00 USD"),
    [hidden],
  );

  function switchMode(mode: TradingMode) {
    setViewMode(mode);
    saveCfdViewMode(mode);
    saveTradingMode(mode);
  }

  async function refresh() {
    setRefreshing(true);
    await wait(650);
    setRefreshing(false);
  }

  function openTrade(id: string) {
    setPendingTradeId(id);
    const profile = getTradeProfile();
    if (!profile.completed) {
      setProfileOpen(true);
      return;
    }
    router.push(`/dashboard/options/trade?id=${id}`);
  }

  return (
    <DashboardShell title="Options" subtitle="Most traded markets · live-style tape">
      <div className="space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-border bg-surface p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:p-7"
        >
          <div className="mb-6 flex justify-center">
            <div className="inline-flex rounded-full bg-surface-muted p-1 ring-1 ring-border">
              {(["real", "demo"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => switchMode(mode)}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-semibold capitalize transition",
                    viewMode === mode
                      ? "bg-bg-elevated text-text shadow-sm ring-1 ring-border"
                      : "text-muted hover:text-text",
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-muted">Total trading value</p>
              <div className="mt-2 flex items-center gap-2">
                <p className="font-mono-numbers text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                  {balanceLabel}
                </p>
                <button
                  type="button"
                  onClick={refresh}
                  className="rounded-full p-2 text-muted transition hover:bg-surface-muted hover:text-text"
                  aria-label="Refresh"
                >
                  <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
                </button>
              </div>
              <p className="mt-1 text-xs text-subtle">Updated just now</p>
            </div>

            <div className="flex flex-col items-end gap-4">
              <button
                type="button"
                onClick={() => setHidden((v) => !v)}
                className="rounded-full p-2 text-muted transition hover:bg-surface-muted hover:text-text"
                aria-label={hidden ? "Show balance" : "Hide balance"}
              >
                {hidden ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => openTrade("v25")}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-[#06231a] shadow-[0_12px_28px_rgba(62,224,176,0.28)]"
                    aria-label="Trade"
                  >
                    <CandlestickChart size={22} />
                  </motion.button>
                  <span className="text-xs font-medium text-muted">Trade</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-border-strong bg-surface-muted text-text shadow-sm"
                    aria-label="Transfer"
                  >
                    <ArrowLeftRight size={20} />
                  </motion.button>
                  <span className="text-xs font-medium text-muted">Transfer</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-text">Most traded markets</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {ticks.map((item, index) => {
                const up = item.change >= 0;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * index }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openTrade(item.id)}
                    className="rounded-2xl border border-border bg-surface p-5 text-left shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition hover:border-accent/35 hover:bg-surface-hover"
                  >
                    <div className="mb-4">
                      {item.kind === "step" ? (
                        <StepIndexIcon />
                      ) : (
                        <VolatilityIcon value={item.badge} />
                      )}
                    </div>
                    <p className="text-sm text-muted">{item.name}</p>
                    <p className="mt-2 font-mono-numbers text-2xl font-semibold tracking-tight text-text">
                      {formatNumber(item.price, 2)}
                    </p>
                    <div className="mt-4 flex items-end justify-between gap-3">
                      <Sparkline data={item.spark} positive={up} className="h-10 w-32" />
                      <p
                        className={cn(
                          "shrink-0 text-sm font-semibold",
                          up ? "text-success" : "text-danger",
                        )}
                      >
                        {up ? "+" : ""}
                        {item.change.toFixed(2)}% ({item.timeframe})
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>

            <motion.div whileHover={{ y: -5, scale: 1.01 }}>
              <Link
                href="/dashboard/options/trade?id=v25"
                className="flex h-full min-h-[180px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface-muted/60 p-5 text-center transition hover:border-accent/40 hover:bg-surface-muted"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-muted">
                  <ArrowRight size={20} />
                </span>
                <p className="text-sm font-semibold text-text">View all</p>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>

      <CompleteProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onCompleted={() => {
          setProfileOpen(false);
          router.push(`/dashboard/options/trade?id=${pendingTradeId}`);
        }}
      />
    </DashboardShell>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
