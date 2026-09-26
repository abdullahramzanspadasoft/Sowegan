import { cn } from "@/lib/utils";

export function Alert({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "success" | "error";
  title: string;
  children?: React.ReactNode;
}) {
  const styles = {
    info: "border-border bg-surface-muted text-muted",
    success: "border-success/25 bg-success-dim text-success",
    error: "border-danger/25 bg-danger-dim text-danger",
  };

  return (
    <div className={cn("rounded-xl border px-4 py-3", styles[tone])} role="status">
      <p className="text-sm font-semibold">{title}</p>
      {children && <p className="mt-1 text-sm opacity-90">{children}</p>}
    </div>
  );
}
