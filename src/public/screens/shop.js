import { ctx } from "../engine/canvas.js";
import { STATE } from "../engine/state.js";
import { consumeKey } from "../engine/input.js";
import { getPrices } from "../api.js";
import { panel, label } from "../engine/ui.js";

let prices = null;
let loading = false;
let lastStation = null;

async function loadPrices() {
  const currentStation = STATE.player.location;

  // reload only if station changed
  if (prices && lastStation === currentStation) return;
  if (loading) return;

  loading = true;
  lastStation = currentStation;

  try {
    const data = await getPrices();
    prices = data && !data.error ? data : {};
  } catch (err) {
    console.error("Price load failed:", err);
    prices = {};
  }

  loading = false;
}

export async function renderShop() {
  if (!STATE.player.location) {
    STATE.screen = "system";
    return;
  }

  await loadPrices();

  if (!prices) {
    panel(40, 40, 360, 200, "Loading Market...");
    return;
  }

  const goods = Object.keys(prices);

  panel(40, 40, 360, 380, "Station Market");

  label(`Credits: ${STATE.credits}`, 60, 80, "#ffd166");

  goods.forEach((g, i) => {
    const y = 120 + i * 30;

    label(`${i + 1}. ${g}`, 60, y);
    label(`${prices[g]} cr`, 200, y, "#4dabf7");
    label(`Cargo: ${STATE.cargo[g] || 0}`, 300, y);
  });

  const footerY = 120 + goods.length * 30 + 20;

  label("1-9 Buy goods", 60, footerY);
  label("S Sell cargo", 60, footerY + 30);
  label("F Buy fuel (10cr)", 60, footerY + 60);
  label("M Leave station", 60, footerY + 90);

  function cargoCount() {
    return Object.values(STATE.cargo).reduce((a, b) => a + b, 0);
  }

  const cargoCapacity = STATE.player.ship?.cargoCapacity ?? 20;

  goods.forEach((g, i) => {
    const key = (i + 1).toString();

    if (consumeKey(key)) {
      if (STATE.credits >= prices[g] && cargoCount() < cargoCapacity) {
        STATE.credits -= prices[g];
        STATE.cargo[g] = (STATE.cargo[g] || 0) + 1;
      }
    }
  });

  if (consumeKey("s") || consumeKey("S")) {
    goods.forEach((g) => {
      const amount = STATE.cargo[g] || 0;

      if (amount > 0) {
        STATE.credits += Math.round(prices[g] * 0.8 * amount);
        STATE.cargo[g] = 0;
      }
    });
  }

  if (consumeKey("f") || consumeKey("F")) {
    if (STATE.credits >= 10 && STATE.fuel < STATE.player.maxFuel) {
      STATE.credits -= 10;
      STATE.fuel = Math.min(STATE.player.maxFuel, STATE.fuel + 10);
    }
  }

  if (consumeKey("m") || consumeKey("M")) {
    prices = null;
    lastStation = null;
    STATE.screen = "system";
  }
}