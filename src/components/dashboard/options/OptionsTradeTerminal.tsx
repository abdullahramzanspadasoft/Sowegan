"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  CandlestickChart,
  ChevronDown,
  Clock3,
  Crosshair,
  Download,
  FileText,
  Globe,
  Home,
  LifeBuoy,
  LineChart,
  LogOut,
  Maximize2,
  Minimize2,
  Minus,
  Moon,
  Pencil,
  Plus,
  Settings2,
  Sun,
} from "lucide-react";
import { VolatilityIcon, StepIndexIcon } from "@/components/icons/OptionsIcons";
import { DepositModal } from "@/components/dashboard/cfds/DepositModal";
import { P2PBoard } from "@/components/dashboard/cfds/P2PBoard";
import { getOptionsMarket, optionsMarkets } from "@/lib/options-markets";
import {
  clearTradingPreferences,
  getCfdViewMode,
  getUiTheme,
  saveCfdViewMode,
  saveTradingMode,
  saveUiTheme,
  type UiTheme,
} from "@/lib/preferences";
import { authClient } from "@/lib/auth";
import { cn, formatNumber } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { LocaleCode } from "@/lib/i18n/languages";

type Side = "rise" | "fall";
type Panel = "trade" | "positions" | "reports" | "help" | "language";

type Position = {
  id: string;
  side: Side;
  stake: number;
  payout: number;
  duration: number;
  entry: number;
  market: string;
  status: "open" | "won" | "lost";
  openedAt: number;
};

function seedSeries(start: number, count = 80) {
  const points: { t: number; v: number }[] = [];
  let price = start;
  const now = Date.now();
  for (let i = count - 1; i >= 0; i -= 1) {
    price += (Math.random() - 0.48) * (start * 0.00045);
    points.push({ t: now - i * 1000, v: price });
  }
  return points;
}

