"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Globe2, Search } from "lucide-react";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { regions, saveRegion, getRegion } from "@/lib/preferences";
import { Flag } from "@/components/ui/Flag";
import { cn } from "@/lib/utils";

export function RegionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") === "signup" ? "signup" : "login";

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const existing = getRegion();
    if (existing) setSelected(existing);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return regions;
    return regions.filter(
      (item) =>
        item.name.toLowerCase().includes(q) || item.code.toLowerCase().includes(q),
    );
  }, [query]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!selected) {
      setError("Please select your country or region to continue.");
      return;
    }
    saveRegion(selected);
    router.push(next === "signup" ? "/signup" : "/login");
  }

  return (
    <AuthShell
      title="Select your region"
      subtitle="Choose your country or region before signing in. This helps tailor market hours and account settings."
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        {error && <Alert tone="error" title={error} />}

        <label className="block space-y-2">
          <span className="block text-sm font-medium text-text">Search country</span>
          <span className="relative block">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
              size={16}
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Pakistan, UAE, UK..."
              className="h-12 w-full rounded-xl border border-border bg-surface-muted pl-10 pr-4 text-sm text-text outline-none placeholder:text-subtle focus:border-accent/50 focus:ring-4 focus:ring-accent/10"
            />
          </span>
        </label>

        <div className="max-h-72 space-y-2 overflow-y-auto rounded-2xl border border-border bg-surface-muted/50 p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted">No regions found.</p>
          ) : (
            filtered.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setSelected(item.code);
                  setError("");
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition",
                  selected === item.code
                    ? "bg-accent-dim text-accent ring-1 ring-accent/30"
                    : "text-text hover:bg-white/5",
                )}
              >
                <Flag code={item.code} name={item.name} />
                <span className="flex-1 text-sm font-medium text-text">{item.name}</span>
                <span className="text-xs text-subtle">{item.code}</span>
              </button>
            ))
          )}
        </div>

        <Button type="submit" fullWidth>
          <Globe2 size={18} />
          Continue to {next === "signup" ? "Register" : "Login"}
        </Button>
      </form>
    </AuthShell>
  );
}
