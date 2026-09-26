"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { VerifyBanner } from "@/components/dashboard/VerifyBanner";
import { DemoAccounts } from "@/components/dashboard/DemoAccounts";
import { TradingChart } from "@/components/dashboard/TradingChart";
import { ChartPromoBanner } from "@/components/dashboard/ChartPromoBanner";
import { Watchlist } from "@/components/dashboard/Watchlist";
import { MarketOverview } from "@/components/dashboard/MarketOverview";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { getDerivConnection, getTradingMode } from "@/lib/preferences";

export default function DashboardPage() {
  const [loaded, setLoaded] = useState(false);
  const [mode, setMode] = useState<"demo" | "real" | null>(null);
  const [derivId, setDerivId] = useState<string | null>(null);

  useEffect(() => {
    setMode(getTradingMode());
    setDerivId(getDerivConnection()?.loginId ?? null);
    const timer = window.setTimeout(() => setLoaded(true), 650);
    return () => window.clearTimeout(timer);
  }, []);

  if (!loaded) {
    return <LoadingScreen label="Loading your trading desk…" />;
  }

  const isReal = mode === "real";

  return (
    <DashboardShell
      title="Home"
      subtitle={
        isReal
          ? derivId
            ? `Real desk · Deriv ${derivId}`
            : "Real desk · same UI as demo"
          : "Demo desk · practice with virtual funds"
      }
    >
      <div className="space-y-6">
        {!isReal && <VerifyBanner />}
        {isReal && (
          <div className="rounded-2xl border border-accent/25 bg-accent-dim px-4 py-3 text-sm text-accent sm:px-5">
            Real mode on — same charts & desks as demo
            {derivId ? ` · Connected to Deriv (${derivId})` : ""}. Frontend demo
            only.
          </div>
        )}
        <DemoAccounts />
        <TradingChart symbol="EUR/USD" />
        <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <Watchlist />
          <MarketOverview />
        </div>
        <ChartPromoBanner />
      </div>
    </DashboardShell>
  );
}
