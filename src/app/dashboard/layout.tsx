import type { Metadata } from "next";
import { AuthGate } from "@/components/auth/AuthGate";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Sowegan trading workspace, markets, and account settings.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AuthGate>{children}</AuthGate>;
}
