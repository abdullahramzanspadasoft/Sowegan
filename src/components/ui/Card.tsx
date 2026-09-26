import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLElement> & {
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
};

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
};

export function Card({
  padding = "md",
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-surface shadow-[0_10px_30px_rgba(0,0,0,0.16)]",
        paddings[padding],
        hover && "transition duration-200 hover:border-border-strong hover:bg-surface-hover",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
