import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Sparkline } from "@/components/ui/Sparkline";
import { ChangeText } from "@/components/ui/ChangeText";
import { categoryLabels } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import type { MarketInstrument } from "@/lib/types";

export function MarketCard({ item }: { item: MarketInstrument }) {
  return (
    <Card hover className="h-full">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold">{item.symbol}</p>
          <p className="mt-1 text-sm text-subtle">{item.name}</p>
        </div>
        <Badge>{categoryLabels[item.category]}</Badge>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-mono-numbers text-2xl font-semibold">
            {formatNumber(item.price, item.price > 50 ? 2 : 4)}
          </p>
          <div className="mt-1">
            <ChangeText value={item.changePercent} />
          </div>
        </div>
        <Sparkline data={item.sparkline} positive={item.changePercent >= 0} />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4 text-xs text-subtle">
        <div>
          High
          <p className="mt-1 font-mono-numbers text-sm text-text">
            {formatNumber(item.high, item.high > 50 ? 2 : 4)}
          </p>
        </div>
        <div>
          Low
          <p className="mt-1 font-mono-numbers text-sm text-text">
            {formatNumber(item.low, item.low > 50 ? 2 : 4)}
          </p>
        </div>
        <div>
          Volume
          <p className="mt-1 font-mono-numbers text-sm text-text">{item.volume}</p>
        </div>
      </div>
    </Card>
  );
}
