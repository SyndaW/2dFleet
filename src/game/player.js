export function createPlayer() {
  return {
    credits: 1000,
    cargo: {},
    system: "sol",
    location: "sol_station",
    fuel: 100,
    maxFuel: 100,

    ship: {
      cargoCapacity: 20,
      fuelCapacity: 100,
      jumpRange: 5,
      engineLevel: 1,
    },
  };
}
