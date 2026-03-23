import { STATE } from "./state.js";
import { canvas, ctx } from "./canvas.js";
import { panel, label, progressBar } from "./ui.js";

export function renderHUD() {
  // DYNAMIC PANEL HEIGHT / WIDTH
  const hudHeight = 60;
  const hudWidth = canvas.width;

  panel(0, 0, hudWidth, hudHeight);

  const player = STATE.player || {};
  const ship = player.ship || {};

  // CREDITS
  const credits = STATE.player.credits ?? 0;
  label(`Credits: ${credits}`, 20, 20, "#b58900");

  // SYSTEM
  const systemName = player.system || "Unknown";
  label(`System: ${systemName}`, 220, 20);

  // CARGO
  const cargoCount = Object.values(STATE.cargo || {}).reduce((a, b) => a + b, 0);
  const cargoCapacity = ship.cargoCapacity ?? 0;
  label(`Cargo: ${cargoCount} / ${cargoCapacity}`, 420, 20);

  // FUEL
  const fuel = STATE.player.fuel ?? 0;
  const maxFuel = player.maxFuel ?? ship.fuelCapacity ?? 100;
  const fuelRatio = maxFuel > 0 ? fuel / maxFuel : 0;
  const fuelColor = fuelRatio < 0.2 ? "#cb4b16" : "#06d6a0"; // warning if low

  label("Fuel", 600, 12);
  progressBar(600, 30, 150, 12, fuelRatio, fuelColor);

  // DESTINATION
  if (STATE.ui.destination) {
    const dest = STATE.universe?.[STATE.ui.destination]?.name || STATE.ui.destination;
    label(`Destination: ${dest}`, 780, 20, "#4dabf7");
  }
}