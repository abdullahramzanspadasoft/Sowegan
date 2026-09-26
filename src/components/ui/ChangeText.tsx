import { cn } from "@/lib/utils";

export function ChangeText({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span
      className={cn(
        "font-mono-numbers text-sm font-semibold",
        positive ? "text-success" : "text-danger",
      )}
    >
      {positive ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
}
