"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeftRight,
  ChevronDown,
  Eye,
  EyeOff,
  Plus,
  RefreshCw,
  Send,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Sparkline } from "@/components/ui/Sparkline";
import { DepositModal } from "@/components/dashboard/cfds/DepositModal";
import { P2PBoard } from "@/components/dashboard/cfds/P2PBoard";
import {
  AdaIcon,
  BitcoinIcon,
  DogeIcon,
  EthIcon,
  PolIcon,
  TrxIcon,
  UsdcCoinIcon,
  XrpIcon,
} from "@/components/icons/CryptoIcons";
import { cn, formatNumber } from "@/lib/utils";

type MarketTab = "trending" | "gainers" | "losers";

const marketRows = [
  {
    id: "doge",
    pair: "DOGE/USDT",
    vol: "Vol 510.94M",
    price: 0.09772,
    change: 1.34,
    spark: [0.094, 0.095, 0.0938, 0.0962, 0.0958, 0.0971, 0.09772],
    Icon: DogeIcon,
  },
  {
    id: "xrp",
    pair: "XRP/USDT",
    vol: "Vol 168.73M",
    price: 1.5743,
    change: 3.23,
    spark: [1.48, 1.5, 1.51, 1.53, 1.52, 1.56, 1.5743],
    Icon: XrpIcon,
  },
  {
    id: "ada",
    pair: "ADA/USDT",
    vol: "Vol 113.26M",
    price: 0.2551,
    change: 2.08,
    spark: [0.242, 0.245, 0.248, 0.251, 0.249, 0.253, 0.2551],
    Icon: AdaIcon,
  },
  {
    id: "pol",
    pair: "POL/USDT",
    vol: "Vol 57.23M",
    price: 0.11458,
    change: 6.2,
    spark: [0.102, 0.105, 0.108, 0.11, 0.109, 0.113, 0.11458],
    Icon: PolIcon,
  },
  {
    id: "trx",
    pair: "TRX/USDT",
    vol: "Vol 44.65M",
    price: 0.3361,
    change: -1.26,
    spark: [0.345, 0.342, 0.34, 0.338, 0.339, 0.337, 0.3361],
    Icon: TrxIcon,
  },
];

const pairs = [
  { id: "btc-usdc", label: "BTC/USDC", price: 83969.22, change: -0.72, Icon: BitcoinIcon },
  { id: "eth-usdc", label: "ETH/USDC", price: 2684.5, change: -1.4, Icon: EthIcon },
];

