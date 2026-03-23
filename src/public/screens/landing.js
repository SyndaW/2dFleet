import { ctx } from "../engine/canvas.js";
import { STATE } from "../engine/state.js";
import { keys } from "../engine/input.js";

let finished = false;

function resetDocking() {
  finished = false;

  const p = STATE.player;
  p.vx = 0;
  p.vy = 0;

  STATE.docking.startTime = 0;
}

export function renderLanding() {
  const p = STATE.player;
  const dock = STATE.docking;

  if (!dock.startTime) {
    dock.startTime = Date.now();
  }

  if (finished) return;

  if (keys["ArrowUp"]) p.vy -= 0.1;
  if (keys["ArrowDown"]) p.vy += 0.1;
  if (keys["ArrowLeft"]) p.vx -= 0.1;
  if (keys["ArrowRight"]) p.vx += 0.1;

  p.x += p.vx;
  p.y += p.vy;

  // ✅ stronger damping (fix runaway speed)
  p.vx *= 0.92;
  p.vy *= 0.92;

  // ✅ hard clamp
  p.vx = Math.max(-2, Math.min(2, p.vx));
  p.vy = Math.max(-2, Math.min(2, p.vy));

  ctx.fillStyle = "#fff";
  ctx.fillText("Dock With Station", 50, 60);

  ctx.strokeStyle = "#00ff88";
  ctx.strokeRect(dock.targetX - 20, dock.targetY - 10, 120, 70);

  ctx.fillStyle = "#4dabf7";
  ctx.fillRect(p.x, p.y, 20, 10);

  const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

  ctx.fillText("Speed: " + speed.toFixed(2), 50, 100);

  const dx = p.x - dock.targetX;
  const dy = p.y - dock.targetY;

  const aligned = Math.abs(dx) < 30 && Math.abs(dy) < 25;
  const slow = speed < 0.6;

  const elapsed = (Date.now() - dock.startTime) / 1000;

  if (elapsed > 20) {
    resetDocking();
    STATE.screen = "system";
    return;
  }

  if (aligned && slow) {
    finished = true;

    const systemId = STATE.player.system;
    const system = STATE.universe[systemId];

    if (system?.stations?.length) {
      STATE.player.location = system.stations[0].id;
    }

    STATE.selectedSystem = systemId;

    setTimeout(() => {
      resetDocking();
      STATE.screen = "shop";
    }, 300);

    return;
  }

  // ❌ REMOVED forced kickout on high speed
}