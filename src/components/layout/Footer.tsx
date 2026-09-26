"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  const columns = [
    {
      title: t.footer.platform,
      links: [
        { href: "/#markets", label: t.footer.markets },
        { href: "/dashboard", label: t.footer.dashboard },
        { href: "/#features", label: t.footer.features },
        { href: "/#how-it-works", label: t.footer.howItWorks },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { href: "/about", label: t.footer.about },
        { href: "/contact", label: t.footer.contact },
        { href: "/#faq", label: t.footer.faq },
      ],
    },
    {
      title: t.footer.account,
      links: [
        { href: "/region?next=login", label: t.footer.login },
        { href: "/region?next=signup", label: t.footer.register },
        { href: "/forgot-password", label: t.footer.resetPassword },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { href: "/terms", label: t.footer.terms },
        { href: "/privacy", label: t.footer.privacy },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-bg-elevated">
      <Container className="py-14 lg:py-16">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
            <div className="max-w-sm space-y-5">
              <Logo />
              <p className="text-sm leading-6 text-muted">{t.footer.blurb}</p>
            </div>
            <Stagger className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {columns.map((column) => (
                <StaggerItem key={column.title}>
                  <p className="mb-4 text-sm font-semibold text-text">{column.title}</p>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted transition hover:text-text"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-subtle md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} Sowegan. {t.footer.rights}
            </p>
            <p className="max-w-2xl leading-6">
              Market data shown here is simulated for demonstration. Trading involves
              risk and is not suitable for every investor.
            </p>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
