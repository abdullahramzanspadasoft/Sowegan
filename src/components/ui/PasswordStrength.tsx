import { cn } from "@/lib/utils";
import { getPasswordStrength } from "@/lib/utils";

export function PasswordStrength({ password }: { password: string }) {
  const { score, label, tone } = getPasswordStrength(password);
  const bars = [1, 2, 3, 4];

  const toneClass =
    tone === "danger"
      ? "bg-danger"
      : tone === "warning"
        ? "bg-warning"
        : tone === "success"
          ? "bg-success"
          : "bg-border-strong";

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-1.5">
        {bars.map((bar) => (
          <span
            key={bar}
            className={cn(
              "h-1.5 rounded-full transition-colors",
              score >= bar ? toneClass : "bg-border",
            )}
          />
        ))}
      </div>
      <p className="text-xs text-subtle">
        {password
          ? `Password strength: ${label}`
          : "Use 8+ characters with mixed case, a number, and a symbol."}
      </p>
    </div>
  );
}
