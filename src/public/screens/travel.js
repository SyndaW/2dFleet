import { STATE } from "../engine/state.js";
import { panel, label, progressBar } from "../engine/ui.js";
import { travel } from "../api.js";

let startTime = 0;
let duration = 0;
let inProgress = false;
let completed = false;

export async function renderTravel() {
  const current = STATE.universe[STATE.player.system];

  // INIT TRAVEL (once)
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

      duration = (result.travelTime || 5) * 1000; // ms
      startTime = Date.now();
      inProgress = true;
      completed = false;

      // Pre-store result for later
      STATE._pendingTravelResult = result;
    } catch (err) {
      alert(err.message);
      STATE.ui.screen = "map";
      return;
    }
  }

  // PROGRESS CALC
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

  // COMPLETE (once)
  if (progress >= 1 && !completed) {
    completed = true;

    const updated = STATE._pendingTravelResult;

    // FULL SYNC
    STATE.player.fuel = updated.fuel;
    STATE.player.system = updated.system;
    STATE.player.location = updated.location;

    STATE.selectedSystem = updated.system;

    // RESET
    STATE.ui.destination = null;
    STATE._pendingTravelResult = null;

    inProgress = false;
    startTime = 0;
    duration = 0;

    STATE.ui.screen = "system";
  }
}
