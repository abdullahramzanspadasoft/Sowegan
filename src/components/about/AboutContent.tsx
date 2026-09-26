"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { stats } from "@/lib/data";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const values = [
  {
    title: "Clarity first",
    body: "Markets are complex enough. Sowegan presents prices, movement, and account context without visual clutter.",
  },
  {
    title: "Multi-asset by design",
    body: "Forex, crypto, commodities, and indices live in one system with consistent cards, tables, and watchlists.",
  },
  {
    title: "Professional craft",
    body: "Spacing, typography, and interaction design are treated as part of trust — not decoration.",
  },
];

export function AboutContent() {
  return (
    <section className="section-space">
      <Container className="space-y-16">
        <Reveal className="max-w-3xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            About Sowegan
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            A trading platform designed to feel trustworthy from the first screen.
          </h1>
          <p className="text-lg leading-8 text-muted">
            Sowegan is a modern multi-asset workspace for traders who want
            institutional presentation without an institutional learning curve.
            We built the product around readability, market coverage, and a
            dashboard that behaves like a professional desk.
          </p>
        </Reveal>

        <Stagger className="grid gap-5 lg:grid-cols-2">
          {[
            {
              label: "Mission",
              title: "Make global markets easier to read and act on.",
              body: "Our mission is to give independent traders a calm, high-quality environment for following prices, managing activity, and keeping account details in one place.",
            },
            {
              label: "Vision",
              title: "Become the independent standard for multi-asset trading UX.",
              body: "We want Sowegan to be the platform people recommend when they need a serious interface that still feels considered, modern, and human.",
            },
          ].map((item) => (
            <StaggerItem key={item.label}>
              <motion.div whileHover={{ y: -4 }} className="h-full">
                <Card className="h-full">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
                    {item.label}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-muted">{item.body}</p>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        <div>
          <Reveal>
            <h2 className="mb-6 text-2xl font-semibold">What the platform stands for</h2>
          </Reveal>
          <Stagger className="grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <motion.div whileHover={{ y: -4 }} className="h-full">
                  <Card className="h-full">
                    <h3 className="text-lg font-semibold">{value.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{value.body}</p>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal>
          <div className="grid gap-6 rounded-3xl border border-border bg-surface px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <p className="text-3xl font-semibold">{stat.value}</p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
