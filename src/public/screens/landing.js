import { ctx } from "../engine/canvas.js";
import { STATE } from "../engine/state.js";
import { keys } from "../engine/input.js";

export function renderLanding() {
  const p = STATE.player;
  const dock = STATE.docking;

  if (keys["ArrowUp"]) p.vy -= 0.1;
  if (keys["ArrowDown"]) p.vy += 0.1;
  if (keys["ArrowLeft"]) p.vx -= 0.1;
  if (keys["ArrowRight"]) p.vx += 0.1;

  p.x += p.vx;
  p.y += p.vy;

  p.vx *= 0.97;
  p.vy *= 0.97;

  ctx.fillStyle = "#ffffff";
  ctx.fillText("Dock With Station", 50, 60);

  ctx.strokeStyle = "#00ff88";

  ctx.strokeRect(dock.targetX, dock.targetY, 80, 50);

  ctx.fillStyle = "#4dabf7";

  ctx.fillRect(p.x, p.y, 20, 10);

  const dx = p.x - dock.targetX;
  const dy = p.y - dock.targetY;

  const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

  const aligned = Math.abs(dx) < 30 && Math.abs(dy) < 25;
  const slow = speed < 1;

  if (aligned && slow) {
    ctx.fillStyle = "#00ff88";
    ctx.fillText("Docking Successful!", 50, 120);

    STATE.screen = "shop";
  }

  if (aligned && !slow) {
    ctx.fillStyle = "#ff5555";
    ctx.fillText("Too Fast! Slow Down!", 50, 120);
  }
}
