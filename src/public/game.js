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

import { startGame, getUniverse } from "./api.js"; // ✅ use API layer

async function init() {
  const player = await startGame();
  const universe = await getUniverse();

  STATE.universe = universe;

  Object.assign(STATE, {
    credits: player.credits,
    cargo: player.cargo,
    fuel: player.fuel,
  });

  Object.assign(STATE.player, {
    system: player.system,
    location: player.location,
    maxFuel: player.maxFuel,
    ship: player.ship,
  });

  STATE.screen = "map";
}

window.openMap = () => (STATE.screen = "map");
window.openTravel = () => (STATE.screen = "travel");
window.openShop = () => (STATE.screen = "shop");

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

init().then(loop).catch(console.error);