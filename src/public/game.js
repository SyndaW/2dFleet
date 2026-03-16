import "./engine/input.js";

import { clear } from "./engine/canvas.js";
import { STATE } from "./engine/state.js";

import { renderHUD } from "./engine/hud.js";
import { renderStars } from "./engine/stars.js";

import { renderLanding } from "./screens/landing.js";
import { renderMap } from "./screens/map.js";
import { renderTravel } from "./screens/travel.js";
import { renderShop } from "./screens/shop.js";
import { renderSystem } from "./screens/system.js";

async function init() {
  const res = await fetch("/api/game/start");
  const player = await res.json();

  const u = await fetch("/api/game/universe");
  STATE.universe = await u.json();

  STATE.credits = player.credits;
  STATE.cargo = player.cargo;
  STATE.fuel = player.fuel;
  STATE.player.system = player.system;

  STATE.screen = "map";
}

window.openMap = () => {
  STATE.screen = "map";
};

window.openTravel = () => {
  STATE.screen = "travel";
};

window.openShop = () => {
  STATE.screen = "shop";
};

function loop() {
  clear();

  renderStars();

  switch (STATE.screen) {
    case "landing":
      renderLanding();
      break;

    case "map":
      renderMap();
      break;

    case "travel":
      renderTravel();
      break;

    case "shop":
      renderShop();
      break;

    case "system":
      renderSystem();
      break;
  }

  renderHUD();

  requestAnimationFrame(loop);
}

init().then(loop);
