import { MarketingShell } from "@/components/layout/MarketingShell";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <MarketingShell>
      <section className="section-space">
        <Container>
          <Card className="mx-auto max-w-lg py-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">404</p>
            <h1 className="mt-4 text-3xl font-semibold">Page not found</h1>
            <p className="mt-3 text-sm leading-6 text-muted">
              The page you requested is not part of the Sowegan workspace.
            </p>
            <div className="mt-6 flex justify-center">
              <Button href="/">Back home</Button>
            </div>
          </Card>
        </Container>
      </section>
    </MarketingShell>
  );
}
