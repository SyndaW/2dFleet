import { ctx } from "../engine/canvas.js";
import { STATE } from "../engine/state.js";
import { consumeKey } from "../engine/input.js";
import { getPrices } from "../api.js";

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
  ctx.fillText("STATION MARKET", 50, 50);
  ctx.fillText("Credits: " + STATE.credits, 50, 80);

  goods.forEach((g, i) => {
    ctx.fillText(i + 1 + ". " + g, 50, 150 + i * 30);
    ctx.fillText(prices[g], 200, 150 + i * 30);
    ctx.fillText(STATE.cargo[g] || 0, 260, 150 + i * 30);
  });

  ctx.fillText("Press M to leave station", 50, 350);

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
