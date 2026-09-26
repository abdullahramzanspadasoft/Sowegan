import { cn } from "@/lib/utils";

export function Sparkline({
  data,
  positive,
  className,
}: {
  data: number[];
  positive: boolean;
  className?: string;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const coords = data.map((value, index) => {
    const x = (index / Math.max(data.length - 1, 1)) * 100;
    const y = 28 - ((value - min) / range) * 22;
    return { x, y };
  });
  const points = coords.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `M ${coords[0]?.x ?? 0},30 L ${points} L ${coords.at(-1)?.x ?? 100},30 Z`;
  const color = positive ? "#34d399" : "#fb7185";
  const fillId = `spark-fill-${positive ? "up" : "down"}`;

  return (
    <svg
      viewBox="0 0 100 32"
      className={cn("h-8 w-24 overflow-visible", className)}
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${fillId})`} />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}
