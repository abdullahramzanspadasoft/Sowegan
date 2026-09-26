"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CandlestickChart, Plus, RefreshCw } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { CompleteProfileModal } from "@/components/dashboard/cfds/CompleteProfileModal";
import { DepositModal } from "@/components/dashboard/cfds/DepositModal";
import { P2PBoard } from "@/components/dashboard/cfds/P2PBoard";
import { formatCurrency, cn } from "@/lib/utils";
import {
  getCfdViewMode,
  getTradeProfile,
  saveCfdViewMode,
  saveTradingMode,
  type TradingMode,
} from "@/lib/preferences";
import { useRouter } from "next/navigation";

const myAccounts = [
  {
    id: "mt5-std",
    title: "CFDs | Standard",
    balance: 0,
    icon: "/images/mt5-std.svg",
  },
];

const featured = [
  {
    id: "gold",
    title: "Gold",
    description: "Specialised account for gold and metals.",
    cta: "Activate now",
    badge: "MT5 Gold",
    tone: "from-amber-500/25 via-transparent to-transparent",
  },
  {
    id: "tv",
    title: "TradingView",
    description: "Access all financial and exclusive Sowegan markets.",
    cta: "Connect",
    badge: "TV",
    tone: "from-sky-500/20 via-transparent to-transparent",
  },
];

const available: Array<{
  title: string;
  desc: string;
  badge: string;
  icon?: string;
  mark?: string;
  color?: string;
}> = [
  { title: "CFDs | Standard", desc: "Trade major CFDs on MT5 Standard.", badge: "Standard", icon: "/images/mt5-std.svg" },
  { title: "cTrader", desc: "Advanced charting and execution desk.", badge: "cTrader", mark: "cT", color: "#E31C3D" },
  { title: "Swap-Free", desc: "Swap-free CFD account for longer holds.", badge: "Swap-Free", mark: "SWF", color: "#14B8A6" },
  { title: "Zero Spread", desc: "Ultra-tight spreads for scalpers.", badge: "Zero Spread", mark: "ZRS", color: "#7C3AED" },
  { title: "Financial", desc: "Financial instruments on MT5 FIN.", badge: "Financial", mark: "FIN", color: "#22C55E" },
  { title: "Financial STP", desc: "STP routing for financial CFDs.", badge: "Financial STP", mark: "FIN", color: "#16A34A" },
];

export function CfdDesk() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<TradingMode>("demo");
  const [depositOpen, setDepositOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [p2pOpen, setP2pOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [balance] = useState(0);

  useEffect(() => {
    setViewMode(getCfdViewMode());
  }, []);

  function switchMode(mode: TradingMode) {
    setViewMode(mode);
    saveCfdViewMode(mode);
    saveTradingMode(mode);
  }

  async function refresh() {
    setRefreshing(true);
    await wait(700);
    setRefreshing(false);
  }

  function onTrade() {
    const profile = getTradeProfile();
    if (!profile.completed) {
      setProfileOpen(true);
      return;
    }
    router.push("/dashboard/markets?cat=forex");
  }

  return (
    <DashboardShell title="CFDs" subtitle="Multi-account CFD desk · Deriv-style layout">
      <div className="space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
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
                  {formatCurrency(balance)}
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
              <p className="mt-1 text-xs text-subtle">Updated just now · {viewMode} desk</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setDepositOpen(true)}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-[#06231a] shadow-[0_12px_28px_rgba(62,224,176,0.28)]"
                  aria-label="Deposit"
                >
                  <Plus size={20} strokeWidth={2.5} />
                </motion.button>
                <span className="text-xs font-medium text-muted">Deposit</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onTrade}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-border-strong bg-surface-muted text-text shadow-sm"
                  aria-label="Trade"
                >
                  <CandlestickChart size={20} />
                </motion.button>
                <span className="text-xs font-medium text-muted">Trade</span>
              </div>
            </div>
          </div>
        </motion.section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">My accounts</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {myAccounts.map((account) => (
              <motion.div
                key={account.id}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <div className="flex items-start justify-between">
                  <Image src={account.icon} alt="" width={44} height={44} unoptimized />
                  <span className="rounded-full bg-accent-dim px-2.5 py-1 text-[11px] font-semibold text-accent">
                    {viewMode === "demo" ? "Demo" : "Real"}
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted">{account.title}</p>
                <p className="mt-2 font-mono-numbers text-2xl font-semibold">
                  {formatCurrency(account.balance)}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Featured</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {featured.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index }}
                whileHover={{ y: -4 }}
                className={cn(
                  "relative overflow-hidden rounded-3xl border border-border bg-surface p-5",
                  `bg-gradient-to-br ${item.tone}`,
                )}
              >
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="mt-2 max-w-sm text-sm text-muted">{item.description}</p>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold">
                    {item.badge}
                  </span>
                  <button
                    type="button"
                    className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/15"
                  >
                    {item.cta}
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Available accounts</h2>
            <button type="button" className="text-sm font-semibold text-accent hover:text-accent-hover">
              Compare
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {available.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * index }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.desc}</p>
                  </div>
                  {item.icon ? (
                    <Image src={item.icon} alt="" width={40} height={40} unoptimized />
                  ) : (
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[10px] font-bold text-white"
                      style={{ background: item.color }}
                    >
                      {item.mark}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-muted">
                    {item.badge}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>

      <CompleteProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onCompleted={() => {
          setProfileOpen(false);
          router.push("/dashboard/markets?cat=forex");
        }}
      />
      <DepositModal
        open={depositOpen}
        onClose={() => setDepositOpen(false)}
        onSelectP2P={() => setP2pOpen(true)}
      />
      <P2PBoard open={p2pOpen} onClose={() => setP2pOpen(false)} />
    </DashboardShell>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
