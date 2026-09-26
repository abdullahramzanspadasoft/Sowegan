"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { TradingVisual } from "./TradingVisual";

export function Hero() {
  const { t, locale } = useLanguage();

  return (
    <section className="section-space relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="space-y-7">
            <motion.div
              key={`badge-${locale}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge tone="accent">{t.hero.badge}</Badge>
            </motion.div>

            <motion.h1
              key={`title-${locale}`}
              className="max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              key={`subtitle-${locale}`}
              className="max-w-xl text-base leading-7 text-muted sm:text-lg"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              className="flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button href="/region?next=signup" size="lg" className="w-full sm:w-auto">
                  {t.hero.createAccount}
                  <ArrowRight size={18} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  href="/region?next=login"
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  {t.hero.login}
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {[
                ["120+", t.hero.instruments],
                ["4", t.hero.markets],
                ["24/5", t.hero.coverage],
              ].map(([value, label], index) => (
                <motion.div
                  key={`${label}-${locale}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + index * 0.08 }}
                >
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="mt-1 text-sm text-subtle">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <TradingVisual />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
