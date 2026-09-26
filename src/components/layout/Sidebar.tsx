"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  Briefcase,
  CandlestickChart,
  Coins,
  Home,
  LogOut,
  Sparkles,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth";
import type { AuthUser } from "@/lib/auth";
import { clearTradingPreferences, getTradingMode } from "@/lib/preferences";

const items = [
  { href: "/dashboard", label: "Home", icon: Home, exact: true },
  { href: "/dashboard/cfds", label: "CFDs", icon: CandlestickChart },
  { href: "/dashboard/crypto", label: "Crypto", icon: Coins },
  { href: "/dashboard/options", label: "Options", icon: ArrowLeftRight },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: Briefcase },
];

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mode, setMode] = useState<"demo" | "real" | null>(null);

  useEffect(() => {
    setUser(authClient.getSession()?.user ?? null);
    setMode(getTradingMode());
  }, []);

  const displayName = user?.name ?? "Sowegan Trader";
  const shortName =
    displayName.length > 18 ? `${displayName.slice(0, 16)}…` : displayName;

  const content = (
    <div className="flex h-full flex-col bg-bg-elevated">
      <div className="flex h-20 items-center justify-between gap-2 px-5">
        <Logo href="/dashboard" size="sm" />
        <button
          className="rounded-lg p-2 text-subtle hover:bg-surface-muted lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {items.map((item) => {
          const pathOnly = item.href.split("?")[0];
          const active = item.exact
            ? pathname === pathOnly
            : pathname.startsWith(pathOnly) && pathOnly !== "/dashboard";
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition",
                active
                  ? "bg-accent-dim text-accent"
                  : "text-muted hover:bg-surface-muted hover:text-text",
              )}
            >
              <Icon size={18} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}

        <div className="mt-4 px-1">
          <ThemeToggle showLabel className="w-full justify-start rounded-xl px-3 py-2.5" />
        </div>
        <div className="mt-2 px-1">
          <LanguageSwitcher variant="mobile" />
        </div>
        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(105deg,#fbbf24_0%,#f97316_45%,#a855f7_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(168,85,247,0.25)] transition hover:brightness-110"
        >
          <Sparkles size={16} />
          Ask Sowegan
        </button>
      </nav>

      <div className="space-y-3 border-t border-border p-4">
        <Link
          href="/dashboard/profile"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl border border-border bg-surface-muted/60 px-3 py-3 transition hover:border-accent/30"
        >
          <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-dim text-sm font-semibold text-accent">
            {(user?.name ?? "S")
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-bg-elevated bg-success" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-text">{shortName}</p>
            <p className="text-xs text-success">
              Online · {mode === "demo" ? "Demo" : mode === "real" ? "Real" : "Account"}
            </p>
          </div>
        </Link>

        <button
          onClick={() => {
            authClient.logout();
            clearTradingPreferences();
            router.push("/region?next=login");
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition hover:bg-surface-muted hover:text-text"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-72 shrink-0 border-r border-border lg:block">
        <div className="sticky top-0 h-screen">{content}</div>
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/60" onClick={onClose} aria-label="Close menu" />
          <div className="relative h-full w-72 border-r border-border">{content}</div>
        </div>
      )}
    </>
  );
}