export function CryptoDesk() {
  const [hidden, setHidden] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState<MarketTab>("trending");
  const [amount, setAmount] = useState("");
  const [pairOpen, setPairOpen] = useState(false);
  const [pair, setPair] = useState(pairs[0]);
  const [depositOpen, setDepositOpen] = useState(false);
  const [p2pOpen, setP2pOpen] = useState(false);
  const [buying, setBuying] = useState(false);
  const spotBalance = 0;

  const btcEstimate = useMemo(() => {
    const value = Number(amount);
    if (!value || Number.isNaN(value) || pair.price <= 0) return 0;
    return value / pair.price;
  }, [amount, pair.price]);

  const filteredMarkets = useMemo(() => {
    if (tab === "gainers") return [...marketRows].filter((r) => r.change > 0).sort((a, b) => b.change - a.change);
    if (tab === "losers") return [...marketRows].filter((r) => r.change < 0).sort((a, b) => a.change - b.change);
    return marketRows;
  }, [tab]);

  async function refresh() {
    setRefreshing(true);
    await wait(650);
    setRefreshing(false);
  }

  function applyPct(pct: number) {
    const next = ((spotBalance || 1000) * pct) / 100;
    setAmount(String(next.toFixed(2)));
  }

  async function onBuy() {
    setBuying(true);
    await wait(900);
    setBuying(false);
  }

  return (
    <DashboardShell title="Crypto" subtitle="Spot desk · trade crypto with Sowegan theme">
      <div className="space-y-5">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-border bg-surface p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <button type="button" className="text-sm text-muted hover:text-text">
                Est. total value ›
              </button>
              <div className="mt-2 flex items-center gap-2">
                <p className="font-mono-numbers text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                  {hidden ? "•••• USDT" : "0.00 USDT"}
                </p>
                <button
                  type="button"
                  onClick={refresh}
                  className="rounded-full p-2 text-muted transition hover:bg-surface-muted hover:text-text"
                  aria-label="Refresh balance"
                >
                  <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
                </button>
              </div>
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
                    onClick={() => setDepositOpen(true)}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-[#06231a] shadow-[0_10px_24px_rgba(62,224,176,0.28)]"
                    aria-label="Add funds"
                  >
                    <Plus size={20} strokeWidth={2.5} />
                  </motion.button>
                  <span className="text-xs font-medium text-muted">Add funds</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-surface-muted text-text shadow-sm"
                    aria-label="Send"
                  >
                    <Send size={18} />
                  </motion.button>
                  <span className="text-xs font-medium text-muted">Send</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-3xl border border-border bg-surface p-5 sm:p-6"
          >
            <h2 className="text-lg font-semibold">Trade crypto</h2>

            <div className="relative mt-4">
              <button
                type="button"
                onClick={() => setPairOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-2xl border border-border bg-surface-muted px-4 py-3 text-left transition hover:border-accent/30"
              >
                <span className="flex items-center gap-3">
                  <pair.Icon className="h-9 w-9" />
                  <span>
                    <span className="block text-sm font-semibold text-text">{pair.label}</span>
                    <span
                      className={cn(
                        "mt-0.5 inline-flex items-center gap-1 text-xs",
                        pair.change >= 0 ? "text-success" : "text-danger",
                      )}
                    >
                      {formatNumber(pair.price, 2)} ({pair.change > 0 ? "+" : ""}
                      {pair.change.toFixed(2)}%)
                      <ChevronDown
                        size={12}
                        className={pair.change >= 0 ? "rotate-180 text-success" : "text-danger"}
                      />
                    </span>
                  </span>
                </span>
                <ChevronDown size={18} className="text-muted" />
              </button>

              <AnimatePresence>
                {pairOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute inset-x-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl"
                  >
                    {pairs.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setPair(item);
                          setPairOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/5"
                      >
                        <item.Icon className="h-8 w-8" />
                        <span>
                          <span className="block text-sm font-semibold">{item.label}</span>
                          <span className="text-xs text-muted">
                            {formatNumber(item.price, 2)}
                          </span>
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl px-1 text-sm">
              <span className="inline-flex items-center gap-2 text-muted">
                <UsdcCoinIcon className="h-5 w-5" />
                USDC Spot balance
              </span>
              <span className="font-mono-numbers font-semibold text-text">
                {formatNumber(spotBalance, 2)}
              </span>
            </div>

            <div className="mt-3 rounded-2xl border border-border bg-surface-muted px-4 py-3">
              <div className="flex items-center gap-3">
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                  placeholder="Amount"
                  className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-subtle"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold">
                  USDC
                  <ArrowLeftRight size={12} className="text-muted" />
                </span>
              </div>
              <p className="mt-2 text-xs text-subtle">
                ≈ {btcEstimate.toFixed(5)} {pair.label.split("/")[0]}
              </p>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2">
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => applyPct(pct)}
                  className="rounded-full border border-border py-2 text-xs font-semibold text-muted transition hover:border-accent/30 hover:text-text"
                >
                  {pct}%
                </button>
              ))}
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={onBuy}
              disabled={buying}
              className="mt-5 flex h-12 w-full items-center justify-center rounded-2xl bg-success text-sm font-semibold text-[#042015] transition hover:brightness-110 disabled:opacity-70"
            >
              {buying ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#042015] border-t-transparent" />
                  Buying…
                </span>
              ) : (
                "Buy"
              )}
            </motion.button>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-border bg-surface p-5 sm:p-6"
          >
            <h2 className="text-lg font-semibold">Markets</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {(
                [
                  ["trending", "Trending"],
                  ["gainers", "Gainers"],
                  ["losers", "Losers"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition",
                    tab === id
                      ? "border-accent/35 bg-accent-dim text-accent"
                      : "border-border text-muted hover:text-text",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-5 hidden grid-cols-[1.3fr_0.9fr_0.9fr] gap-3 px-1 text-xs font-semibold uppercase tracking-wide text-subtle sm:grid">
              <span>Coin</span>
              <span className="text-center">24H chart</span>
              <span className="text-right">24H price</span>
            </div>

            <div className="mt-2 divide-y divide-border">
              {filteredMarkets.map((row, index) => {
                const up = row.change >= 0;
                return (
                  <motion.div
                    key={row.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index }}
                    className="grid grid-cols-[1fr_auto] items-center gap-3 py-3.5 sm:grid-cols-[1.3fr_0.9fr_0.9fr]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <row.Icon className="h-9 w-9 shrink-0" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{row.pair}</p>
                        <p className="text-xs text-subtle">{row.vol}</p>
                      </div>
                    </div>
                    <div className="hidden justify-center sm:flex">
                      <Sparkline data={row.spark} positive={up} className="h-9 w-28" />
                    </div>
                    <div className="text-right">
                      <p className="font-mono-numbers text-sm font-semibold">
                        {formatNumber(row.price, row.price < 1 ? 5 : 4)}
                      </p>
                      <p className={cn("text-xs font-medium", up ? "text-success" : "text-danger")}>
                        {up ? "+" : ""}
                        {row.change.toFixed(2)}%
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </div>
      </div>

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
