import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <MarketingShell>
      <section className="section-space">
        <Container>
          <Card className="mx-auto max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold">Terms & Conditions</h1>
            <p className="text-sm leading-7 text-muted">
              These terms describe the simulated Sowegan frontend experience. Market
              prices, balances, and transactions shown in this product are mock data
              for interface demonstration and do not constitute an offer to trade
              real financial instruments.
            </p>
            <p className="text-sm leading-7 text-muted">
              By creating an account in this demo, you agree that no live brokerage,
              custody, or payment services are provided. Always review a licensed
              provider’s legal documents before trading with real funds.
            </p>
          </Card>
        </Container>
      </section>
    </MarketingShell>
  );
}
