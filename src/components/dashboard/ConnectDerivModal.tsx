"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, ExternalLink, Loader2, Shield, X } from "lucide-react";
import {
  activateRealTradingMode,
  getDerivConnection,
  saveDerivConnection,
  type DerivConnection,
} from "@/lib/preferences";

type Step = "intro" | "connecting" | "done";

/** Frontend-only Deriv connect demo — same desk UI, Real mode after success */
export function ConnectDerivModal({
  open,
  onClose,
  onConnected,
}: {
  open: boolean;
  onClose: () => void;
  onConnected?: (connection: DerivConnection) => void;
}) {
  const [step, setStep] = useState<Step>("intro");
  const [connection, setConnection] = useState<DerivConnection | null>(null);

  useEffect(() => {
    if (!open) {
      setStep("intro");
      return;
    }
    const existing = getDerivConnection();
    if (existing?.connected) {
      setConnection(existing);
      setStep("done");
    }
  }, [open]);

  async function connectDeriv() {
    setStep("connecting");
    await wait(1600);
    const next: DerivConnection = {
      connected: true,
      loginId: `CR${Math.floor(10000000 + Math.random() * 89999999)}`,
      email: "trader@deriv.demo",
      connectedAt: Date.now(),
    };
    saveDerivConnection(next);
    activateRealTradingMode();
    setConnection(next);
    setStep("done");
    onConnected?.(next);
  }

  function finish() {
    activateRealTradingMode();
    onConnected?.(connection ?? getDerivConnection()!);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="deriv-title"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <p id="deriv-title" className="text-base font-semibold text-text">
                  Connect Deriv
                </p>
                <p className="text-xs text-subtle">Real mode · same Sowegan desk UI</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-surface-muted p-2 text-muted transition hover:bg-surface-hover hover:text-text"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-5 py-6">
              <AnimatePresence mode="wait">
                {step === "intro" && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center gap-4 rounded-2xl border border-border bg-bg-elevated p-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff444f] text-sm font-bold text-white">
                        DT
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-text">Deriv account</p>
                        <p className="text-xs text-muted">
                          Link Deriv to unlock Real trading on this desk
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-2 text-sm text-muted">
                      <li className="flex items-start gap-2">
                        <Shield size={16} className="mt-0.5 shrink-0 text-accent" />
                        Same charts, markets, and layout as demo
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield size={16} className="mt-0.5 shrink-0 text-accent" />
                        Account badge switches to <strong className="text-text">Real</strong>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield size={16} className="mt-0.5 shrink-0 text-accent" />
                        Frontend demo only — no live brokerage money
                      </li>
                    </ul>

                    <button
                      type="button"
                      onClick={connectDeriv}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ff444f] py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
                    >
                      <ExternalLink size={16} />
                      Continue with Deriv
                    </button>
                  </motion.div>
                )}

                {step === "connecting" && (
                  <motion.div
                    key="connecting"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex flex-col items-center gap-4 py-10 text-center"
                  >
                    <Loader2 className="h-10 w-10 animate-spin text-[#ff444f]" />
                    <div>
                      <p className="text-base font-semibold text-text">
                        Connecting to Deriv…
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        Authorizing OAuth · demo handshake
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === "done" && connection && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-5"
                  >
                    <div className="flex flex-col items-center gap-3 py-2 text-center">
                      <CheckCircle2 className="h-12 w-12 text-success" />
                      <div>
                        <p className="text-lg font-semibold text-text">Deriv connected</p>
                        <p className="mt-1 text-sm text-muted">
                          Your desk is now in <span className="font-semibold text-text">Real</span>{" "}
                          mode — same UI as demo.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-bg-elevated px-4 py-3 text-sm">
                      <div className="flex justify-between gap-3 py-1.5">
                        <span className="text-muted">Login ID</span>
                        <span className="font-mono-numbers font-semibold text-text">
                          {connection.loginId}
                        </span>
                      </div>
                      <div className="flex justify-between gap-3 border-t border-border py-1.5">
                        <span className="text-muted">Email</span>
                        <span className="font-semibold text-text">{connection.email}</span>
                      </div>
                      <div className="flex justify-between gap-3 border-t border-border py-1.5">
                        <span className="text-muted">Mode</span>
                        <span className="rounded-full bg-accent-dim px-2 py-0.5 text-xs font-semibold text-accent">
                          Real
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={finish}
                      className="w-full rounded-2xl bg-accent py-3.5 text-sm font-semibold text-[#06231a] transition hover:bg-accent-hover"
                    >
                      Open Real trading desk
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

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
