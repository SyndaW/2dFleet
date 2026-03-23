import { ctx } from "../engine/canvas.js";
import { STATE } from "../engine/state.js";
import { consumeKey } from "../engine/input.js";
import { panel, label } from "../engine/ui.js";

export function renderSystem() {
  const system = STATE.universe[STATE.selectedSystem || STATE.player.system];

  panel(30, 30, 260, 120, "System");

  label(system.name, 50, 70, "#4dabf7");
  label("D Dock station", 50, 95);
  label("M Galaxy map", 50, 120);

  ctx.fillStyle = "#b58900";
  ctx.beginPath();
  ctx.arc(500, 300, 30, 0, Math.PI * 2);
  ctx.fill();

  system.planets.forEach((p, i) => {
    const orbit = 100 + i * 60;

    ctx.strokeStyle = "#444";
    ctx.beginPath();
    ctx.arc(500, 300, orbit, 0, Math.PI * 2);
    ctx.stroke();

    const angle = Date.now() / 2000 + i;
    const x = 500 + Math.cos(angle) * orbit;
    const y = 300 + Math.sin(angle) * orbit;

    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.fillText(p, x + 10, y);
  });

  system.stations.forEach((s, i) => {
    ctx.fillRect(650, 300 + i * 40, 15, 15);
    ctx.fillText(s.name, 670, 310 + i * 40);
  });

  if (consumeKey("d")) {
    const systemId = STATE.selectedSystem || STATE.player.system;

    STATE.player.system = systemId;
    STATE.selectedSystem = systemId;

    STATE.player.x = 100;
    STATE.player.y = 300;
    STATE.player.vx = 0;
    STATE.player.vy = 0;

    STATE.docking.targetX = 600;
    STATE.docking.targetY = 300;
    STATE.docking.startTime = Date.now();

    STATE.ui.screen = "landing";
  }

  if (consumeKey("m")) {
    STATE.ui.screen = "map";
  }
}
