import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start trading",
  description: "Choose demo or real trading to open your Sowegan workspace.",
};

export default function StartTradingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
