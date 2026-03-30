import { ctx } from "../engine/canvas.js";
import { STATE } from "../engine/state.js";
import { keys } from "../engine/input.js";

let finished = false;

function getMotion() {
  if (!STATE.runtime.shipMotion) {
    STATE.runtime.shipMotion = {
      x: 100,
      y: 300,
      vx: 0,
      vy: 0,
    };
  }
  return STATE.runtime.shipMotion;
}

function resetDocking() {
  finished = false;

  STATE.runtime.shipMotion = {
    x: 100,
    y: 300,
    vx: 0,
    vy: 0,
  };

  STATE.ui.docking.startTime = 0;
}

export function renderLanding() {
  const motion = getMotion();
  const dock = STATE.ui.docking;

  if (!dock.startTime) {
    dock.startTime = Date.now();
  }

  if (finished) return;

  // controls
  if (keys["ArrowUp"]) motion.vy -= 0.1;
  if (keys["ArrowDown"]) motion.vy += 0.1;
  if (keys["ArrowLeft"]) motion.vx -= 0.1;
  if (keys["ArrowRight"]) motion.vx += 0.1;

  motion.x += motion.vx;
  motion.y += motion.vy;

  // damping
  motion.vx *= 0.92;
  motion.vy *= 0.92;

  // clamp
  motion.vx = Math.max(-2, Math.min(2, motion.vx));
  motion.vy = Math.max(-2, Math.min(2, motion.vy));

  // render
  ctx.fillStyle = "#fff";
  ctx.fillText("Dock With Station", 50, 60);

  ctx.strokeStyle = "#00ff88";
  ctx.strokeRect(dock.targetX - 20, dock.targetY - 10, 120, 70);

  ctx.fillStyle = "#4dabf7";
  ctx.fillRect(motion.x, motion.y, 20, 10);

  const speed = Math.sqrt(motion.vx ** 2 + motion.vy ** 2);
  ctx.fillText("Speed: " + speed.toFixed(2), 50, 100);

  const dx = motion.x - dock.targetX;
  const dy = motion.y - dock.targetY;

  const aligned = Math.abs(dx) < 30 && Math.abs(dy) < 25;
  const slow = speed < 0.6;

  const elapsed = (Date.now() - dock.startTime) / 1000;

  if (elapsed > 20) {
    resetDocking();
    STATE.ui.screen = "system";
    return;
  }

  if (aligned && slow) {
    finished = true;

    const systemId = STATE.player.system;
    const system = STATE.universe[systemId];

    if (system?.stations?.length) {
      STATE.player.location = system.stations[0].id;
    }

    STATE.ui.selectedSystem = systemId;

    setTimeout(() => {
      resetDocking();
      STATE.ui.screen = "shop";
    }, 300);
  }
}
