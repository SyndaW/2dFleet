import { ctx } from "../engine/canvas.js";
import { STATE } from "../engine/state.js";
import { consumeKey } from "../engine/input.js";
import { getPrices } from "../api.js";
import { panel, label } from "../engine/ui.js";

let prices = null;

async function loadPrices() {
  if (!prices) {
    prices = await getPrices();
  }
}

export async function renderShop() {
  if (!STATE.player.location) {
    STATE.screen = "system";
    return;
  }

  await loadPrices();

  const goods = Object.keys(prices);

  ctx.fillStyle = "#ffffff";
  panel(40, 40, 360, 360, "Station Market");
  label(`Credits: ${STATE.credits}`, 60, 80, "#ffd166");

  goods.forEach((g, i) => {
    const y = 120 + i * 30;

    label(`${i + 1}. ${g}`, 60, y);
    label(`${prices[g]} cr`, 200, y, "#4dabf7");
    label(`Cargo: ${STATE.cargo[g] || 0}`, 300, y);
  });

  label("S Sell cargo", 60, 320);
  label("M Leave station", 60, 350);

  function cargoCount() {
    return Object.values(STATE.cargo).reduce((a, b) => a + b, 0);
  }

  goods.forEach((g, i) => {
    if (consumeKey("" + (i + 1))) {
      if (STATE.credits >= prices[g] && cargoCount() < STATE.cargoCapacity) {
        STATE.credits -= prices[g];
        STATE.cargo[g] = (STATE.cargo[g] || 0) + 1;
      }
    }
  });

  if (consumeKey("s")) {
    goods.forEach((g) => {
      if ((STATE.cargo[g] || 0) > 0) {
        STATE.cargo[g]--;
        STATE.credits += Math.round(prices[g] * 0.8);
      }
    });
  }

  if (consumeKey("m")) {
    prices = null;
    STATE.screen = "system";
  }
}
