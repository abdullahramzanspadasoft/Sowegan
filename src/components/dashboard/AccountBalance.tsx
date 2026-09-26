import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";

export function AccountBalance() {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Account equity</p>
          <p className="mt-3 font-mono-numbers text-3xl font-semibold tracking-tight sm:text-4xl">
            {formatCurrency(128430.62)}
          </p>
          <p className="mt-2 text-sm text-success">+2.14% today</p>
        </div>
        <span className="rounded-xl bg-accent-dim p-3 text-accent">
          <Wallet size={20} />
        </span>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-surface-muted p-4">
          <p className="text-xs text-subtle">Available</p>
          <p className="mt-2 font-mono-numbers text-lg font-semibold">{formatCurrency(96410.18)}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface-muted p-4">
          <p className="text-xs text-subtle">Used margin</p>
          <p className="mt-2 font-mono-numbers text-lg font-semibold">{formatCurrency(32020.44)}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-1 text-sm text-success">
          <ArrowUpRight size={16} /> Deposits enabled
        </span>
        <span className="inline-flex items-center gap-1 text-sm text-muted">
          <ArrowDownRight size={16} /> Withdrawals 1-2 days
        </span>
      </div>
    </Card>
  );
}
