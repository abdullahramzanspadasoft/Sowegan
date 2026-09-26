"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeftRight,
  Bitcoin,
  Eye,
  EyeOff,
  HandCoins,
  Minus,
  Plus,
  RefreshCw,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { DepositModal } from "@/components/dashboard/cfds/DepositModal";
import { P2PBoard } from "@/components/dashboard/cfds/P2PBoard";
import { UsdcIcon, UsdtIcon } from "@/components/icons/PaymentIcons";
import { cn } from "@/lib/utils";

type Tab = "overview" | "wallet" | "partners" | "trading" | "p2p";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "wallet", label: "Wallet" },
  { id: "partners", label: "Partners" },
  { id: "trading", label: "Trading" },
  { id: "p2p", label: "P2P" },
];

const QUICK_DEPOSITS = [
  {
    id: "usdt",
    name: "USDT",
    badge: null as string | null,
    glow: false,
    icon: <UsdtIcon className="h-11 w-11 sm:h-12 sm:w-12" />,
  },
  {
    id: "usdc",
    name: "USDC",
    badge: null as string | null,
    glow: false,
    icon: <UsdcIcon className="h-11 w-11 sm:h-12 sm:w-12" />,
  },
  {
    id: "easypaisa",
    name: "Easypaisa",
    badge: "Popular",
    glow: true,
    icon: <LocalPayMark label="EA" />,
  },
  {
    id: "jazzcash",
    name: "JazzCash",
    badge: "Popular",
    glow: true,
    icon: <LocalPayMark label="JC" />,
  },
];

const METHODS = [
  {
    id: "p2p",
    title: "P2P",
    desc: "Buy and sell USD with other traders. Fast local deposits and withdrawals.",
    icon: Users,
  },
  {
    id: "usd",
    title: "USD",
    desc: "Fund via bank, card, e-wallet, and crypto — instant demo settlement.",
    icon: Wallet,
  },
  {
    id: "agent",
    title: "Payment agent",
    desc: "Deposit and withdraw through a verified local payment agent near you.",
    icon: HandCoins,
  },
  {
    id: "crypto",
    title: "Crypto",
    desc: "Quickly fund your account with USDT, USDC, and more digital assets.",
    icon: Bitcoin,
  },
];

