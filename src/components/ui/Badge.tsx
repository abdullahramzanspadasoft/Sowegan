import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "success" | "danger" | "warning" | "accent";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-white/5 text-muted border-border",
  success: "bg-success-dim text-success border-success/20",
  danger: "bg-danger-dim text-danger border-danger/20",
  warning: "bg-warning-dim text-warning border-warning/20",
  accent: "bg-accent-dim text-accent border-accent/20",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
