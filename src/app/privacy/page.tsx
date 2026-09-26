import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <MarketingShell>
      <section className="section-space">
        <Container>
          <Card className="mx-auto max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold">Privacy Policy</h1>
            <p className="text-sm leading-7 text-muted">
              Sowegan’s frontend demo stores form input in the browser only for the
              duration of the session. No personal data is sent to a live backend,
              payment processor, or brokerage system.
            </p>
            <p className="text-sm leading-7 text-muted">
              In a production environment, account data would be protected with
              encryption in transit, access controls, and a documented retention
              policy.
            </p>
          </Card>
        </Container>
      </section>
    </MarketingShell>
  );
}
