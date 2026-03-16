export const STATE = {
  screen: "map",

  universe: null,

  systems: [],

  selectedSystem: null,

  player: {
    x: 200,
    y: 200,
    vx: 0,
    vy: 0,
    speed: 0,
  },

  credits: 1000,

  cargo: {},
  cargoCapacity: 20,

  fuel: 100,

  destination: null,

  docking: {
    targetX: 500,
    targetY: 300,
  },
};
