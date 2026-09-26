"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { howItWorks } from "@/lib/data";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="section-space pt-0">
      <Container>
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {t.howItWorks.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.howItWorks.title}
          </h2>
        </Reveal>
        <Stagger className="grid gap-5 lg:grid-cols-3">
          {howItWorks.map((item) => (
            <StaggerItem key={item.step}>
              <motion.div whileHover={{ y: -6 }} className="h-full">
                <Card className="h-full">
                  <p className="font-mono-numbers text-sm text-gold">{item.step}</p>
                  <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
