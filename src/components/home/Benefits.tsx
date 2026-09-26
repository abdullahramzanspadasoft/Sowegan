"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { benefits } from "@/lib/data";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function Benefits() {
  const { t } = useLanguage();

  return (
    <section className="section-space pt-0">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {t.benefits.eyebrow}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.benefits.title}
            </h2>
            <p className="text-base leading-7 text-muted">{t.benefits.subtitle}</p>
          </Reveal>
          <Stagger className="grid gap-4" delay={0.1}>
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                  <Card className="flex gap-4">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-dim text-accent">
                      <Check size={16} />
                    </span>
                    <div>
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{benefit.description}</p>
                    </div>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
