export type AssetClass = "forex" | "crypto" | "commodities" | "indices";

export type MarketInstrument = {
  id: string;
  symbol: string;
  name: string;
  category: AssetClass;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
  sparkline: number[];
};

export type Transaction = {
  id: string;
  type: "buy" | "sell" | "deposit" | "withdrawal";
  instrument: string;
  amount: number;
  quantity?: string;
  status: "completed" | "pending" | "failed";
  date: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
  market: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type NavItem = {
  href: string;
  label: string;
};
