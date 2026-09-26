"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          className={index < rating ? "fill-gold text-gold" : "text-subtle"}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const featured = testimonials[active];

  function goTo(index: number, dir: number) {
    setDirection(dir);
    setActive((index + testimonials.length) % testimonials.length);
  }

  function next() {
    goTo(active + 1, 1);
  }

  function prev() {
    goTo(active - 1, -1);
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection(1);
      setActive((current) => (current + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [active]);

  return (
    <section className="section-space relative overflow-hidden pt-0">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <Container>
        <Reveal className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {t.testimonials.eyebrow}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.testimonials.title}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
            <div>
              <p className="font-mono-numbers text-2xl font-semibold text-text">4.9</p>
              <p>avg rating</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="font-mono-numbers text-2xl font-semibold text-text">12k+</p>
              <p>traders</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="font-mono-numbers text-2xl font-semibold text-text">98%</p>
              <p>recommend</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface">
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent via-gold/70 to-transparent" />

            <div className="grid lg:grid-cols-[220px_1fr]">
              <div className="border-b border-border p-4 lg:border-b-0 lg:border-r lg:p-5">
                <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
                  Voices
                </p>
                <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
                  {testimonials.map((item, index) => {
                    const selected = active === index;
                    return (
                      <motion.button
                        key={item.name}
                        type="button"
                        onClick={() => goTo(index, index > active ? 1 : -1)}
                        className={cn(
                          "flex min-w-[180px] items-center gap-3 rounded-2xl px-3 py-3 text-left transition lg:min-w-0",
                          selected
                            ? "bg-accent-dim text-text ring-1 ring-accent/30"
                            : "text-muted hover:bg-white/5 hover:text-text",
                        )}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span
                          className={cn(
                            "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                            selected
                              ? "bg-accent text-[#06231a]"
                              : "bg-surface-muted text-accent",
                          )}
                        >
                          {item.initials}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold">
                            {item.name}
                          </span>
                          <span className="block truncate text-xs text-subtle">
                            {item.market} · {item.role}
                          </span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="relative min-h-[320px] p-6 sm:p-8 lg:p-10">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <Stars rating={featured.rating} />
                  <div className="flex items-center gap-2">
                    <motion.button
                      type="button"
                      onClick={prev}
                      aria-label="Previous review"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted hover:border-accent/40 hover:text-text"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                    >
                      <ChevronLeft size={18} />
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={next}
                      aria-label="Next review"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted hover:border-accent/40 hover:text-text"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                    >
                      <ChevronRight size={18} />
                    </motion.button>
                  </div>
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={featured.name}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 48, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: direction * -36, filter: "blur(6px)" }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  >
                    <p className="max-w-3xl text-2xl font-medium leading-10 tracking-tight text-text sm:text-[1.75rem] sm:leading-[2.6rem]">
                      “{featured.quote}”
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-border pt-6">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(62,224,176,0.25),rgba(228,197,107,0.12))] text-lg font-semibold text-accent ring-1 ring-accent/20">
                        {featured.initials}
                      </span>
                      <div>
                        <p className="text-lg font-semibold">{featured.name}</p>
                        <p className="text-sm text-subtle">
                          {featured.role} · {featured.market}
                        </p>
                      </div>
                      <span className="ml-auto rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
                        {active + 1} / {testimonials.length}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 h-1 overflow-hidden rounded-full bg-border">
                  <motion.div
                    key={`progress-${featured.name}`}
                    className="h-full rounded-full bg-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
