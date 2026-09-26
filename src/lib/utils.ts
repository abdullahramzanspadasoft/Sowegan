export function cn(...classes: Array<string | number | boolean | null | undefined>) {
  return classes.filter((value): value is string => typeof value === "string" && value.length > 0).join(" ");
}

export function formatCurrency(
  value: number,
  options: { currency?: string; compact?: boolean } = {},
) {
  const { currency = "USD", compact = false } = options;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 2 : value >= 100 ? 2 : 4,
  }).format(value);
}

export function formatPercent(value: number, digits = 2) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

export function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (!password) {
    return { score: 0, label: "", tone: "neutral" as const };
  }
  if (score <= 2) {
    return { score, label: "Weak", tone: "danger" as const };
  }
  if (score === 3) {
    return { score, label: "Fair", tone: "warning" as const };
  }
  if (score === 4) {
    return { score, label: "Good", tone: "success" as const };
  }
  return { score, label: "Strong", tone: "success" as const };
}
