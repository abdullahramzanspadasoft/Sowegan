"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { MarketCard } from "@/components/dashboard/MarketCard";
import { Card } from "@/components/ui/Card";
import { markets, categoryLabels } from "@/lib/data";
import type { AssetClass } from "@/lib/types";
import { cn } from "@/lib/utils";

const filters: Array<"all" | AssetClass> = ["all", "forex", "crypto", "commodities", "indices"];

export function MarketsBoard() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const initialFilter =
    catParam === "forex" ||
    catParam === "crypto" ||
    catParam === "commodities" ||
    catParam === "indices"
      ? catParam
      : "all";
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [filter, setFilter] = useState<(typeof filters)[number]>(initialFilter);

  const results = useMemo(() => {
    return markets.filter((item) => {
      const matchesFilter = filter === "all" || item.category === filter;
      const haystack = `${item.symbol} ${item.name}`.toLowerCase();
      return matchesFilter && haystack.includes(query.toLowerCase().trim());
    });
  }, [filter, query]);

  return (
    <DashboardShell title="Markets" subtitle="Forex, crypto, commodities, and indices">
      <Card className="mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle" size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by symbol or name"
              className="h-11 w-full rounded-xl border border-border bg-surface-muted pl-9 pr-3 text-sm outline-none placeholder:text-subtle focus:border-accent/40"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={cn(
                  "rounded-full border px-3 py-2 text-sm font-medium capitalize transition",
                  filter === item
                    ? "border-accent/30 bg-accent-dim text-accent"
                    : "border-border text-muted hover:text-text",
                )}
              >
                {item === "all" ? "All markets" : categoryLabels[item]}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {results.length === 0 ? (
        <Card className="py-16 text-center">
          <h2 className="text-lg font-semibold">No instruments found</h2>
          <p className="mt-2 text-sm text-muted">
            Try another search term or reset the market filter.
          </p>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {results.map((item) => (
            <MarketCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
