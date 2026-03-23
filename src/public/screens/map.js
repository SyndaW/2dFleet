import { ctx } from "../engine/canvas.js";
import { STATE } from "../engine/state.js";
import { consumeKey } from "../engine/input.js";
import { panel, label } from "../engine/ui.js";

let index = 0;

async function loadUniverse() {
  if (!STATE.universe) {
    const res = await fetch("/api/game/universe");
    STATE.universe = await res.json();
  }

  STATE.systems = Object.keys(STATE.universe).map((id) => ({
    id,
    ...STATE.universe[id],
  }));
}

export async function renderMap() {
  await loadUniverse();

  if (!STATE.selectedSystem) {
    STATE.selectedSystem = STATE.player.system;

    index = STATE.systems.findIndex(
      (s) => s.id === STATE.player.system
    );

    if (index === -1) index = 0;
  }

  panel(30, 30, 260, 150, "GALAXY MAP");

  label("← → Select System", 50, 70);
  label("T Jump", 50, 95);
  label("ENTER System View", 50, 120);

  // INPUT
  if (consumeKey("ArrowRight"))
    index = Math.min(index + 1, STATE.systems.length - 1);

  if (consumeKey("ArrowLeft"))
    index = Math.max(index - 1, 0);

  const selected = STATE.systems[index];
  if (!selected) return;

  STATE.selectedSystem = selected.id;

  // DRAW SYSTEMS
  STATE.systems.forEach((sys) => {
    ctx.fillStyle = "#ffaa00";
    ctx.beginPath();
    ctx.arc(sys.x, sys.y, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.fillText(sys.name, sys.x - 20, sys.y + 25);
  });

  // SELECTED highlight
  ctx.strokeStyle = "#00ffcc";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(selected.x, selected.y, 18, 0, Math.PI * 2);
  ctx.stroke();

  // PLAYER highlight
  const playerSystem = STATE.universe[STATE.player.system];

  ctx.strokeStyle = "#4dabf7";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(playerSystem.x, playerSystem.y, 24, 0, Math.PI * 2);
  ctx.stroke();

  label(`Selected: ${selected.name}`, 50, 160, "#00ffcc");

  const current = STATE.universe[STATE.player.system];
  const neighbor = current.neighbors.find((n) => n.id === selected.id);

  if (neighbor) {
    label(`Distance: ${neighbor.distance} LY`, 50, 180);
  } else {
    label("Not directly reachable", 50, 180, "#ff6b6b");
  }

  // 🚀 TRAVEL (STRICT CHECKS)
  if (consumeKey("t") || consumeKey("T")) {
    if (!neighbor) {
      alert("System not reachable from current system");
      return;
    }

    if (neighbor.distance > STATE.player.ship.jumpRange) {
      alert("Out of jump range");
      return;
    }

    const fuelCost = neighbor.distance * 10;

    if (STATE.fuel < fuelCost) {
      alert("Not enough fuel");
      return;
    }

    STATE.destination = selected.id;
    STATE.screen = "travel";
  }

  // ❌ removed free ENTER teleport
}