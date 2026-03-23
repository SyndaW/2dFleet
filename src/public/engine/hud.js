import { STATE } from "./state.js";
import { canvas } from "./canvas.js";
import { panel, label, progressBar } from "./ui.js";

export function renderHUD() {
  panel(0, 0, canvas.width, 60);

  label(`Credits: ${STATE.credits}`, 20, 20, "#ffd166");

  label(`System: ${STATE.player.system}`, 200, 20);

  const cargoCount = Object.values(STATE.cargo).reduce((a, b) => a + b, 0);
  const capacity = STATE.player.ship?.cargoCapacity ?? 0;
  label(`Cargo: ${cargoCount} / ${capacity}`, 380, 20);

  label("Fuel", 560, 12);

  const fuelRatio =
    STATE.player.maxFuel > 0
      ? STATE.fuel / STATE.player.maxFuel
      : 0;

  progressBar(560, 30, 150, 12, fuelRatio, "#06d6a0");

  if (STATE.destination) {
    label(`Destination: ${STATE.destination}`, 740, 20, "#4dabf7");
  }
}
