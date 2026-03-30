import { STATE } from "../engine/state.js";
import { panel, label, progressBar } from "../engine/ui.js";
import { travel } from "../api.js";

let startTime = 0;
let duration = 0;
let inProgress = false;
let completed = false;

export async function renderTravel() {
  const current = STATE.universe[STATE.player.system];

  if (!current) {
    STATE.ui.screen = "map";
    return;
  }

  if (!inProgress) {
    const neighbor = current.neighbors.find(
      (n) => n.id === STATE.ui.destination,
    );

    if (!neighbor) {
      STATE.ui.screen = "map";
      return;
    }

    try {
      const result = await travel(STATE.ui.destination);

      duration = (result.travelTime || 5) * 1000;
      startTime = Date.now();
      inProgress = true;
      completed = false;

      STATE._pendingTravelResult = result;
    } catch (err) {
      alert(err.message);
      STATE.ui.screen = "map";
      return;
    }
  }

  const elapsed = Date.now() - startTime;
  const progress = Math.min(1, elapsed / duration);

  panel(40, 40, 420, 200, "Hyperspace");

  label(`Destination: ${STATE.ui.destination}`, 60, 90);

  label(
    `Time Remaining: ${Math.max(0, Math.ceil((duration - elapsed) / 1000))}s`,
    60,
    120,
  );

  progressBar(60, 160, 350, 18, progress);

  if (progress >= 1 && !completed) {
    completed = true;

    const updated = STATE._pendingTravelResult;

    STATE.player.fuel = updated.fuel;
    STATE.player.system = updated.system;
    STATE.player.location = updated.location;

    STATE.ui.selectedSystem = updated.system;

    STATE.ui.destination = null;
    STATE._pendingTravelResult = null;

    inProgress = false;
    startTime = 0;
    duration = 0;

    STATE.ui.screen = "system";
  }
}