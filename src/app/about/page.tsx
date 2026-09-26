import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Sowegan’s mission, vision, and professional trading platform.",
};

export default function AboutPage() {
  return (
    <MarketingShell>
      <AboutContent />
    </MarketingShell>
  );
}
