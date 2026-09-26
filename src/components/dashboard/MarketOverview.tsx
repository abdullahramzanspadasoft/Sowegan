import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Sparkline } from "@/components/ui/Sparkline";
import { ChangeText } from "@/components/ui/ChangeText";
import { markets } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export function MarketOverview() {
  const items = markets.slice(0, 6);

  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Market overview</h2>
        <Link href="/dashboard/markets" className="text-sm font-semibold text-accent">
          See all
        </Link>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl px-1 py-2">
            <div>
              <p className="text-sm font-semibold">{item.symbol}</p>
              <p className="text-xs text-subtle">{item.name}</p>
            </div>
            <Sparkline data={item.sparkline} positive={item.changePercent >= 0} />
            <div className="text-right">
              <p className="font-mono-numbers text-sm">
                {formatNumber(item.price, item.price > 50 ? 2 : 4)}
              </p>
              <ChangeText value={item.changePercent} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
