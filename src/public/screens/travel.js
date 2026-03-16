import { ctx, canvas } from "../engine/canvas.js";
import { STATE } from "../engine/state.js";

const MAX_SPEED = 30000000000000000;

let distance = 0;
let speed = 1;
let totalDistance = 0;

function renderStars() {
  ctx.fillStyle = "#ffffff22";

  for (let i = 0; i < 120; i++) {
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      2,
      2,
    );
  }
}

export function renderTravel() {
  renderStars();

  if (distance === 0) {
    const current = STATE.universe[STATE.player.system];

    const neighbor = current.neighbors.find((n) => n.id === STATE.destination);

    if (!neighbor) {
      STATE.screen = "map";
      return;
    }

    totalDistance = 9.461e15 * neighbor.distance;
    distance = totalDistance;
  }

  speed *= 1.05;

  if (speed > MAX_SPEED) speed = MAX_SPEED;

  distance -= speed;

  STATE.fuel -= 0.01;

  ctx.fillStyle = "#ffffff";

  ctx.fillText("HYPERSPACE JUMP", 50, 50);

  ctx.fillText("Speed: " + speed.toExponential(2) + " m/s", 50, 90);

  ctx.fillText("Distance Remaining:", 50, 130);
  ctx.fillText(distance.toExponential(2) + " meters", 50, 160);

  ctx.fillText("Fuel: " + STATE.fuel.toFixed(2), 50, 200);

  const progress = 1 - distance / totalDistance;

  ctx.fillStyle = "#444";
  ctx.fillRect(50, 240, 400, 20);

  ctx.fillStyle = "#4dabf7";
  ctx.fillRect(50, 240, 400 * progress, 20);

  ctx.fillStyle = "#4dabf7";
  ctx.fillRect(canvas.width / 2, canvas.height / 2, 20, 10);

  if (distance <= 0 || STATE.fuel <= 0) {
    distance = 0;
    speed = 1;

    STATE.player.system = STATE.destination;

    STATE.screen = "system";

    STATE.player.x = 100;
    STATE.player.y = 300;
  }
}
