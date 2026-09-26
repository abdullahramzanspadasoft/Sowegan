"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConnectDerivModal } from "@/components/dashboard/ConnectDerivModal";
import { formatCurrency } from "@/lib/utils";
import { getDerivConnection, getTradingMode } from "@/lib/preferences";

const accounts = [
  {
    id: "cfd",
    title: "CFDs | Standard",
    balance: 10000,
    href: "/dashboard/cfds",
    iconSrc: "/images/mt5-std.svg",
    iconAlt: "MT5 Standard",
  },
  {
    id: "options",
    title: "Options",
    balance: 9998,
    href: "/dashboard/options",
    iconSrc: "/images/options-icon.svg",
    iconAlt: "Options",
  },
] as const;

export function DemoAccounts() {
  const [mode, setMode] = useState<"demo" | "real" | null>("demo");
  const [derivId, setDerivId] = useState<string | null>(null);
  const [derivOpen, setDerivOpen] = useState(false);

  function sync() {
    setMode(getTradingMode());
    setDerivId(getDerivConnection()?.loginId ?? null);
  }

  useEffect(() => {
    sync();
  }, []);

  const label = mode === "real" ? "Real" : "Demo";

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            {mode === "real" ? "Your Real trading accounts" : "Try demo trading"}
          </h2>
          <p className="mt-1 text-sm text-subtle">
            {mode === "real"
              ? derivId
                ? `Deriv connected · ${derivId} · same desk UI as demo`
                : "Real mode active · same charts and tools as demo"
              : "Practice with virtual funds — no real money at risk."}
          </p>
        </div>
        {mode === "real" && (
          <Badge tone="accent" className="bg-accent-dim text-accent">
            Real · Deriv
          </Badge>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {accounts.map((account, index) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={account.href}
              className="group block h-full rounded-2xl border border-border bg-surface p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition duration-300 hover:border-accent/40 hover:shadow-[0_18px_48px_rgba(62,224,176,0.12)]"
            >
              <div className="flex items-start justify-between gap-3">
                <motion.span
                  className="relative inline-flex h-12 w-12 items-center justify-center"
                  whileHover={{
                    rotate: account.id === "options" ? [-8, 8, -4, 0] : [0, -6, 6, 0],
                    scale: 1.12,
                  }}
                  transition={{ duration: 0.45 }}
                >
                  <Image
                    src={account.iconSrc}
                    alt={account.iconAlt}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition duration-300 group-hover:drop-shadow-[0_12px_22px_rgba(0,0,0,0.45)]"
                    unoptimized
                    priority
                  />
                </motion.span>
                <Badge
                  tone="accent"
                  className="transition duration-300 group-hover:scale-105 group-hover:bg-accent/20"
                >
                  {label}
                </Badge>
              </div>
              <p className="mt-5 text-sm text-muted transition group-hover:text-text">
                {account.title}
              </p>
              <p className="mt-2 font-mono-numbers text-2xl font-semibold tracking-tight transition group-hover:text-accent">
                {formatCurrency(account.balance)}
              </p>
              <p className="mt-1 text-xs text-subtle">
                USD · {mode === "real" ? "Real desk ready" : "Ready to trade"}
              </p>
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/dashboard/markets"
            className="group flex h-full min-h-[168px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface-muted/40 p-5 text-center transition duration-300 hover:border-accent/50 hover:bg-surface-muted/80"
          >
            <motion.span
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-muted transition group-hover:border-accent/40 group-hover:text-accent"
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
            >
              <Plus size={20} />
            </motion.span>
            <p className="text-sm font-semibold text-text">Add more accounts</p>
            <p className="text-xs text-subtle">Open another market desk</p>
          </Link>
        </motion.div>
      </div>

      {mode !== "real" && (
        <div className="mt-4">
          <Button
            type="button"
            variant="ghost"
            className="rounded-full px-0 text-accent"
            onClick={() => setDerivOpen(true)}
          >
            Switch to real trading · Connect Deriv →
          </Button>
        </div>
      )}

      <ConnectDerivModal
        open={derivOpen}
        onClose={() => setDerivOpen(false)}
        onConnected={() => {
          setDerivOpen(false);
          sync();
          window.location.assign("/dashboard");
        }}
      />
    </section>
  );
}
