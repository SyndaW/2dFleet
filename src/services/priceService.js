const basePrices = {
  food: 10,
  textiles: 20,
  minerals: 40,
  machinery: 100,
  technology: 250,
  medicine: 150,
};

const stationModifiers = {
  sol_station: {
    food: 1.0,
    minerals: 0.8,
    technology: 1.2,
  },

  ac_station: {
    food: 1.3,
    minerals: 1.1,
    technology: 0.7,
  },
};

export function getPrices(station) {
  const modifier = stationModifiers[station] || {};
  const prices = {};

  for (const item in basePrices) {
    const m = modifier[item] ?? 1;

    prices[item] = Math.round(basePrices[item] * m);
  }

  return prices;
}
