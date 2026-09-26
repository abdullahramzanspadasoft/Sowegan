"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import {
  applyUiTheme,
  getUiTheme,
  saveUiTheme,
  type UiTheme,
} from "@/lib/preferences";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  className,
  showLabel = false,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const [theme, setTheme] = useState<UiTheme>("dark");

  useEffect(() => {
    const current = getUiTheme();
    setTheme(current);
    applyUiTheme(current);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "sowegan.uiTheme") {
        const next = e.newValue === "light" ? "light" : "dark";
        setTheme(next);
        applyUiTheme(next);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function toggle() {
    const next: UiTheme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    saveUiTheme(next);
    window.dispatchEvent(
      new CustomEvent("sowegan-theme", { detail: next }),
    );
  }

  useEffect(() => {
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent<UiTheme>).detail;
      if (detail === "light" || detail === "dark") setTheme(detail);
    };
    window.addEventListener("sowegan-theme", onCustom);
    return () => window.removeEventListener("sowegan-theme", onCustom);
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to day theme" : "Switch to night theme"}
      title={theme === "dark" ? "Day mode" : "Night mode"}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-muted text-muted transition hover:border-border-strong hover:bg-surface-hover hover:text-text",
        showLabel ? "px-3 py-2 text-xs font-medium" : "h-10 w-10",
        className,
      )}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      {showLabel && <span>{theme === "dark" ? "Day" : "Night"}</span>}
    </button>
  );
}
