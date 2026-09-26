"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section className="section-space pt-0">
      <Container>
        <Reveal>
          <motion.div
            className="rounded-3xl border border-border bg-[linear-gradient(135deg,rgba(62,224,176,0.12),rgba(10,18,36,0.9)_42%,rgba(228,197,107,0.08))] px-6 py-12 text-center md:px-12 md:py-16"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.finalCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted">
              {t.finalCta.subtitle}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Button href="/region?next=signup" size="lg">
                  {t.finalCta.getStarted}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Button href="/region?next=login" size="lg" variant="secondary">
                  {t.finalCta.login}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}
