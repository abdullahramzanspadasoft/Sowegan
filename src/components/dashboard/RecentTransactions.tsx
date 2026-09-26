import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { transactions } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const tone = {
  completed: "success",
  pending: "warning",
  failed: "danger",
} as const;

export function RecentTransactions() {
  return (
    <Card>
      <h2 className="mb-5 text-lg font-semibold">Recent transactions</h2>
      <div className="space-y-3">
        {transactions.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 rounded-xl border border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-semibold capitalize">{item.type} · {item.instrument}</p>
              <p className="text-xs text-subtle">{item.date}{item.quantity ? ` · ${item.quantity}` : ""}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-mono-numbers text-sm font-semibold">
                {item.type === "withdrawal" || item.type === "buy" ? "-" : "+"}
                {formatCurrency(item.amount)}
              </p>
              <Badge tone={tone[item.status]}>{item.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
