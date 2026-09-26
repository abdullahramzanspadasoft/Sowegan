export type RegionOption = {
  code: string;
  name: string;
};

export const regions: RegionOption[] = [
  { code: "PK", name: "Pakistan" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "IN", name: "India" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
  { code: "DE", name: "Germany" },
  { code: "TR", name: "Turkey" },
];

export type TradingMode = "demo" | "real";

const REGION_KEY = "sowegan.region";
const TRADING_MODE_KEY = "sowegan.tradingMode";

export function saveRegion(code: string, name?: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(REGION_KEY, code);
  if (name) window.localStorage.setItem(`${REGION_KEY}.name`, name);
}

export function getRegion(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(REGION_KEY);
}

export function getRegionOption() {
  const code = getRegion();
  if (!code) return null;
  if (typeof window !== "undefined") {
    const storedName = window.localStorage.getItem(`${REGION_KEY}.name`);
    if (storedName) return { code, name: storedName };
  }
  return regions.find((item) => item.code === code) ?? { code, name: code };
}

export function getRegionLabel(): string | null {
  return getRegionOption()?.name ?? null;
}

export function saveTradingMode(mode: TradingMode) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TRADING_MODE_KEY, mode);
}

export function getTradingMode(): TradingMode | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(TRADING_MODE_KEY);
  return value === "demo" || value === "real" ? value : null;
}

export function clearTradingPreferences() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TRADING_MODE_KEY);
  window.localStorage.removeItem(CFD_VIEW_MODE_KEY);
  window.localStorage.removeItem(DERIV_KEY);
  window.localStorage.removeItem("sowegan.featuredActivations");
}

export type TradeProfile = {
  fullName: string;
  idCard: string;
  licenseNumber: string;
  nationality: string;
  address: string;
  completed: boolean;
};

const TRADE_PROFILE_KEY = "sowegan.tradeProfile";
const CFD_VIEW_MODE_KEY = "sowegan.cfdViewMode";

export const emptyTradeProfile: TradeProfile = {
  fullName: "",
  idCard: "",
  licenseNumber: "",
  nationality: "",
  address: "",
  completed: false,
};

export const demoTradeProfile: TradeProfile = {
  fullName: "Alex Morgan",
  idCard: "ID-48291-SWG",
  licenseNumber: "LIC-778201-DEMO",
  nationality: "Pakistan",
  address: "12 Market Street, Karachi",
  completed: true,
};

export function getTradeProfile(): TradeProfile {
  if (typeof window === "undefined") return emptyTradeProfile;
  try {
    const raw = window.localStorage.getItem(TRADE_PROFILE_KEY);
    if (!raw) return emptyTradeProfile;
    return { ...emptyTradeProfile, ...JSON.parse(raw) } as TradeProfile;
  } catch {
    return emptyTradeProfile;
  }
}

export function saveTradeProfile(profile: TradeProfile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TRADE_PROFILE_KEY, JSON.stringify(profile));
}

export function getProfileProgress(profile: TradeProfile) {
  const fields = [
    profile.fullName,
    profile.idCard,
    profile.licenseNumber,
    profile.nationality,
    profile.address,
  ];
  const filled = fields.filter((value) => value.trim().length > 0).length;
  return Math.round((filled / fields.length) * 100);
}

export function getCfdViewMode(): TradingMode {
  if (typeof window === "undefined") return "demo";
  const value = window.localStorage.getItem(CFD_VIEW_MODE_KEY);
  return value === "real" ? "real" : "demo";
}

export function saveCfdViewMode(mode: TradingMode) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CFD_VIEW_MODE_KEY, mode);
}

export type DerivConnection = {
  connected: boolean;
  loginId: string;
  email: string;
  connectedAt: number;
};

const DERIV_KEY = "sowegan.derivConnection";

export function getDerivConnection(): DerivConnection | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DERIV_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DerivConnection;
  } catch {
    return null;
  }
}

export function saveDerivConnection(connection: DerivConnection) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DERIV_KEY, JSON.stringify(connection));
}

export function clearDerivConnection() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DERIV_KEY);
}

/** Switch app into Real mode (same UI as demo) and persist CFD view */
export function activateRealTradingMode() {
  saveTradingMode("real");
  saveCfdViewMode("real");
}

export type FeaturedId = "gold" | "tv";

export type FeaturedActivations = {
  gold: boolean;
  tv: boolean;
};

const FEATURED_KEY = "sowegan.featuredActivations";

export function getFeaturedActivations(): FeaturedActivations {
  if (typeof window === "undefined") return { gold: false, tv: false };
  try {
    const raw = window.localStorage.getItem(FEATURED_KEY);
    if (!raw) return { gold: false, tv: false };
    const parsed = JSON.parse(raw) as Partial<FeaturedActivations>;
    return {
      gold: Boolean(parsed.gold),
      tv: Boolean(parsed.tv),
    };
  } catch {
    return { gold: false, tv: false };
  }
}

export function saveFeaturedActivation(id: FeaturedId, active = true) {
  if (typeof window === "undefined") return;
  const next = { ...getFeaturedActivations(), [id]: active };
  window.localStorage.setItem(FEATURED_KEY, JSON.stringify(next));
}

export type UiTheme = "dark" | "light";

const UI_THEME_KEY = "sowegan.uiTheme";

export function getUiTheme(): UiTheme {
  if (typeof window === "undefined") return "dark";
  return window.localStorage.getItem(UI_THEME_KEY) === "light" ? "light" : "dark";
}

export function saveUiTheme(theme: UiTheme) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(UI_THEME_KEY, theme);
  applyUiTheme(theme);
}

export function applyUiTheme(theme: UiTheme) {
  if (typeof window === "undefined") return;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

