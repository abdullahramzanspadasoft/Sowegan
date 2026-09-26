import { Suspense } from "react";
import { MarketsBoard } from "@/components/dashboard/MarketsBoard";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card } from "@/components/ui/Card";

export default function MarketsPage() {
  return (
    <Suspense
      fallback={
        <DashboardShell title="Markets" subtitle="Loading market board">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="h-48 animate-pulse bg-surface-muted" />
            ))}
          </div>
        </DashboardShell>
      }
    >
      <MarketsBoard />
    </Suspense>
  );
}
