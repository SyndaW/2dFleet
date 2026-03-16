import { ctx } from "../engine/canvas.js";
import { STATE } from "../engine/state.js";
import { panel, label, progressBar } from "../engine/ui.js";

let distance = 0;
let velocity = 0;
let total = 0;

export async function renderTravel() {
  const current = STATE.universe[STATE.player.system];

  if (distance === 0) {
    const neighbor = current.neighbors.find((n) => n.id === STATE.destination);

    if (!neighbor) {
      STATE.screen = "map";
      return;
    }

    total = neighbor.distance * 1000;
    distance = total;
    velocity = 2;

    const fuelCost = neighbor.distance * 10;

    if (STATE.fuel < fuelCost) {
      alert("Not enough fuel");
      STATE.screen = "map";
      return;
    }

    STATE.fuel -= fuelCost;
  }

  velocity *= 1.02;
  distance -= velocity;

  const progress = 1 - distance / total;

  panel(40, 40, 420, 200, "Hyperspace");

  label(`Destination: ${STATE.destination}`, 60, 90);
  label(`Velocity: ${velocity.toFixed(2)}`, 60, 120);
  label(`Distance: ${Math.max(0, distance).toFixed(0)}`, 60, 150);

  progressBar(60, 180, 350, 14, progress);

  if (distance <= 0) {
    await travel(STATE.destination);
    STATE.selectedSystem = STATE.destination;

    STATE.destination = null;

    distance = 0;
    velocity = 0;
    total = 0;

    STATE.screen = "system";
  }
}
