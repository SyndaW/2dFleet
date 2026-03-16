import { ctx } from "../engine/canvas.js";
import { STATE } from "../engine/state.js";
import { keys } from "../engine/input.js";

export function renderSystem() {
  const system = STATE.universe[STATE.selectedSystem];

  ctx.fillStyle = "#586e75";

  ctx.fillText(system.name + " System", 50, 50);
  ctx.fillText("D: Dock Station", 50, 80);
  ctx.fillText("M: Galaxy Map", 50, 110);

  ctx.fillStyle = "#b58900";

  ctx.beginPath();
  ctx.arc(500, 300, 30, 0, Math.PI * 2);
  ctx.fill();

  system.planets.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(500, 350 + i * 40, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillText(p, 520, 350 + i * 40);
  });

  system.stations.forEach((s, i) => {
    ctx.fillRect(650, 300 + i * 40, 15, 15);
    ctx.fillText(s.name, 670, 310 + i * 40);
  });

  if (keys["d"]) {
    STATE.screen = "landing";

    STATE.docking.targetX = 600;
    STATE.docking.targetY = 300;
  }

  if (keys["m"]) {
    STATE.screen = "map";
  }
}
