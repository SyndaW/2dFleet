import { ctx } from "../engine/canvas.js";
import { STATE } from "../engine/state.js";
import { panel, label, progressBar } from "../engine/ui.js";
import { travel } from "../api.js";

let distance = 0;
let velocity = 0;
let total = 0;

let initialized = false;

export async function renderTravel() {
  const current = STATE.universe[STATE.player.system];

  if (!initialized) {
    const neighbor = current.neighbors.find((n) => n.id === STATE.destination);

    if (!neighbor) {
      STATE.screen = "map";
      return;
    }

    total = neighbor.distance * 1000;
    distance = total;
    velocity = 2;
    initialized = true;
  }

  velocity *= 1.02;
  distance -= velocity;

  const progress = Math.min(1, Math.max(0, 1 - distance / total));

  panel(40, 40, 420, 200, "Hyperspace");

  label(`Destination: ${STATE.destination}`, 60, 90);
  label(`Velocity: ${velocity.toFixed(2)}`, 60, 120);
  label(`Distance: ${Math.max(0, distance).toFixed(0)}`, 60, 150);

  progressBar(60, 180, 350, 14, progress);

  if (distance <= 0) {
    try {
      const updated = await travel(STATE.destination);

      STATE.fuel = updated.fuel;
      STATE.player.system = updated.system;
      STATE.player.location = updated.location;

      STATE.selectedSystem = updated.system;
    } catch (err) {
      alert(err.message);
    }

    STATE.destination = null;

    distance = 0;
    velocity = 0;
    total = 0;
    initialized = false;

    STATE.screen = "system";
  }
}