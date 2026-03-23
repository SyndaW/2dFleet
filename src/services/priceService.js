const cache = {};
const TTL = 1000 * 30; // 30s

export function getPrices(station) {
  if (!station) return {};

  const now = Date.now();
  const entry = cache[station];

  if (entry && now - entry.time < TTL) {
    return entry.data;
  }

  const base = {
    food: 10,
    textiles: 20,
    minerals: 40,
    machinery: 100,
    technology: 250,
    medicine: 150,
  };

  const prices = {};

  for (const item in base) {
    const random = 0.9 + Math.random() * 0.2;
    prices[item] = Math.round(base[item] * random);
  }

  cache[station] = {
    data: prices,
    time: now,
  };

  return prices;
}