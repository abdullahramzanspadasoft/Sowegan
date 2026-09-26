"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Menu, Search } from "lucide-react";
import { authClient } from "@/lib/auth";
import type { AuthUser } from "@/lib/auth";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function DashboardHeader({
  title,
  subtitle,
  onMenu,
}: {
  title: string;
  subtitle: string;
  onMenu: () => void;
}) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(authClient.getSession()?.user ?? null);
  }, []);

  const initials = (user?.name ?? "SD")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const query = String(data.get("q") ?? "").trim();
    router.push(
      query
        ? `/dashboard/markets?q=${encodeURIComponent(query)}`
        : "/dashboard/markets",
    );
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            className="rounded-xl p-2 text-muted hover:bg-surface-muted lg:hidden"
            onClick={onMenu}
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold sm:text-lg lg:text-xl">
              {title}
            </h1>
            <p className="truncate text-xs text-subtle sm:text-sm">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <form onSubmit={onSearch} className="relative hidden md:block">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
              size={16}
            />
            <input
              name="q"
              placeholder="Search instruments"
              className="h-10 w-64 rounded-xl border border-border bg-surface-muted pl-9 pr-3 text-sm outline-none placeholder:text-subtle focus:border-accent/40"
            />
          </form>
          <ThemeToggle />
          <button
            className="relative rounded-xl border border-border p-2.5 text-muted hover:bg-surface-muted"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
          </button>
          <div className="hidden items-center gap-3 rounded-xl border border-border px-3 py-2 sm:flex">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-dim text-xs font-semibold text-accent">
              {initials}
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">
                {user?.name ?? "Sowegan Demo"}
              </p>
              <p className="text-xs text-subtle">Pro account</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
