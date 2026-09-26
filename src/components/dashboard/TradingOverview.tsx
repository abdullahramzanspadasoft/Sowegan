import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function TradingOverview() {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Trading overview</h2>
          <p className="mt-1 text-sm text-subtle">Simulated 7-day performance</p>
        </div>
        <Badge tone="accent">Equity curve</Badge>
      </div>
      <svg viewBox="0 0 640 220" className="h-48 w-full" aria-hidden>
        <defs>
          <linearGradient id="eq" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3ee0b0" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#3ee0b0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 160 C 70 150, 110 120, 160 128 S 250 180, 310 130 S 410 70, 470 90 S 560 140, 640 78 L 640 220 L 0 220 Z"
          fill="url(#eq)"
        />
        <path
          d="M0 160 C 70 150, 110 120, 160 128 S 250 180, 310 130 S 410 70, 470 90 S 560 140, 640 78"
          fill="none"
          stroke="#3ee0b0"
          strokeWidth="2.8"
        />
      </svg>
      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-subtle">Open positions</p>
          <p className="mt-1 font-semibold">8</p>
        </div>
        <div>
          <p className="text-subtle">Win rate</p>
          <p className="mt-1 font-semibold">62.4%</p>
        </div>
        <div>
          <p className="text-subtle">Day P/L</p>
          <p className="mt-1 font-semibold text-success">+$2,684</p>
        </div>
      </div>
    </Card>
  );
}
