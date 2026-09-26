"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Sparkline } from "@/components/ui/Sparkline";
import { ChangeText } from "@/components/ui/ChangeText";
import { markets, watchlistIds } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export function Watchlist() {
  const [ids, setIds] = useState(watchlistIds);
  const items = markets.filter((item) => ids.includes(item.id));

  return (
    <Card>
      <h2 className="mb-5 text-lg font-semibold">Watchlist</h2>
      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted">
          Your watchlist is empty. Add instruments from Markets.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{item.symbol}</p>
                <ChangeText value={item.changePercent} />
              </div>
              <Sparkline data={item.sparkline} positive={item.changePercent >= 0} className="hidden sm:block" />
              <div className="text-right">
                <p className="font-mono-numbers text-sm">
                  {formatNumber(item.price, item.price > 50 ? 2 : 4)}
                </p>
                <button
                  className="text-xs text-subtle hover:text-danger"
                  onClick={() => setIds((current) => current.filter((id) => id !== item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
