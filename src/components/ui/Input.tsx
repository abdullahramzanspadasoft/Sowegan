import { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
};

export function Input({
  label,
  hint,
  error,
  leftIcon,
  rightSlot,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block space-y-2" htmlFor={inputId}>
      {label && (
        <span className="block text-sm font-medium text-text">{label}</span>
      )}
      <span className="relative block">
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-subtle">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            "h-12 w-full rounded-xl border bg-surface-muted px-4 text-sm text-text placeholder:text-subtle transition-colors duration-200",
            "focus:border-accent/50 focus:outline-none focus:ring-4 focus:ring-accent/10",
            leftIcon ? "pl-11" : undefined,
            rightSlot ? "pr-12" : undefined,
            error ? "border-danger/50" : "border-border",
            className,
          )}
          {...props}
        />
        {rightSlot && (
          <span className="absolute inset-y-0 right-2 flex items-center">
            {rightSlot}
          </span>
        )}
      </span>
      {error ? (
        <span className="block text-sm text-danger">{error}</span>
      ) : hint ? (
        <span className="block text-sm text-subtle">{hint}</span>
      ) : null}
    </label>
  );
}
