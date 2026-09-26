"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { marketingNav } from "@/lib/data";
import { authClient } from "@/lib/auth";
import { getTradingMode } from "@/lib/preferences";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tradeHref, setTradeHref] = useState("/start-trading");
  const [activeHref, setActiveHref] = useState(marketingNav[0]?.href ?? "");
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const { scrollY } = useScroll();

  const navItems = [
    { href: "/#markets", label: t.nav.markets },
    { href: "/#features", label: t.nav.platform },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  useEffect(() => {
    const sync = () => {
      setLoggedIn(Boolean(authClient.getSession()));
      setTradeHref(getTradingMode() ? "/dashboard" : "/start-trading");
    };
    sync();
    window.addEventListener("focus", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("focus", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    const ids = marketingNav
      .map((item) => (item.href.startsWith("/#") ? item.href.slice(2) : null))
      .filter(Boolean) as string[];

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveHref(`/#${visible.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background,border,box-shadow] duration-300",
        scrolled
          ? "border-border/70 bg-bg/90 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 22 }}
    >
      <Container className="flex h-[72px] items-center justify-between gap-4 lg:h-20">
        <div className="min-w-0 shrink-0">
          <Logo />
        </div>

        <LayoutGroup id="center-nav">
          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 rounded-full border border-border bg-surface/85 px-1.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md lg:flex"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {navItems.map((item) => {
              const isActive = activeHref === item.href;
              const isHovered = hoveredHref === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredHref(item.href)}
                  className={cn(
                    "relative z-10 inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive || isHovered ? "text-text" : "text-muted",
                  )}
                >
                  {(isActive || isHovered) && (
                    <motion.span
                      layoutId="center-nav-pill"
                      className="absolute inset-0 rounded-full bg-accent-dim"
                      transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {(item.href === "/about" || item.href === "/#features") && (
                    <ChevronDown size={14} className="relative z-10 opacity-60" />
                  )}
                </Link>
              );
            })}
            <div className="mx-0.5 h-5 w-px bg-border" />
            <LanguageSwitcher />
          </nav>
        </LayoutGroup>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <ThemeToggle />
          <AnimatePresence mode="wait" initial={false}>
            {loggedIn ? (
              <motion.div
                key="trade"
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Button
                  href={tradeHref}
                  className="rounded-full px-6 shadow-[0_10px_28px_rgba(62,224,176,0.22)]"
                >
                  {t.nav.tradeNow}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="guest"
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Button href="/region?next=login" variant="ghost" className="rounded-full">
                  {t.nav.login}
                </Button>
                <Button href="/region?next=signup" className="rounded-full px-5">
                  {t.nav.signUp}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          className="rounded-xl p-2 text-muted transition hover:bg-surface-muted hover:text-text lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          whileTap={{ scale: 0.92 }}
        >
          {open ? <X /> : <Menu />}
        </motion.button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-border bg-bg-elevated/96 backdrop-blur-xl lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          >
            <Container className="flex flex-col gap-2 overflow-hidden py-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-muted hover:bg-surface-muted hover:text-text"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-2 space-y-3 border-t border-border pt-4">
                <div className="flex items-center justify-between gap-3 px-1">
                  <span className="text-xs text-subtle">Theme</span>
                  <ThemeToggle showLabel />
                </div>
                <LanguageSwitcher variant="mobile" />
                {loggedIn ? (
                  <Button href={tradeHref} fullWidth className="rounded-full">
                    {t.nav.tradeNow}
                  </Button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      href="/region?next=login"
                      variant="secondary"
                      fullWidth
                      className="rounded-full"
                    >
                      {t.nav.login}
                    </Button>
                    <Button href="/region?next=signup" fullWidth className="rounded-full">
                      {t.nav.signUp}
                    </Button>
                  </div>
                )}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
