export type OptionsMarket = {
  id: string;
  name: string;
  price: number;
  change: number;
  timeframe: string;
  spark: number[];
  badge: number | string;
  kind: "vol" | "step";
};

export const optionsMarkets: OptionsMarket[] = [
  {
    id: "v25",
    name: "Volatility 25 Index",
    price: 2561.27,
    change: -0.02,
    timeframe: "5m",
    spark: [2568, 2565, 2562, 2559, 2563, 2560, 2561.27],
    badge: 25,
    kind: "vol",
  },
  {
    id: "v100",
    name: "Volatility 100 Index",
    price: 912.84,
    change: -0.07,
    timeframe: "5m",
    spark: [920, 918, 915, 913, 916, 914, 912.84],
    badge: 100,
    kind: "vol",
  },
  {
    id: "v75",
    name: "Volatility 75 Index",
    price: 1842.56,
    change: 0.11,
    timeframe: "5m",
    spark: [1820, 1825, 1830, 1834, 1838, 1840, 1842.56],
    badge: 75,
    kind: "vol",
  },
  {
    id: "v50",
    name: "Volatility 50 Index",
    price: 412.09,
    change: 0.04,
    timeframe: "5m",
    spark: [408, 409, 410, 409.5, 411, 411.5, 412.09],
    badge: 50,
    kind: "vol",
  },
  {
    id: "step500",
    name: "Step Index 500",
    price: 6124.18,
    change: 0.18,
    timeframe: "5m",
    spark: [6080, 6092, 6100, 6108, 6115, 6120, 6124.18],
    badge: 500,
    kind: "step",
  },
];

export function getOptionsMarket(id: string | null | undefined) {
  return optionsMarkets.find((item) => item.id === id) ?? optionsMarkets[0];
}
