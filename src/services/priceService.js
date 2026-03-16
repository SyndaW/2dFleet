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
    food: 0.9,
    minerals: 1.2,
    technology: 1.4,
  },

  ac_station: {
    food: 1.3,
    textiles: 0.8,
    technology: 0.6,
  },

  barnard_station: {
    minerals: 0.6,
    machinery: 0.8,
  },

  sirius_station: {
    technology: 1.5,
    medicine: 0.7,
  },
};

export function getPrices(station) {
  const mod = stationModifiers[station] || {};
  const prices = {};

  for (const item in basePrices) {
    const m = mod[item] ?? 1;

    const random = 0.9 + Math.random() * 0.2;

    prices[item] = Math.round(basePrices[item] * m * random);
  }

  return prices;
}
