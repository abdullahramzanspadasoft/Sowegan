import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  size = "md",
}: {
  href?: string;
  size?: "sm" | "md" | "lg";
}) {
  const mark = size === "lg" ? "h-11 w-11" : size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-lg" : "text-xl";

  return (
    <Link href={href} className="inline-flex items-center gap-3">
      <span
        className={cn(
          "relative inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,#14324a,#0e1d33_55%,#10283a)] ring-1 ring-accent/30",
          mark,
        )}
      >
        <svg viewBox="0 0 32 32" className="h-[62%] w-[62%]" aria-hidden>
          <path
            d="M8 21.5c0-3.4 2.4-5 7.2-6.1 3.2-.7 4.3-1.3 4.3-2.6 0-1.4-1.3-2.3-3.6-2.3-2.4 0-3.8.9-4.5 2.4"
            fill="none"
            stroke="#3ee0b0"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M24 10.8c0 3.5-2.5 5.1-7.4 6.3-3.1.7-4.2 1.4-4.2 2.7 0 1.5 1.4 2.4 3.7 2.4 2.6 0 4.1-1 4.8-2.6"
            fill="none"
            stroke="#e4c56b"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className={cn("font-semibold tracking-tight text-text", text)}>
        Sowegan
      </span>
    </Link>
  );
}
