import type {
  FaqItem,
  MarketInstrument,
  NavItem,
  Testimonial,
  Transaction,
} from "./types";

export const marketingNav: NavItem[] = [
  { href: "/#markets", label: "Markets" },
  { href: "/#features", label: "Platform" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const dashboardNav: NavItem[] = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/markets", label: "Markets" },
  { href: "/dashboard/profile", label: "Profile" },
];

export const markets: MarketInstrument[] = [
  {
    id: "eurusd",
    symbol: "EUR/USD",
    name: "Euro / US Dollar",
    category: "forex",
    price: 1.0874,
    change: 0.0021,
    changePercent: 0.19,
    high: 1.0892,
    low: 1.0841,
    volume: "184.2B",
    sparkline: [1.082, 1.0834, 1.0819, 1.0846, 1.0861, 1.0852, 1.0874],
  },
  {
    id: "gbpusd",
    symbol: "GBP/USD",
    name: "British Pound / US Dollar",
    category: "forex",
    price: 1.3148,
    change: -0.0042,
    changePercent: -0.32,
    high: 1.3211,
    low: 1.3126,
    volume: "96.4B",
    sparkline: [1.319, 1.321, 1.3184, 1.3162, 1.3151, 1.317, 1.3148],
  },
  {
    id: "usdjpy",
    symbol: "USD/JPY",
    name: "US Dollar / Japanese Yen",
    category: "forex",
    price: 148.62,
    change: 0.41,
    changePercent: 0.28,
    high: 148.91,
    low: 147.88,
    volume: "112.8B",
    sparkline: [147.9, 148.1, 148.42, 148.18, 148.55, 148.4, 148.62],
  },
  {
    id: "audusd",
    symbol: "AUD/USD",
    name: "Australian Dollar / US Dollar",
    category: "forex",
    price: 0.6712,
    change: 0.0018,
    changePercent: 0.27,
    high: 0.6734,
    low: 0.6681,
    volume: "41.6B",
    sparkline: [0.6684, 0.6691, 0.6702, 0.6696, 0.6718, 0.6708, 0.6712],
  },
  {
    id: "usdcad",
    symbol: "USD/CAD",
    name: "US Dollar / Canadian Dollar",
    category: "forex",
    price: 1.3526,
    change: -0.0011,
    changePercent: -0.08,
    high: 1.3562,
    low: 1.3504,
    volume: "38.1B",
    sparkline: [1.354, 1.3552, 1.3538, 1.3546, 1.3521, 1.353, 1.3526],
  },
  {
    id: "nzdusd",
    symbol: "NZD/USD",
    name: "New Zealand Dollar / US Dollar",
    category: "forex",
    price: 0.6124,
    change: 0.0026,
    changePercent: 0.43,
    high: 0.6141,
    low: 0.6088,
    volume: "18.7B",
    sparkline: [0.609, 0.6098, 0.6112, 0.6104, 0.6128, 0.6119, 0.6124],
  },
  {
    id: "btc",
    symbol: "BTC/USD",
    name: "Bitcoin",
    category: "crypto",
    price: 68420,
    change: 1240,
    changePercent: 1.84,
    high: 69110,
    low: 66840,
    volume: "28.4B",
    sparkline: [66200, 66840, 67120, 67980, 67640, 68210, 68420],
  },
  {
    id: "eth",
    symbol: "ETH/USD",
    name: "Ethereum",
    category: "crypto",
    price: 2684.5,
    change: -38.2,
    changePercent: -1.4,
    high: 2748.1,
    low: 2651.4,
    volume: "14.9B",
    sparkline: [2740, 2722, 2698, 2710, 2674, 2661, 2684.5],
  },
  {
    id: "sol",
    symbol: "SOL/USD",
    name: "Solana",
    category: "crypto",
    price: 178.42,
    change: 6.18,
    changePercent: 3.59,
    high: 181.2,
    low: 169.8,
    volume: "4.2B",
    sparkline: [169.8, 171.4, 174.2, 172.8, 176.1, 177.4, 178.42],
  },
  {
    id: "xrp",
    symbol: "XRP/USD",
    name: "Ripple",
    category: "crypto",
    price: 0.6284,
    change: 0.0142,
    changePercent: 2.31,
    high: 0.634,
    low: 0.608,
    volume: "2.1B",
    sparkline: [0.608, 0.612, 0.618, 0.615, 0.624, 0.621, 0.6284],
  },
  {
    id: "ada",
    symbol: "ADA/USD",
    name: "Cardano",
    category: "crypto",
    price: 0.4521,
    change: -0.0084,
    changePercent: -1.82,
    high: 0.468,
    low: 0.446,
    volume: "890M",
    sparkline: [0.468, 0.461, 0.457, 0.454, 0.459, 0.448, 0.4521],
  },
  {
    id: "gold",
    symbol: "XAU/USD",
    name: "Gold",
    category: "commodities",
    price: 2648.3,
    change: 18.7,
    changePercent: 0.71,
    high: 2656.4,
    low: 2621.8,
    volume: "62.3B",
    sparkline: [2622, 2628, 2636, 2631, 2644, 2640, 2648.3],
  },
  {
    id: "silver",
    symbol: "XAG/USD",
    name: "Silver",
    category: "commodities",
    price: 31.42,
    change: -0.28,
    changePercent: -0.88,
    high: 31.91,
    low: 31.18,
    volume: "8.4B",
    sparkline: [31.84, 31.72, 31.58, 31.66, 31.38, 31.51, 31.42],
  },
  {
    id: "oil",
    symbol: "WTI",
    name: "Crude Oil",
    category: "commodities",
    price: 78.64,
    change: 1.12,
    changePercent: 1.45,
    high: 79.21,
    low: 76.84,
    volume: "21.6B",
    sparkline: [76.9, 77.4, 77.8, 77.2, 78.1, 78.4, 78.64],
  },
  {
    id: "ngas",
    symbol: "NG",
    name: "Natural Gas",
    category: "commodities",
    price: 2.814,
    change: -0.062,
    changePercent: -2.16,
    high: 2.902,
    low: 2.788,
    volume: "5.1B",
    sparkline: [2.9, 2.874, 2.852, 2.868, 2.831, 2.822, 2.814],
  },
  {
    id: "spx",
    symbol: "US500",
    name: "S&P 500",
    category: "indices",
    price: 5672.4,
    change: 38.6,
    changePercent: 0.68,
    high: 5684.1,
    low: 5618.2,
    volume: "412.8B",
    sparkline: [5618, 5632, 5648, 5639, 5661, 5654, 5672.4],
  },
  {
    id: "ndx",
    symbol: "US100",
    name: "Nasdaq 100",
    category: "indices",
    price: 19842.6,
    change: -84.3,
    changePercent: -0.42,
    high: 20018.4,
    low: 19766.1,
    volume: "286.4B",
    sparkline: [19980, 20010, 19942, 19888, 19821, 19864, 19842.6],
  },
  {
    id: "dax",
    symbol: "GER40",
    name: "DAX 40",
    category: "indices",
    price: 18724.8,
    change: 62.1,
    changePercent: 0.33,
    high: 18761.4,
    low: 18612.9,
    volume: "94.2B",
    sparkline: [18620, 18648, 18692, 18671, 18718, 18698, 18724.8],
  },
  {
    id: "ftse",
    symbol: "UK100",
    name: "FTSE 100",
    category: "indices",
    price: 8314.6,
    change: -21.4,
    changePercent: -0.26,
    high: 8358.2,
    low: 8296.4,
    volume: "48.7B",
    sparkline: [8352, 8341, 8328, 8336, 8312, 8321, 8314.6],
  },
  {
    id: "nikkei",
    symbol: "JP225",
    name: "Nikkei 225",
    category: "indices",
    price: 39618,
    change: 214,
    changePercent: 0.54,
    high: 39742,
    low: 39280,
    volume: "76.5B",
    sparkline: [39280, 39360, 39480, 39420, 39590, 39540, 39618],
  },
];

export const watchlistIds = ["eurusd", "btc", "gold", "spx", "sol"];

export const transactions: Transaction[] = [
  {
    id: "tx-10492",
    type: "buy",
    instrument: "EUR/USD",
    amount: 12500,
    quantity: "1.25 lot",
    status: "completed",
    date: "2026-09-21 · 14:32",
  },
  {
    id: "tx-10488",
    type: "sell",
    instrument: "BTC/USD",
    amount: 6842,
    quantity: "0.10 BTC",
    status: "completed",
    date: "2026-09-21 · 11:08",
  },
  {
    id: "tx-10471",
    type: "deposit",
    instrument: "USD Wallet",
    amount: 25000,
    status: "completed",
    date: "2026-09-20 · 09:14",
  },
  {
    id: "tx-10463",
    type: "buy",
    instrument: "XAU/USD",
    amount: 7944,
    quantity: "3.00 oz",
    status: "pending",
    date: "2026-09-20 · 08:41",
  },
  {
    id: "tx-10450",
    type: "withdrawal",
    instrument: "USD Wallet",
    amount: 4000,
    status: "completed",
    date: "2026-09-18 · 16:22",
  },
  {
    id: "tx-10441",
    type: "sell",
    instrument: "US100",
    amount: 9820,
    quantity: "0.50 cfd",
    status: "failed",
    date: "2026-09-17 · 13:05",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Sowegan feels like a professional desk without the noise. Execution is clean, the market view is clear, and I can move between asset classes without switching platforms.",
    name: "Amelia Grant",
    role: "Independent FX trader",
    initials: "AG",
    rating: 5,
    market: "Forex",
  },
  {
    quote:
      "The interface is calm, precise, and genuinely useful. I opened the dashboard and immediately understood my exposure, watchlist, and daily movement.",
    name: "David Okonkwo",
    role: "Portfolio manager",
    initials: "DO",
    rating: 5,
    market: "Indices",
  },
  {
    quote:
      "I wanted a platform that looked as serious as the markets I trade. Sowegan’s layout, instrument coverage, and overall polish finally felt institutional.",
    name: "Sofia Lindgren",
    role: "Multi-asset investor",
    initials: "SL",
    rating: 5,
    market: "Crypto",
  },
  {
    quote:
      "Watchlists, sparklines, and account clarity in one place. I stopped bouncing between three tools and stayed inside Sowegan for the whole session.",
    name: "Marcus Chen",
    role: "Commodities desk",
    initials: "MC",
    rating: 5,
    market: "Commodities",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What markets can I access on Sowegan?",
    answer:
      "Sowegan provides a unified view of forex, cryptocurrencies, commodities, and global indices. You can monitor prices, track watchlists, and review account activity from one workspace.",
  },
  {
    question: "Is Sowegan suitable for new traders?",
    answer:
      "Yes. The platform is designed to be readable and structured, with a clean dashboard, plain-language market cards, and guided account setup. Advanced users still get a professional layout and dense market data.",
  },
  {
    question: "How do deposits and withdrawals work?",
    answer:
      "This frontend experience uses simulated account activity. In a live environment, funding methods, processing times, and verification requirements would be shown in the wallet and profile sections.",
  },
  {
    question: "Can I trade from mobile devices?",
    answer:
      "The entire Sowegan interface is fully responsive. Navigation, market data, forms, and the dashboard adapt to desktop, tablet, and mobile screens without losing hierarchy or usability.",
  },
  {
    question: "Is my account information secure?",
    answer:
      "Sowegan is designed around a professional security posture: encrypted sessions, strong password requirements, and a dedicated profile area for account controls. This demo uses client-side validation only.",
  },
];

export const features = [
  {
    title: "Multi-asset coverage",
    description:
      "Follow forex, crypto, commodities, and indices in one workspace with consistent pricing, change data, and watchlists.",
  },
  {
    title: "Institutional layout",
    description:
      "A calm, high-contrast interface built for focus: balances, exposure, and market movement are visible without clutter.",
  },
  {
    title: "Fast market context",
    description:
      "Sparkline trends, percentage moves, and session highs and lows help you read the tape at a glance.",
  },
  {
    title: "Account clarity",
    description:
      "See available balance, recent activity, and profile settings in a structured dashboard rather than scattered screens.",
  },
  {
    title: "Responsive trading desk",
    description:
      "The same professional experience on a 1920px monitor, a laptop, a tablet, or a phone — with a proper mobile sidebar.",
  },
  {
    title: "Built for trust",
    description:
      "Typography, spacing, and information hierarchy are designed to feel credible, precise, and production-ready.",
  },
];

export const benefits = [
  {
    title: "One platform, four markets",
    description:
      "Stop jumping between apps. Sowegan presents global instruments with a consistent design language and comparable data.",
  },
  {
    title: "Designed for decision-making",
    description:
      "Every card, chart, and table is spaced for scanning. Important numbers stay prominent. Supporting detail stays secondary.",
  },
  {
    title: "Professional from first login",
    description:
      "Onboarding, validation, and dashboard states are treated as part of the product — not afterthoughts.",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Create your account",
    description:
      "Register with your name and email, set a strong password, and accept the platform terms.",
  },
  {
    step: "02",
    title: "Review the markets",
    description:
      "Browse forex, crypto, commodities, and indices. Save instruments to a watchlist and filter by movement.",
  },
  {
    step: "03",
    title: "Use the desk",
    description:
      "Track balances, overview charts, transactions, and profile settings from a single professional dashboard.",
  },
];

export const stats = [
  { value: "120+", label: "Tradable instruments" },
  { value: "4", label: "Asset classes" },
  { value: "24/5", label: "Market coverage" },
  { value: "50ms", label: "Interface refresh" },
];

export const categoryLabels: Record<string, string> = {
  forex: "Forex",
  crypto: "Crypto",
  commodities: "Commodities",
  indices: "Indices",
};
