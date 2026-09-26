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
import { getTradingMode } from "@/lib/preferences";

export default function DashboardPage() {
  const [loaded, setLoaded] = useState(false);
  const [mode, setMode] = useState<"demo" | "real" | null>(null);

  useEffect(() => {
    setMode(getTradingMode());
    const timer = window.setTimeout(() => setLoaded(true), 650);
    return () => window.clearTimeout(timer);
  }, []);

  if (!loaded) {
    return <LoadingScreen label="Loading your trading desk…" />;
  }

  return (
    <DashboardShell
      title="Home"
      subtitle={
        mode === "demo"
          ? "Demo desk · practice with virtual funds"
          : "Your Sowegan trading workspace"
      }
    >
      <div className="space-y-6">
        <VerifyBanner />
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
