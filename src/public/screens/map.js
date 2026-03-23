import { ctx } from "../engine/canvas.js";
import { STATE } from "../engine/state.js";
import { consumeKey } from "../engine/input.js";
import { panel, label } from "../engine/ui.js";

let index = 0;
let initialized = false;

function initSystems() {
  if (!STATE.universe) return;

  STATE.systems = Object.keys(STATE.universe).map((id) => ({
    id,
    ...STATE.universe[id],
  }));

  index = STATE.systems.findIndex((s) => s.id === STATE.player.system);

  if (index === -1) index = 0;

  STATE.selectedSystem = STATE.systems[index]?.id;

  initialized = true;
}

export function renderMap() {
  // Wait until universe is loaded
  if (!STATE.universe) {
    panel(40, 40, 300, 120, "Loading...");
    return;
  }

  // Initialize once
  if (!initialized) {
    initSystems();
  }

  const systems = STATE.systems;
  if (!systems.length) return;

  // INPUT (clean + predictable)
  if (consumeKey("ArrowRight")) {
    index = (index + 1) % systems.length;
  }

  if (consumeKey("ArrowLeft")) {
    index = (index - 1 + systems.length) % systems.length;
  }

  const selected = systems[index];
  if (!selected) return;

  STATE.selectedSystem = selected.id;

  const current = STATE.universe[STATE.player.system];
  const neighbor = current?.neighbors?.find((n) => n.id === selected.id);

  // UI PANEL
  panel(30, 30, 280, 170, "Galaxy Map");

  label("← → Select", 50, 70);
  label("T Jump", 50, 95);
  label("ESC Cancel", 50, 120);

  label(`Selected: ${selected.name}`, 50, 150, "#00ffcc");

  // DISTANCE / STATUS
  if (neighbor) {
    label(`Distance: ${neighbor.distance} LY`, 50, 180);

    const fuelCost = neighbor.distance * 10;

    if (neighbor.distance > STATE.player.ship.jumpRange) {
      label("Out of range", 50, 200, "#ff6b6b");
    } else if (STATE.player.fuel < fuelCost) {
      label("Not enough fuel", 50, 200, "#ff6b6b");
    } else {
      label("Ready to jump", 50, 200, "#06d6a0");
    }
  } else {
    label("Not connected", 50, 180, "#ff6b6b");
  }

  // DRAW SYSTEMS
  systems.forEach((sys) => {
    ctx.fillStyle = "#ffaa00";

    ctx.beginPath();
    ctx.arc(sys.x, sys.y, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.fillText(sys.name, sys.x - 20, sys.y + 20);
  });

  // CURRENT SYSTEM
  if (current) {
    ctx.strokeStyle = "#4dabf7";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(current.x, current.y, 22, 0, Math.PI * 2);
    ctx.stroke();
  }

  // SELECTED SYSTEM
  ctx.strokeStyle = "#00ffcc";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.arc(selected.x, selected.y, 16, 0, Math.PI * 2);
  ctx.stroke();

  // TRAVEL (safe)
  if (consumeKey("t") || consumeKey("T")) {
    if (!neighbor) return;

    const fuelCost = neighbor.distance * 10;

    if (neighbor.distance > STATE.player.ship.jumpRange) return;
    if (STATE.player.fuel < fuelCost) return;

    STATE.ui.destination = selected.id;
    STATE.ui.screen = "travel";
  }
}
