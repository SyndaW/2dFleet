import { ctx } from "../engine/canvas.js";
import { STATE } from "../engine/state.js";
import { panel, label, progressBar } from "../engine/ui.js";

let distance = 0;
let velocity = 0;
let total = 0;

export function renderTravel() {
  const current = STATE.universe[STATE.player.system];

  if (distance === 0) {
    const neighbor = current.neighbors.find((n) => n.id === STATE.destination);

    if (!neighbor) {
      STATE.screen = "map";
      return;
    }

    total = neighbor.distance * 1000;
    distance = total;

    const fuelCost = neighbor.distance * 10;

    if (STATE.fuel < fuelCost) {
      alert("Not enough fuel");
      STATE.screen = "map";
      return;
    }

    STATE.fuel -= fuelCost;
  }

  velocity *= 1.02;
  velocity += 0.5;

  distance -= velocity;

  ctx.fillStyle = "white";

  panel(40, 40, 420, 200, "Hyperspace");

  label(`Destination: ${STATE.destination}`, 60, 90);
  label(`Velocity: ${velocity.toFixed(2)}`, 60, 120);
  label(`Distance: ${Math.max(0, distance).toFixed(0)}`, 60, 150);

  progressBar(60, 180, 350, 14, progress);

  const progress = 1 - distance / total;

  ctx.fillStyle = "#333";
  ctx.fillRect(50, 150, 400, 20);

  ctx.fillStyle = "#4dabf7";
  ctx.fillRect(50, 150, 400 * progress, 20);

  if (distance <= 0) {
    STATE.player.system = STATE.destination;
    STATE.destination = null;

    velocity = 0;
    distance = 0;

    STATE.screen = "system";
  }
}
