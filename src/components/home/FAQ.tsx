"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { faqs } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function FAQ() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section-space pt-0">
      <Container>
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {t.faq.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.faq.title}
          </h2>
        </Reveal>
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((item, index) => {
            const active = open === index;
            return (
              <Reveal key={item.question} delay={index * 0.04}>
                <Card padding="none">
                  <button
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
                    onClick={() => setOpen(active ? -1 : index)}
                    aria-expanded={active}
                  >
                    <span className="font-semibold">{item.question}</span>
                    <motion.span
                      animate={{ rotate: active ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 text-subtle"
                    >
                      <ChevronDown size={18} className={cn(active && "text-accent")} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-border px-5 py-4 text-sm leading-7 text-muted md:px-6">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
