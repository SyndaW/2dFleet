export const STATE = {
  /* =========================
   * 🧠 GAME STATE (server-driven)
   * ========================= */
  universe: null,

  player: null, // ✅ single source of truth (comes from API)

  /* =========================
   * 🎮 UI STATE (client-only)
   * ========================= */
  ui: {
    screen: "loading", // loading | map | system | travel | shop | landing

    selectedSystem: null,
    destination: null,

    systems: [],

    docking: {
      targetX: 500,
      targetY: 300,
      startTime: 0,
    },
  },

  /* =========================
   * 🚀 LOCAL RUNTIME STATE
   * (purely visual / temporary)
   * ========================= */
  runtime: {
    shipMotion: {
      x: 200,
      y: 200,
      vx: 0,
      vy: 0,
    },
  },
};

/* =========================
 * 🔄 STATE HELPERS
 * ========================= */

/**
 * Replace player safely (after API calls)
 */
export function setPlayer(data) {
  if (!data) return;

  STATE.player = {
    credits: data.credits ?? 0,
    cargo: data.cargo ?? {},
    fuel: data.fuel ?? 0,
    maxFuel: data.maxFuel ?? 100,

    system: data.system ?? "sol",
    location: data.location ?? null,

    ship: {
      cargoCapacity: data.ship?.cargoCapacity ?? 0,
      fuelCapacity: data.ship?.fuelCapacity ?? 100,
      jumpRange: data.ship?.jumpRange ?? 0,
      engineLevel: data.ship?.engineLevel ?? 1,
    },
  };
}

/**
 * Patch player (partial updates)
 */
export function patchPlayer(data) {
  if (!STATE.player || !data) return;

  Object.assign(STATE.player, data);

  if (data.ship) {
    STATE.player.ship = {
      ...STATE.player.ship,
      ...data.ship,
    };
  }
}

/**
 * Reset UI state when changing screens
 */
export function resetUI() {
  STATE.ui.selectedSystem = null;
  STATE.ui.destination = null;
}

/**
 * Convenience getters (avoid undefined crashes)
 */
export function getPlayer() {
  return STATE.player || {};
}

export function getShip() {
  return STATE.player?.ship || {};
}
