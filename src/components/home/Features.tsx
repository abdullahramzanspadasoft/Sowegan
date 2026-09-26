"use client";

import { BarChart3, Globe2, LayoutDashboard, Lock, Smartphone, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { features } from "@/lib/data";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const icons = [Globe2, LayoutDashboard, BarChart3, Lock, Smartphone, Zap];

export function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="section-space">
      <Container>
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {t.features.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.features.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">{t.features.subtitle}</p>
        </Reveal>
        <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <StaggerItem key={feature.title}>
                <motion.div
                  whileHover={{
                    y: -10,
                    rotateX: 2,
                    boxShadow: "0 24px 50px rgba(62,224,176,0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  style={{ transformPerspective: 900 }}
                >
                  <Card hover className="h-full">
                    <motion.div
                      className="mb-5 inline-flex rounded-xl bg-accent-dim p-3 text-accent"
                      whileHover={{ rotate: -8, scale: 1.08 }}
                    >
                      <Icon size={22} />
                    </motion.div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{feature.description}</p>
                  </Card>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
