"use client";

import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { languages } from "@/lib/i18n/languages";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  variant?: "nav" | "mobile";
};

export function LanguageSwitcher({ variant = "nav" }: LanguageSwitcherProps) {
  const { locale, setLocale, code, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.language}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full text-sm font-medium transition",
          variant === "nav"
            ? "relative z-10 px-3 py-2 text-muted hover:bg-white/8 hover:text-text"
            : "w-full justify-between border border-border px-3 py-3 text-muted hover:border-accent/30 hover:text-text",
        )}
      >
        <span className="inline-flex items-center gap-1.5">
          <Globe size={15} className="opacity-80" />
          <span>{code}</span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            aria-label={t.nav.language}
            className={cn(
              "z-50 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_60px_rgba(0,0,0,0.35)]",
              variant === "nav"
                ? "absolute right-0 top-[calc(100%+10px)] w-[min(92vw,420px)] p-3"
                : "relative mt-3 w-full p-3",
            )}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
          >
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
              {languages.map((language) => {
                const active = language.available && language.locale === locale;
                const disabled = !language.available;

                return (
                  <button
                    key={language.code}
                    type="button"
                    role="option"
                    aria-selected={active}
                    disabled={disabled}
                    onClick={() => {
                      if (!language.available || !language.locale) return;
                      setLocale(language.locale);
                      setOpen(false);
                    }}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-left transition",
                      active && "bg-accent/15 text-accent",
                      !active && !disabled && "text-text hover:bg-white/6",
                      disabled && "cursor-not-allowed text-subtle",
                    )}
                  >
                    <span className="block text-sm font-medium leading-5">
                      {language.nativeLabel}
                    </span>
                    {disabled && (
                      <span className="mt-0.5 block text-[11px] text-subtle">
                        {t.nav.comingSoon}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
