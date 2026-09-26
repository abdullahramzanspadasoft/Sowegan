"use client";

import { useEffect } from "react";
import { getUiTheme, applyUiTheme } from "@/lib/preferences";

/** Apply saved theme before paint flash on client navigation */
export function ThemeInit() {
  useEffect(() => {
    applyUiTheme(getUiTheme());
  }, []);
  return null;
}
