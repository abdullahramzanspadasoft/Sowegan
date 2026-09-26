"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { stats } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";

function AnimatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(value);
  const numeric = Number(value.replace(/[^\d.]/g, ""));
  const isNumeric = !Number.isNaN(numeric) && /\d/.test(value);

  useEffect(() => {
    if (!inView || !isNumeric) {
      setDisplay(value);
      return;
    }
    const suffix = value.replace(/[\d.]/g, "");
    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.round(numeric * progress);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setDisplay(value);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, isNumeric, numeric, value]);

  return (
    <p ref={ref} className="text-3xl font-semibold tracking-tight sm:text-4xl">
      {display}
    </p>
  );
}

export function Stats() {
  return (
    <section className="section-space pt-0">
      <Container>
        <Reveal>
          <motion.div
            className="grid gap-6 rounded-3xl border border-border bg-surface px-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-10"
            whileInView={{ boxShadow: "0 20px 60px rgba(62,224,176,0.08)" }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center lg:text-left"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <AnimatedValue value={stat.value} />
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}
