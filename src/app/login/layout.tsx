import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
  description: "Access your Sowegan trading workspace.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
