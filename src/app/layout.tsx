import type { Metadata } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeInit } from "@/components/layout/ThemeInit";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Sowegan | Professional Multi-Asset Trading Platform",
    template: "%s | Sowegan",
  },
  description:
    "Sowegan is a professional trading workspace for forex, crypto, commodities, and indices. Monitor markets, manage your book, and trade with institutional clarity.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${jakarta.variable} ${plex.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("sowegan.uiTheme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}var l=localStorage.getItem("sowegan.locale");if(l==="en"||l==="ko"||l==="sw"){document.documentElement.lang=l;document.documentElement.dataset.locale=l;}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-bg text-text">
        <ThemeInit />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
