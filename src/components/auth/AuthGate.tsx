"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth";
import { getTradingMode } from "@/lib/preferences";
import { Card } from "@/components/ui/Card";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const session = authClient.getSession();
    if (!session) {
      router.replace("/region?next=login");
      return;
    }
    if (!getTradingMode()) {
      router.replace("/start-trading");
      return;
    }
    setAllowed(true);
  }, [router]);

  if (!allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-6">
        <Card className="w-full max-w-md text-center">
          <p className="text-sm font-semibold">Checking your session</p>
          <p className="mt-2 text-sm text-muted">
            Redirecting if you still need region, login, or trading setup.
          </p>
        </Card>
      </div>
    );
  }

  return children;
}
