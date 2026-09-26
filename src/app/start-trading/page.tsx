"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Settings2, UserRound } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ConnectDerivModal } from "@/components/dashboard/ConnectDerivModal";
import { authClient } from "@/lib/auth";
import {
  getDerivConnection,
  getTradingMode,
  saveTradingMode,
  type TradingMode,
} from "@/lib/preferences";

export default function StartTradingPage() {
  const router = useRouter();
  const [derivOpen, setDerivOpen] = useState(false);

  useEffect(() => {
    const session = authClient.getSession();
    if (!session) {
      router.replace("/region?next=login");
      return;
    }
    if (getTradingMode()) {
      router.replace("/dashboard");
    }
  }, [router]);

  function choose(mode: TradingMode) {
    if (mode === "real") {
      setDerivOpen(true);
      return;
    }
    saveTradingMode("demo");
    router.push("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden page-grid px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(62,224,176,0.16),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(10,18,36,0.9),var(--bg)_70%)]" />

      <div className="relative z-10 mb-10">
        <Logo href="/" size="lg" />
      </div>

      <div className="relative z-10 w-full max-w-lg text-center">
        <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center">
          <div className="relative">
            <span className="inline-flex h-24 w-24 items-center justify-center rounded-[2rem] border border-border bg-surface shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
              <UserRound className="text-muted" size={44} strokeWidth={1.5} />
            </span>
            <span className="absolute -bottom-1 -right-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-accent text-[#06231a] shadow-lg">
              <Settings2 size={22} />
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Start real trading
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted sm:text-base">
          Connect Deriv for Real mode — same desk UI as demo — or try free demo trading.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="min-w-[180px] rounded-full"
            onClick={() => choose("demo")}
          >
            Try demo trading
          </Button>
          <Button
            type="button"
            size="lg"
            className="min-w-[180px] rounded-full"
            onClick={() => choose("real")}
          >
            Try real trading
          </Button>
        </div>

        <p className="mt-8 text-xs leading-5 text-subtle">
          Frontend demo only. Deriv connect is simulated — no live brokerage money moves.
        </p>
      </div>

      <ConnectDerivModal
        open={derivOpen}
        onClose={() => {
          setDerivOpen(false);
          // If user already connected earlier, go to dashboard
          if (getDerivConnection()?.connected || getTradingMode() === "real") {
            router.push("/dashboard");
          }
        }}
        onConnected={() => {
          setDerivOpen(false);
          router.push("/dashboard");
        }}
      />
    </div>
  );
}
