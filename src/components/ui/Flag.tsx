type FlagProps = {
  code: string;
  name: string;
  className?: string;
  size?: "sm" | "md";
};

export function Flag({ code, name, className = "", size = "md" }: FlagProps) {
  const lower = code.toLowerCase();
  const dims = size === "sm" ? "h-5 w-7" : "h-6 w-9";

  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden rounded-[4px] border border-white/10 bg-surface shadow-sm ${dims} ${className}`}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://flagcdn.com/w80/${lower}.png`}
        srcSet={`https://flagcdn.com/w40/${lower}.png 1x, https://flagcdn.com/w80/${lower}.png 2x`}
        alt=""
        width={size === "sm" ? 28 : 36}
        height={size === "sm" ? 20 : 24}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        title={name}
      />
    </span>
  );
}
