"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, ChevronDown, Clock, Filter, Gem, History, Star, X } from "lucide-react";
import { Flag } from "@/components/ui/Flag";
import { cn } from "@/lib/utils";

type Side = "buy" | "sell";

const advertisers = [
  {
    id: "1",
    name: "Arifjan21",
    initial: "A",
    seen: "Seen 6 minutes ago",
    rating: 4.92,
    orders: 16891,
    completion: 99.52,
    rate: 282.08,
    limits: "3.00 - 170.81 USD",
    method: "Bank transfer",
    minutes: 30,
  },
  {
    id: "2",
    name: "IkhlasFX",
    initial: "I",
    seen: "Seen 2 minutes ago",
    rating: 4.97,
    orders: 9420,
    completion: 99.81,
    rate: 281.65,
    limits: "5.00 - 250.00 USD",
    method: "Treasure",
    minutes: 15,
  },
  {
    id: "3",
    name: "KarachiDesk",
    initial: "K",
    seen: "Online now",
    rating: 4.88,
    orders: 4201,
    completion: 98.4,
    rate: 282.4,
    limits: "10.00 - 500.00 USD",
    method: "Easypaisa",
    minutes: 20,
  },
];

export function P2PBoard({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [side, setSide] = useState<Side>("buy");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const rows = useMemo(() => advertisers, []);

  async function buy(id: string) {
    setLoadingId(id);
    await wait(1100);
    setLoadingId(null);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[65] overflow-y-auto bg-[#060b16]/96 p-4 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mx-auto max-w-5xl space-y-4 pb-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">P2P desk</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-white/8 p-2 text-subtle hover:bg-white/12 hover:text-text"
              >
                <X size={16} />
              </button>
            </div>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-border bg-surface p-5 sm:p-6"
            >
              <p className="text-sm text-subtle">P2P Wallet Balance</p>
              <p className="mt-2 font-mono-numbers text-3xl font-semibold">0.00 USD</p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="inline-flex rounded-full bg-white/8 p-1">
                  {(["buy", "sell"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSide(item)}
                      className={cn(
                        "rounded-full px-5 py-2 text-sm font-semibold capitalize transition",
                        side === item ? "bg-white/15 text-text" : "text-muted",
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm text-muted"
                >
                  <span className="text-subtle">Pay with:</span>
                  <Flag code="PK" name="Pakistan" size="sm" />
                  <span className="font-semibold text-text">PKR</span>
                  <ChevronDown size={14} />
                </button>
              </div>
            </motion.section>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="rounded-full border border-border px-4 py-2 text-sm text-muted"
              >
                Payment method
                <ChevronDown size={14} className="ml-1 inline" />
              </button>
              <button
                type="button"
                className="rounded-full border border-border p-2.5 text-muted"
                aria-label="Filter"
              >
                <Filter size={16} />
              </button>
              <button
                type="button"
                className="rounded-full border border-border p-2.5 text-muted"
                aria-label="History"
              >
                <History size={16} />
              </button>
            </div>

            <div className="hidden grid-cols-[1.4fr_0.8fr_1fr] gap-4 px-2 text-xs font-semibold uppercase tracking-wide text-subtle sm:grid">
              <span>Advertisers</span>
              <span>Rates</span>
              <span className="text-right">Payment methods</span>
            </div>

            <div className="space-y-3">
              {rows.map((row, index) => (
                <motion.article
                  key={row.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="rounded-2xl border border-border bg-surface p-4 sm:grid sm:grid-cols-[1.4fr_0.8fr_1fr] sm:items-center sm:gap-4"
                >
                  <div className="flex gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0a1224] text-sm font-semibold">
                      {row.initial}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <p className="font-semibold">{row.name}</p>
                        <BadgeCheck size={14} className="text-sky-400" />
                        <Gem size={14} className="text-violet-400" />
                      </div>
                      <p className="text-xs text-subtle">{row.seen}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                        <span className="inline-flex items-center gap-1 text-gold">
                          <Star size={12} className="fill-gold" /> {row.rating}
                        </span>
                        <span>{row.orders.toLocaleString()} orders</span>
                        <span>{row.completion}% completion</span>
                      </div>
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-[11px] text-subtle">
                        <Clock size={11} /> {row.minutes} min
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0">
                    <p className="font-mono-numbers text-lg font-semibold">
                      {row.rate.toFixed(2)} PKR
                    </p>
                    <p className="text-xs text-subtle">Order limits: {row.limits}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 sm:mt-0 sm:justify-end">
                    <span className="inline-flex items-center gap-2 text-sm text-muted">
                      <span className="h-2 w-2 rounded-full bg-success" />
                      {row.method}
                    </span>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => buy(row.id)}
                      className="rounded-xl bg-success px-4 py-2.5 text-sm font-semibold text-[#042015]"
                    >
                      {loadingId === row.id ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#042015] border-t-transparent" />
                          Loading
                        </span>
                      ) : (
                        `${side === "buy" ? "Buy" : "Sell"} USD`
                      )}
                    </motion.button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
