"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, X } from "lucide-react";
import {
  LoadingOrb,
  P2PIcon,
  TreasureIcon,
  UsdcIcon,
  UsdIcon,
  UsdtIcon,
} from "@/components/icons/PaymentIcons";

type DepositMethod = "usdt" | "usdc" | "p2p" | "usd" | "treasure";

export function DepositModal({
  open,
  onClose,
  onSelectP2P,
}: {
  open: boolean;
  onClose: () => void;
  onSelectP2P: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<DepositMethod | null>(null);
  const [showMore, setShowMore] = useState(false);

  async function choose(method: DepositMethod) {
    setSelected(method);
    setLoading(true);
    await wait(1200);
    setLoading(false);
    if (method === "p2p") {
      onClose();
      onSelectP2P();
      return;
    }
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-6">
              <h2 className="text-xl font-semibold">Deposit</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-white/8 p-2 text-subtle hover:bg-white/12 hover:text-text"
              >
                <X size={16} />
              </button>
            </div>

            <div className="relative px-5 pb-6 sm:px-6">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex flex-col items-center gap-4 py-16 text-center"
                  >
                    <LoadingOrb />
                    <p className="text-sm font-medium text-text">
                      Connecting {selected?.toUpperCase()}…
                    </p>
                    <p className="text-xs text-subtle">Fake payment rail · demo only</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="methods"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <MethodCard
                        onClick={() => choose("usdt")}
                        className="bg-[#121a16]"
                        label="USDT"
                        icon={<UsdtIcon className="h-9 w-9" />}
                      />
                      <MethodCard
                        onClick={() => choose("usdc")}
                        className="bg-[#101826]"
                        label="USDC"
                        icon={<UsdcIcon className="h-9 w-9" />}
                      />
                    </div>

                    <MethodRow
                      onClick={() => choose("p2p")}
                      icon={<P2PIcon className="h-9 w-9 text-text" />}
                      title="P2P"
                      description="Buy and sell USD with other traders. Deposit and withdraw in your local currency."
                    />
                    <MethodRow
                      onClick={() => choose("usd")}
                      icon={<UsdIcon className="h-9 w-9 text-text" />}
                      title="USD"
                      description="Fund via bank, card, e-wallet, and crypto."
                    />

                    <AnimatePresence>
                      {showMore && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <MethodRow
                            onClick={() => choose("treasure")}
                            icon={<TreasureIcon className="h-9 w-9" />}
                            title="Treasure"
                            description="Fake demo vault method · instant simulated credit."
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="button"
                      onClick={() => setShowMore((v) => !v)}
                      className="mx-auto flex items-center gap-1 pt-2 text-sm font-medium text-muted hover:text-text"
                    >
                      {showMore ? "View less" : "View more"}
                      <ChevronDown
                        size={16}
                        className={showMore ? "rotate-180 transition" : "transition"}
                      />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function MethodCard({
  label,
  icon,
  onClick,
  className,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex min-h-[110px] flex-col justify-between rounded-2xl border border-white/8 p-4 text-left ${className}`}
    >
      {icon}
      <span className="text-base font-semibold text-text">{label}</span>
    </motion.button>
  );
}

function MethodRow({
  title,
  description,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.99 }}
      className="flex w-full items-start gap-3 rounded-2xl border border-border bg-surface-muted/70 px-4 py-3.5 text-left transition hover:border-accent/30"
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span>
        <span className="block text-sm font-semibold text-text">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-muted">{description}</span>
      </span>
    </motion.button>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
