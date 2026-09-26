import { MarketingShell } from "@/components/layout/MarketingShell";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Benefits } from "@/components/home/Benefits";
import { Instruments } from "@/components/home/Instruments";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <MarketingShell>
      <Hero />
      <Features />
      <Benefits />
      <Instruments />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </MarketingShell>
  );
}
