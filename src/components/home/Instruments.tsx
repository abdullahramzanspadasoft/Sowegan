"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Sparkline } from "@/components/ui/Sparkline";
import { ChangeText } from "@/components/ui/ChangeText";
import { markets, categoryLabels } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import type { AssetClass } from "@/lib/types";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const categories: AssetClass[] = ["forex", "crypto", "commodities", "indices"];

export function Instruments() {
  const { t } = useLanguage();

  return (
    <section id="markets" className="section-space">
      <Container>
        <Reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {t.instruments.eyebrow}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.instruments.title}
            </h2>
          </div>
          <Link
            href="/dashboard/markets"
            className="text-sm font-semibold text-accent hover:text-accent-hover"
          >
            View all markets
          </Link>
        </Reveal>
        <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => {
            const items = markets.filter((item) => item.category === category).slice(0, 3);
            return (
              <StaggerItem key={category}>
                <motion.div whileHover={{ y: -6 }} className="h-full">
                  <Card className="h-full space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{categoryLabels[category]}</h3>
                      <Badge>{items.length}+ listed</Badge>
                    </div>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-3"
                        >
                          <div>
                            <p className="text-sm font-semibold">{item.symbol}</p>
                            <ChangeText value={item.changePercent} />
                          </div>
                          <div className="text-right">
                            <p className="font-mono-numbers text-sm">
                              {formatNumber(item.price, item.price > 50 ? 2 : 4)}
                            </p>
                            <Sparkline
                              data={item.sparkline}
                              positive={item.changePercent >= 0}
                              className="ml-auto h-6 w-16"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
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
