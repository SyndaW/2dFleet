import "./engine/input.js";

import { clear } from "./engine/canvas.js";
import { STATE, setPlayer } from "./engine/state.js";

import { renderHUD } from "./engine/hud.js";
import { renderStars } from "./engine/stars.js";

import { renderLanding } from "./screens/landing.js";
import { renderMap } from "./screens/map.js";
import { renderTravel } from "./screens/travel.js";
import { renderShop } from "./screens/shop.js";
import { renderSystem } from "./screens/system.js";

import { startGame, getUniverse } from "./api.js";

/* =========================
 * 🚀 INIT
 * ========================= */

async function init() {
  try {
    STATE.ui.screen = "loading";

    const [player, universe] = await Promise.all([startGame(), getUniverse()]);

    STATE.universe = universe;

    // ✅ single source of truth
    setPlayer(player);

    // Start at map
    STATE.ui.screen = "map";
  } catch (err) {
    console.error(err);

    STATE.ui.screen = "error";
    STATE.ui.errorMessage = err?.message || "Failed to start game";
  }
}

/* =========================
 * 🎮 UI ACTIONS (minimal global exposure)
 * ========================= */

function openScreen(screen) {
  STATE.ui.screen = screen;
}

window.UI = {
  map: () => openScreen("map"),
  travel: () => openScreen("travel"),
  shop: () => openScreen("shop"),
};

/* =========================
 * 🎨 RENDER LOOP
 * ========================= */

function render() {
  clear();
  renderStars();

  const screen = STATE.ui.screen;

  switch (screen) {
    case "loading":
      renderLoading();
      break;

    case "error":
      renderError();
      break;

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

  // HUD only when player exists
  if (STATE.player) {
    renderHUD();
  }
}

/**
 * Stable game loop
 */
function loop() {
  render();
  requestAnimationFrame(loop);
}

/* =========================
 * 🧾 SCREENS (fallback UI)
 * ========================= */

function renderLoading() {
  const ctx = document.getElementById("game").getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillText("Loading game...", 50, 80);
}

function renderError() {
  const ctx = document.getElementById("game").getContext("2d");

  ctx.fillStyle = "#ff6b6b";
  ctx.fillText("Error starting game", 50, 80);

  ctx.fillStyle = "#ffffff";
  ctx.fillText(STATE.ui.errorMessage || "", 50, 110);
}

/* =========================
 * ▶ START
 * ========================= */

init()
  .then(() => loop())
  .catch((err) => {
    console.error("Fatal init error:", err);
  });