export function PortfolioDesk() {
  const [tab, setTab] = useState<Tab>("overview");
  const [hidden, setHidden] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [updated, setUpdated] = useState("Updated just now");
  const [depositOpen, setDepositOpen] = useState(false);
  const [p2pOpen, setP2pOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  async function refresh() {
    setRefreshing(true);
    await wait(700);
    setRefreshing(false);
    setUpdated("Updated just now");
    flash("Balance refreshed");
  }

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2000);
  }

  function openDeposit() {
    setDepositOpen(true);
  }

  return (
    <DashboardShell title="Portfolio" subtitle="Cashier · deposits, transfers & payments">
      <div className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8">
        {/* Top overview card */}
        <section className="overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[0_16px_40px_rgba(0,0,0,0.2)] sm:rounded-3xl">
          <div className="flex items-center justify-between gap-2 border-b border-white/6 px-3 pt-2 sm:px-5">
            <div className="flex min-w-0 flex-1 gap-0.5 overflow-x-auto sm:gap-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TABS.map((item) => {
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setTab(item.id);
                      if (item.id === "p2p") setP2pOpen(true);
                    }}
                    className={cn(
                      "relative shrink-0 px-3 py-3 text-sm font-medium transition sm:px-4",
                      active ? "text-text" : "text-muted hover:text-text",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-danger sm:inset-x-4" />
                    )}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setHidden((v) => !v)}
              aria-label={hidden ? "Show balance" : "Hide balance"}
              className="mr-1 shrink-0 rounded-full p-2 text-muted transition hover:bg-white/6 hover:text-text sm:mr-2"
            >
              {hidden ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex flex-col gap-6 px-4 py-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
            <div className="min-w-0">
              <p className="text-xs text-subtle sm:text-sm">Est. total value</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2 sm:gap-3">
                <p className="font-mono-numbers text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-[2.75rem]">
                  {hidden ? "•••• USD" : "0.00 USD"}
                </p>
                <button
                  type="button"
                  onClick={refresh}
                  aria-label="Refresh balance"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition hover:border-white/20 hover:text-text"
                >
                  <RefreshCw
                    size={14}
                    className={cn(refreshing && "animate-spin")}
                  />
                </button>
              </div>
              <p className="mt-1.5 text-[11px] text-subtle sm:text-xs">{updated}</p>
            </div>

            <div className="flex items-start justify-start gap-5 sm:gap-6 lg:gap-8">
              <ActionBtn
                label="Deposit"
                tone="danger"
                onClick={openDeposit}
                icon={<Plus size={20} strokeWidth={2.5} />}
              />
              <ActionBtn
                label="Transfer"
                onClick={() => flash("Transfer · demo only")}
                icon={<ArrowLeftRight size={18} />}
              />
              <ActionBtn
                label="Withdraw"
                onClick={() => flash("Withdraw · demo only")}
                icon={<Minus size={20} strokeWidth={2.5} />}
              />
            </div>
          </div>
        </section>

        {/* Quick deposit */}
        <section className="space-y-3 sm:space-y-4">
          <div className="px-0.5">
            <h2 className="text-lg font-semibold text-text sm:text-xl">
              Make your first deposit
            </h2>
            <p className="mt-1 text-sm text-muted">
              Deposit in crypto or your local currency, instantly.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {QUICK_DEPOSITS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={openDeposit}
                className={cn(
                  "relative flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface px-3 py-5 text-center transition hover:border-danger/35 hover:bg-surface-hover sm:min-h-[140px] sm:rounded-3xl sm:px-4",
                  item.glow &&
                    "bg-[radial-gradient(ellipse_at_70%_20%,rgba(251,113,133,0.14),transparent_55%)]",
                )}
              >
                {item.badge && (
                  <span className="absolute right-2.5 top-2.5 rounded-md bg-white/8 px-2 py-0.5 text-[10px] font-medium text-muted sm:right-3 sm:top-3">
                    {item.badge}
                  </span>
                )}
                {item.icon}
                <span className="text-sm font-semibold text-text">{item.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Browse methods */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="px-0.5 text-lg font-semibold text-text sm:text-xl">
            Browse all payment methods
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {METHODS.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => {
                    if (method.id === "p2p") setP2pOpen(true);
                    else openDeposit();
                  }}
                  className="flex items-start gap-3.5 rounded-2xl border border-border bg-surface-muted/80 px-4 py-4 text-left transition hover:border-accent/30 hover:bg-surface sm:gap-4 sm:rounded-3xl sm:px-5 sm:py-5"
                >
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-bg-elevated text-muted sm:h-11 sm:w-11">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-text sm:text-base">
                      {method.title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted sm:text-sm">
                      {method.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {tab !== "overview" && tab !== "p2p" && (
          <p className="rounded-2xl border border-dashed border-border bg-surface-muted/40 px-4 py-6 text-center text-sm text-muted">
            {TABS.find((t) => t.id === tab)?.label} view · frontend demo placeholder
          </p>
        )}
      </div>

      {/* Message FAB — white circle like reference */}
      <button
        type="button"
        onClick={() => setMsgOpen(true)}
        aria-label="Open messages"
        className="fixed bottom-5 right-5 z-[55] inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition hover:scale-[1.04] active:scale-95 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      >
        <MessageBubbleIcon />
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white shadow">
          1
        </span>
      </button>

      <MessagePopup open={msgOpen} onClose={() => setMsgOpen(false)} />

      <DepositModal
        open={depositOpen}
        onClose={() => setDepositOpen(false)}
        onSelectP2P={() => setP2pOpen(true)}
      />
      <P2PBoard open={p2pOpen} onClose={() => setP2pOpen(false)} />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-border bg-surface px-4 py-2 text-sm shadow-xl sm:bottom-8"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
}

function ActionBtn({
  label,
  icon,
  onClick,
  tone = "muted",
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  tone?: "danger" | "muted";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[4.5rem] flex-col items-center gap-2 sm:w-20"
    >
      <span
        className={cn(
          "inline-flex h-12 w-12 items-center justify-center rounded-full transition sm:h-14 sm:w-14",
          tone === "danger"
            ? "bg-danger text-white shadow-[0_10px_24px_rgba(251,113,133,0.35)] hover:brightness-110"
            : "bg-surface-muted text-text ring-1 ring-border hover:bg-surface-hover",
        )}
      >
        {icon}
      </span>
      <span className="text-xs font-medium text-muted sm:text-sm">{label}</span>
    </button>
  );
}

function LocalPayMark({ label }: { label: string }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-bg text-sm font-bold tracking-wide text-danger ring-1 ring-danger/30 sm:h-12 sm:w-12">
      {label}
    </span>
  );
}

function MessageBubbleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M5.5 4.5h13A2.5 2.5 0 0 1 21 7v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.2a.8.8 0 0 1-1.3-.6V17.5A2.5 2.5 0 0 1 2.5 15V7A2.5 2.5 0 0 1 5.5 4.5Z"
        fill="#0a1224"
      />
      <path d="M7.5 9.5h9M7.5 13h6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MessagePopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Close messages"
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="msg-title"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/6 px-5 py-4">
              <div>
                <p id="msg-title" className="text-base font-semibold text-text">
                  Messages
                </p>
                <p className="text-xs text-subtle">1 unread · Sowegan Support</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-white/8 p-2 text-muted transition hover:bg-white/12 hover:text-text"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-5 py-5">
              <div className="rounded-2xl border border-accent/20 bg-accent-dim/40 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-[#06231a]">
                    S
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text">Sowegan Team</p>
                    <p className="text-[11px] text-subtle">Just now · Welcome</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-text/90">
                  Welcome to Sowegan Portfolio. Your demo wallet is ready — make a
                  first deposit anytime, or explore P2P and crypto funding. We&apos;re
                  here if you need help.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-5 w-full rounded-2xl bg-accent py-3 text-sm font-semibold text-[#06231a] transition hover:bg-accent-hover"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
