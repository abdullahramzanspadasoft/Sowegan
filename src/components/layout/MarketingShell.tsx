"use client";

import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingSupport } from "./FloatingSupport";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col page-grid">
        <Navbar />
        <main className="flex-1 pt-20 lg:pt-24">{children}</main>
        <Footer />
        <FloatingSupport />
      </div>
    </LanguageProvider>
  );
}