export function OptionsTradeTerminal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const market = getOptionsMarket(searchParams.get("id"));
  const { locale, setLocale, code: langCode } = useLanguage();

  const [series, setSeries] = useState(() => seedSeries(market.price));
  const [side, setSide] = useState<Side>("rise");
  const [duration, setDuration] = useState(5);
  const [stake, setStake] = useState(2);
  const [allowEquals, setAllowEquals] = useState(false);
  const [buying, setBuying] = useState(false);
  const [pairOpen, setPairOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [p2pOpen, setP2pOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"demo" | "real">("demo");
  const [theme, setTheme] = useState<UiTheme>("dark");
  const [panel, setPanel] = useState<Panel>("trade");
  const [positions, setPositions] = useState<Position[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [clock, setClock] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 900, h: 480 });
  const liveRef = useRef(market.price);

  useEffect(() => {
    setViewMode(getCfdViewMode() === "real" ? "real" : "demo");
    setTheme(getUiTheme());
    const onTheme = (e: Event) => {
      const detail = (e as CustomEvent<"dark" | "light">).detail;
      if (detail === "dark" || detail === "light") setTheme(detail);
    };
    window.addEventListener("sowegan-theme", onTheme);
    return () => window.removeEventListener("sowegan-theme", onTheme);
  }, []);

  useEffect(() => {
    setSeries(seedSeries(market.price));
    liveRef.current = market.price;
  }, [market.id, market.price]);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(
        d.toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "GMT",
          timeZoneName: "short",
        }),
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.max(320, width), h: Math.max(280, height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ——— Chart feed (unchanged) ———
  useEffect(() => {
    const id = window.setInterval(() => {
      setSeries((prev) => {
        const last = prev[prev.length - 1]?.v ?? market.price;
        const next = last + (Math.random() - 0.48) * (market.price * 0.0004);
        liveRef.current = next;
        const point = { t: Date.now(), v: next };
        return [...prev.slice(-119), point];
      });
      setPositions((prev) =>
        prev.map((pos) => {
          if (pos.status !== "open") return pos;
          const elapsed = (Date.now() - pos.openedAt) / 1000;
          if (elapsed < pos.duration) return pos;
          const price = liveRef.current;
          const up = price > pos.entry;
          const down = price < pos.entry;
          const equal = Math.abs(price - pos.entry) < market.price * 0.00005;
          let won = pos.side === "rise" ? up : down;
          if (equal) won = allowEquals;
          return { ...pos, status: won ? "won" : "lost" };
        }),
      );
    }, 900);
    return () => window.clearInterval(id);
  }, [market.price, allowEquals]);

  const last = series[series.length - 1]?.v ?? market.price;
  const first = series[0]?.v ?? market.price;
  const pct = ((last - first) / first) * 100;
  const payout = useMemo(
    () => stake * (side === "rise" ? 1.885 : 1.82) * (allowEquals ? 0.96 : 1),
    [stake, side, allowEquals],
  );

  // ——— Chart geometry (unchanged) ———
  const chart = useMemo(() => {
    const padL = 12;
    const padR = 72;
    const padT = 28;
    const padB = 36;
    const w = size.w;
    const h = size.h;
    const values = series.map((p) => p.v);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    const x = (i: number) =>
      padL + (i / Math.max(series.length - 1, 1)) * (w - padL - padR);
    const y = (v: number) => padT + ((max - v) / span) * (h - padT - padB);
    const line = series.map((p, i) => `${x(i)},${y(p.v)}`).join(" ");
    const area = `M ${x(0)},${h - padB} L ${line} L ${x(series.length - 1)},${h - padB} Z`;
    const priceTicks = Array.from({ length: 6 }, (_, i) => {
      const v = max - (span * i) / 5;
      return { v, y: y(v) };
    });
    const timeTicks = [0, 0.33, 0.66, 1].map((ratio) => {
      const i = Math.min(series.length - 1, Math.round((series.length - 1) * ratio));
      const p = series[i];
      return {
        x: x(i),
        label: new Date(p.t).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      };
    });
    return {
      line,
      area,
      x,
      y,
      padR,
      padT,
      padB,
      padL,
      w,
      h,
      priceTicks,
      timeTicks,
      lastY: y(last),
    };
  }, [series, size, last]);

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  }

  function toggleTheme() {
    const next: UiTheme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    saveUiTheme(next);
    window.dispatchEvent(new CustomEvent("sowegan-theme", { detail: next }));
    flash(`Theme · ${next === "dark" ? "Night" : "Day"}`);
  }

  function switchAccount(mode: "demo" | "real") {
    setViewMode(mode);
    saveCfdViewMode(mode);
    saveTradingMode(mode);
    setAccountOpen(false);
    flash(`${mode === "real" ? "Real" : "Demo"} account selected`);
  }

  async function buy() {
    setBuying(true);
    await wait(750);
    const pos: Position = {
      id: `pos-${Date.now()}`,
      side,
      stake,
      payout,
      duration,
      entry: liveRef.current,
      market: market.name,
      status: "open",
      openedAt: Date.now(),
    };
    setPositions((prev) => [pos, ...prev]);
    setBuying(false);
    setPanel("positions");
    flash(`${side.toUpperCase()} contract opened · $${stake}`);
  }

  function logout() {
    authClient.logout();
    clearTradingPreferences();
    router.push("/region?next=login");
  }

  async function toggleFullscreen() {
    const el = rootRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      await el.requestFullscreen().catch(() => null);
      setFullscreen(true);
    } else {
      await document.exitFullscreen().catch(() => null);
      setFullscreen(false);
    }
  }

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const openCount = positions.filter((p) => p.status === "open").length;
  const chartStroke = theme === "light" ? "#0f172a" : "#e8eef8";

  const rail = [
    {
      id: "trade" as const,
      label: "Home",
      icon: Home,
      action: () => setPanel("trade"),
    },
    {
      id: "positions" as const,
      label: "Positions",
      icon: Clock3,
      action: () => setPanel("positions"),
    },
    {
      id: "reports" as const,
      label: "Reports",
      icon: FileText,
      action: () => setPanel("reports"),
    },
    {
      id: "help" as const,
      label: "Help",
      icon: LifeBuoy,
      action: () => setPanel("help"),
    },
    {
      id: "language" as const,
      label: "Language",
      icon: Globe,
      action: () => setPanel("language"),
    },
  ];

  return (
    <div
      ref={rootRef}
      className="flex min-h-screen bg-bg text-text"
      data-theme={theme}
    >
      {/* Left rail — reference style */}
      <aside className="flex w-[72px] shrink-0 flex-col items-center border-r border-border bg-bg-elevated py-3">
        <Link
          href="/dashboard"
          className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-sm font-bold text-[#06231a]"
          title="Sowegan"
        >
          SW
        </Link>

        <nav className="flex flex-1 flex-col items-center gap-1">
          {rail.map((item) => {
            const Icon = item.icon;
            const active = panel === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={item.action}
                className={cn(
                  "relative flex w-[64px] flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] transition",
                  active
                    ? "bg-accent-dim text-accent"
                    : "text-muted hover:bg-surface-muted hover:text-text",
                )}
              >
                <Icon size={18} strokeWidth={1.75} />
                <span>{item.label}</span>
                {item.id === "positions" && openCount > 0 && (
                  <span className="absolute right-2 top-1 h-4 min-w-4 rounded-full bg-accent px-1 text-[9px] font-bold text-[#06231a]">
                    {openCount}
                  </span>
                )}
              </button>
            );
          })}

          <button
            type="button"
            onClick={toggleTheme}
            className="mt-2 flex w-[64px] flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] text-muted transition hover:bg-surface-muted hover:text-text"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <span>Theme</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="mt-auto flex w-[64px] flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] text-muted transition hover:bg-surface-muted hover:text-text"
          >
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-bg-elevated px-3 py-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg border border-border p-2 text-muted hover:bg-surface-muted hover:text-text"
              aria-label="Add market"
              onClick={() => flash("Add market · demo")}
            >
              <Plus size={16} className="rotate-45" />
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setPairOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-muted px-3 py-2 text-sm font-semibold"
              >
                {market.kind === "step" ? (
                  <StepIndexIcon className="h-7 w-7" />
                ) : (
                  <VolatilityIcon value={market.badge} className="h-7 w-7" />
                )}
                <span className="text-left">
                  <span className="block">{market.name}</span>
                  <span className="text-[11px] font-medium text-muted">Rise/Fall</span>
                </span>
                <ChevronDown size={14} className="text-muted" />
              </button>
              <AnimatePresence>
                {pairOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-0 top-[calc(100%+8px)] z-40 max-h-72 w-80 overflow-auto rounded-2xl border border-border bg-surface shadow-2xl"
                  >
                    {optionsMarkets.map((item) => (
                      <Link
                        key={item.id}
                        href={`/dashboard/options/trade?id=${item.id}`}
                        onClick={() => setPairOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-surface-muted"
                      >
                        {item.kind === "step" ? (
                          <StepIndexIcon className="h-8 w-8" />
                        ) : (
                          <VolatilityIcon value={item.badge} className="h-8 w-8" />
                        )}
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden items-center rounded-full bg-surface-muted p-1 sm:inline-flex">
              {(["rise", "fall"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSide(item)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold capitalize",
                    side === item ? "bg-surface text-text shadow-sm" : "text-muted",
                  )}
                >
                  {item === "rise" ? "Rise/Fall" : item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen((v) => !v)}
                className="rounded-xl border border-border px-3 py-2 text-left"
              >
                <p className="text-[11px] text-subtle">
                  {viewMode === "real" ? "Real account" : "Demo account"}
                </p>
                <p className="font-mono-numbers text-sm font-semibold">0.00 USD</p>
              </button>
              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 top-[calc(100%+8px)] z-40 w-44 overflow-hidden rounded-xl border border-border bg-surface shadow-xl"
                  >
                    {(["demo", "real"] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => switchAccount(mode)}
                        className="block w-full px-3 py-2.5 text-left text-sm capitalize hover:bg-surface-muted"
                      >
                        {mode} account
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              type="button"
              onClick={() => setDepositOpen(true)}
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-[#06231a]"
            >
              Deposit
            </button>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[1fr_320px]">
          {/* Chart — same graph, only chrome around it */}
          <section className="relative flex min-h-[420px] flex-col border-b border-border lg:border-b-0 lg:border-r">
            <div className="absolute left-3 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2">
              {[
                { Icon: LineChart, tip: "Line chart" },
                { Icon: CandlestickChart, tip: "Candles" },
                { Icon: Pencil, tip: "Draw" },
                { Icon: Settings2, tip: "Indicators" },
                { Icon: Download, tip: "Snapshot" },
              ].map(({ Icon, tip }) => (
                <button
                  key={tip}
                  type="button"
                  title={tip}
                  onClick={() => flash(`${tip} · demo`)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-elevated/90 text-muted hover:text-text"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>

            <div ref={wrapRef} className="relative min-h-[420px] flex-1 p-2 sm:p-3">
              <svg width={chart.w} height={chart.h} className="h-full w-full overflow-visible">
                <defs>
                  <linearGradient id="optArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3ee0b0" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#3ee0b0" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {chart.priceTicks.map((tick) => (
                  <g key={tick.v}>
                    <line
                      x1={chart.padL}
                      x2={chart.w - chart.padR}
                      y1={tick.y}
                      y2={tick.y}
                      stroke="var(--border)"
                    />
                    <text
                      x={chart.w - 8}
                      y={tick.y + 4}
                      textAnchor="end"
                      fill="var(--text-subtle)"
                      fontSize="11"
                      fontFamily="var(--font-plex), monospace"
                    >
                      {formatNumber(tick.v, 3)}
                    </text>
                  </g>
                ))}

                {chart.timeTicks.map((tick) => (
                  <text
                    key={tick.label + tick.x}
                    x={tick.x}
                    y={chart.h - 10}
                    textAnchor="middle"
                    fill="var(--text-subtle)"
                    fontSize="11"
                  >
                    {tick.label}
                  </text>
                ))}

                <path d={chart.area} fill="url(#optArea)" />
                <polyline
                  points={chart.line}
                  fill="none"
                  stroke={chartStroke}
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                <line
                  x1={chart.padL}
                  x2={chart.w - chart.padR}
                  y1={chart.lastY}
                  y2={chart.lastY}
                  stroke="var(--text-muted)"
                  strokeOpacity="0.35"
                  strokeDasharray="4 4"
                />

                <rect
                  x={12}
                  y={10}
                  width={118}
                  height={36}
                  rx="8"
                  fill={pct >= 0 ? "var(--success-dim)" : "var(--danger-dim)"}
                  stroke={pct >= 0 ? "var(--success)" : "var(--danger)"}
                />
                <text
                  x={22}
                  y={26}
                  fill={pct >= 0 ? "var(--success)" : "var(--danger)"}
                  fontSize="12"
                  fontWeight="700"
                >
                  {pct >= 0 ? "+" : ""}
                  {pct.toFixed(3)}%
                </text>
                <text
                  x={22}
                  y={40}
                  fill="var(--text)"
                  fontSize="12"
                  fontFamily="var(--font-plex), monospace"
                >
                  {formatNumber(last, 3)}
                </text>

                <rect
                  x={chart.w - chart.padR + 4}
                  y={chart.lastY - 12}
                  width={62}
                  height={24}
                  rx="6"
                  fill="var(--text)"
                />
                <text
                  x={chart.w - chart.padR + 35}
                  y={chart.lastY + 4}
                  textAnchor="middle"
                  fill="var(--bg)"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="var(--font-plex), monospace"
                >
                  {formatNumber(last, 3)}
                </text>
              </svg>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
                {[
                  { Icon: Minus, tip: "Zoom out" },
                  { Icon: Crosshair, tip: "Reset" },
                  { Icon: Plus, tip: "Zoom in" },
                ].map(({ Icon, tip }) => (
                  <button
                    key={tip}
                    type="button"
                    title={tip}
                    onClick={() => flash(`${tip} · demo`)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-elevated/95 text-muted hover:text-text"
                  >
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Right panel */}
          <aside className="flex flex-col bg-bg-elevated">
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              <AnimatePresence mode="wait">
                {panel === "trade" && (
                  <motion.div
                    key="trade"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="space-y-4"
                  >
                    <button
                      type="button"
                      onClick={() => setPanel("help")}
                      className="text-sm text-muted hover:text-accent"
                    >
                      How to trade Rise/Fall? ›
                    </button>

                    <div className="inline-flex w-full rounded-full bg-surface-muted p-1">
                      {(["rise", "fall"] as const).map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setSide(item)}
                          className={cn(
                            "flex-1 rounded-full py-2.5 text-sm font-semibold capitalize transition",
                            side === item
                              ? "bg-surface text-text shadow-sm ring-1 ring-accent/40"
                              : "text-muted",
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <Field label="Duration">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={duration}
                          onChange={(e) =>
                            setDuration(Math.max(1, Number(e.target.value) || 1))
                          }
                          className="w-full bg-transparent text-center text-base font-semibold outline-none"
                        />
                        <span className="text-sm text-muted">ticks</span>
                      </div>
                    </Field>

                    <Field label="Stake">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-muted">$</span>
                        <input
                          type="number"
                          min={1}
                          step={1}
                          value={stake}
                          onChange={(e) =>
                            setStake(Math.max(1, Number(e.target.value) || 1))
                          }
                          className="w-full bg-transparent text-base font-semibold outline-none"
                        />
                      </div>
                      <div className="mt-2 flex gap-2">
                        {[1, 2, 5, 10, 25].map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setStake(v)}
                            className={cn(
                              "rounded-lg px-2 py-1 text-xs font-semibold",
                              stake === v
                                ? "bg-accent-dim text-accent"
                                : "bg-bg text-muted",
                            )}
                          >
                            ${v}
                          </button>
                        ))}
                      </div>
                    </Field>

                    <label className="flex items-center justify-between gap-3 text-sm text-muted">
                      <span>Allow equals</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={allowEquals}
                        onClick={() => setAllowEquals((v) => !v)}
                        className={cn(
                          "relative h-6 w-11 rounded-full transition",
                          allowEquals ? "bg-accent" : "bg-white/15",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 h-5 w-5 rounded-full bg-white transition",
                            allowEquals ? "left-5" : "left-0.5",
                          )}
                        />
                      </button>
                    </label>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={buy}
                      disabled={buying}
                      className={cn(
                        "flex w-full flex-col items-center rounded-2xl px-4 py-4 text-center font-semibold transition disabled:opacity-70",
                        side === "rise"
                          ? "bg-success text-[#042015]"
                          : "bg-danger text-white",
                      )}
                    >
                      {buying ? (
                        <span className="inline-flex items-center gap-2 text-base">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Buying…
                        </span>
                      ) : (
                        <>
                          <span className="text-lg">Buy</span>
                          <span className="mt-1 text-sm opacity-90">
                            Payout ${formatNumber(payout, 2)}
                          </span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}

                {panel === "positions" && (
                  <PanelBlock title="Open positions">
                    {positions.length === 0 ? (
                      <p className="text-sm text-muted">No contracts yet. Place a Buy to open one.</p>
                    ) : (
                      <div className="space-y-2">
                        {positions.map((pos) => (
                          <div
                            key={pos.id}
                            className="rounded-xl border border-border bg-surface-muted px-3 py-3 text-sm"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold capitalize">{pos.side}</span>
                              <span
                                className={cn(
                                  "rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase",
                                  pos.status === "open" && "bg-accent-dim text-accent",
                                  pos.status === "won" && "bg-success-dim text-success",
                                  pos.status === "lost" && "bg-danger-dim text-danger",
                                )}
                              >
                                {pos.status}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-subtle">
                              Entry {formatNumber(pos.entry, 3)} · ${pos.stake} · {pos.duration}t
                            </p>
                            <p className="text-xs text-muted">{pos.market}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setPanel("trade")}
                      className="mt-4 text-sm text-accent hover:underline"
                    >
                      ← Back to trade
                    </button>
                  </PanelBlock>
                )}

                {panel === "reports" && (
                  <PanelBlock title="Reports">
                    <p className="text-sm leading-relaxed text-muted">
                      Demo session summary. Wins and losses appear after contracts settle.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex justify-between border-b border-border py-2">
                        <span className="text-muted">Contracts</span>
                        <span className="font-semibold">{positions.length}</span>
                      </li>
                      <li className="flex justify-between border-b border-border py-2">
                        <span className="text-muted">Won</span>
                        <span className="font-semibold text-success">
                          {positions.filter((p) => p.status === "won").length}
                        </span>
                      </li>
                      <li className="flex justify-between py-2">
                        <span className="text-muted">Lost</span>
                        <span className="font-semibold text-danger">
                          {positions.filter((p) => p.status === "lost").length}
                        </span>
                      </li>
                    </ul>
                    <button
                      type="button"
                      onClick={() => setPanel("trade")}
                      className="mt-4 text-sm text-accent hover:underline"
                    >
                      ← Back to trade
                    </button>
                  </PanelBlock>
                )}

                {panel === "help" && (
                  <PanelBlock title="How to trade Rise/Fall">
                    <ol className="list-decimal space-y-2 pl-4 text-sm text-muted">
                      <li>Pick Rise if you expect the tick to finish higher.</li>
                      <li>Pick Fall if you expect it lower.</li>
                      <li>Set duration (ticks) and stake.</li>
                      <li>Press Buy — result settles when ticks complete.</li>
                    </ol>
                    <button
                      type="button"
                      onClick={() => setPanel("trade")}
                      className="mt-4 text-sm text-accent hover:underline"
                    >
                      ← Back to trade
                    </button>
                  </PanelBlock>
                )}

                {panel === "language" && (
                  <PanelBlock title="Language">
                    <div className="grid grid-cols-2 gap-2">
                      {(
                        [
                          { code: "EN", locale: "en" as LocaleCode, label: "English" },
                          { code: "KO", locale: "ko" as LocaleCode, label: "한국어" },
                          { code: "SW", locale: "sw" as LocaleCode, label: "Kiswahili" },
                        ] as const
                      ).map((item) => (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => {
                            setLocale(item.locale);
                            flash(`Language · ${item.label}`);
                            setPanel("trade");
                          }}
                          className={cn(
                            "rounded-xl border px-3 py-3 text-sm font-semibold",
                            locale === item.locale
                              ? "border-accent/40 bg-accent-dim text-accent"
                              : "border-border text-muted hover:bg-surface-muted",
                          )}
                        >
                          <span className="block">{item.code}</span>
                          <span className="mt-0.5 block text-[11px] font-medium opacity-80">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-subtle">
                      Active: {langCode} · applies across the website
                    </p>
                  </PanelBlock>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-subtle">
              <span>
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-sky-400" />
                {clock || "—"}
              </span>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="rounded-lg p-1.5 hover:bg-surface-muted"
                aria-label="Fullscreen"
              >
                {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
            </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-border bg-surface px-4 py-2 text-sm shadow-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <DepositModal
        open={depositOpen}
        onClose={() => setDepositOpen(false)}
        onSelectP2P={() => setP2pOpen(true)}
      />
      <P2PBoard open={p2pOpen} onClose={() => setP2pOpen(false)} />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block rounded-2xl border border-border bg-surface-muted px-4 py-3">
      <span className="text-xs text-subtle">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function PanelBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
    >
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      {children}
    </motion.div>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
