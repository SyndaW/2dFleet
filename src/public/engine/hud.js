import { STATE, getPlayer, getShip } from "./state.js";
import { canvas } from "./canvas.js";
import { panel, label, progressBar } from "./ui.js";

/**
 * Format large numbers (credits)
 */
function formatCredits(value) {
  return new Intl.NumberFormat().format(value || 0);
}

export function renderHUD() {
  const player = getPlayer();
  if (!player) return;

  const ship = getShip() || {};

  const width = canvas.width;
  const height = 70;

  panel(0, 0, width, height);

  /* =========================
   * 📊 LEFT SIDE
   * ========================= */

  const padding = 20;
  const col1 = padding;
  const col2 = width * 0.25;
  const col3 = width * 0.5;
  const col4 = width * 0.75;

  // 💰 Credits
  label(`Credits: ${formatCredits(player.credits)}`, col1, 20, "#b58900");

  // 🌌 System
  const systemName = STATE.universe?.[player.system]?.name || player.system;

  label(`System: ${systemName}`, col2, 20);

  // 📦 Cargo
  const cargoCount = Object.values(player.cargo || {}).reduce(
    (a, b) => a + b,
    0,
  );

  const cargoCapacity = ship.cargoCapacity || 0;

  label(`Cargo: ${cargoCount} / ${cargoCapacity}`, col3, 20);

  /* =========================
   * ⛽ FUEL
   * ========================= */

  const fuel = player.fuel || 0;
  const maxFuel = player.maxFuel || ship.fuelCapacity || 100;

  const ratio = maxFuel > 0 ? fuel / maxFuel : 0;

  let fuelColor = "#06d6a0"; // green
  if (ratio < 0.2) fuelColor = "#ff6b6b";
  else if (ratio < 0.5) fuelColor = "#ffd166";

  label("Fuel", col4, 10);
  progressBar(col4, 30, 160, 14, ratio, fuelColor);

  /* =========================
   * 🎯 DESTINATION
   * ========================= */

  if (STATE.ui.destination) {
    const destName =
      STATE.universe?.[STATE.ui.destination]?.name || STATE.ui.destination;

    label(`→ ${destName}`, col4, 50, "#4dabf7");
  }
}
