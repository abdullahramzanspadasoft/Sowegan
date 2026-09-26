import { Suspense } from "react";
import type { Metadata } from "next";
import { RegionForm } from "@/components/auth/RegionForm";
import { AuthShell } from "@/components/layout/AuthShell";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Select region",
  description: "Choose your country or region before logging in to Sowegan.",
};

export default function RegionPage() {
  return (
    <Suspense
      fallback={
        <AuthShell title="Select your region" subtitle="Loading region options...">
          <Card className="h-48 animate-pulse bg-surface-muted" />
        </AuthShell>
      }
    >
      <RegionForm />
    </Suspense>
  );
}
