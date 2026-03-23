import { STATE } from "../engine/state.js";
import { consumeKey } from "../engine/input.js";
import { getPrices, buy, sell, fuel } from "../api.js";
import { panel, label } from "../engine/ui.js";

let prices = null;
let loading = false;
let busy = false;
let message = "";
let lastStation = null;

async function loadPrices() {
  const station = STATE.player.location;

  if (!station) return;

  if (prices && lastStation === station) return;
  if (loading) return;

  loading = true;
  lastStation = station;

  try {
    prices = await getPrices();
  } catch (err) {
    console.error(err);
    prices = {};
  }

  loading = false;
}

function syncPlayer(data) {
  STATE.player.credits = data.credits;
  STATE.cargo = data.cargo;
  STATE.player.fuel = data.fuel;

  STATE.player.system = data.system;
  STATE.player.location = data.location;
}

export async function renderShop() {
  if (!STATE.player.location) {
    STATE.ui.screen = "system";
    return;
  }

  await loadPrices();

  panel(40, 40, 400, 420, "Station Market");

  if (loading || !prices) {
    label("Loading market...", 60, 80);
    return;
  }

  const goods = Object.keys(prices);

  label(`Credits: ${STATE.player.credits}`, 60, 80, "#ffd166");

  goods.forEach((g, i) => {
    const y = 120 + i * 30;

    label(`${i + 1}. ${g}`, 60, y);
    label(`${prices[g]} cr`, 200, y, "#4dabf7");
    label(`Cargo: ${STATE.cargo[g] || 0}`, 300, y);
  });

  const footerY = 120 + goods.length * 30 + 20;

  label("1-9 Buy", 60, footerY);
  label("S Sell all", 60, footerY + 25);
  label("F Fuel +10", 60, footerY + 50);
  label("M Leave", 60, footerY + 75);

  if (message) {
    label(message, 60, footerY + 110, "#06d6a0");
  }

  // 🔒 prevent spam
  if (busy) return;

  // BUY
  for (let i = 0; i < goods.length; i++) {
    const key = (i + 1).toString();

    if (consumeKey(key)) {
      busy = true;

      try {
        const updated = await buy(goods[i]);
        syncPlayer(updated);
        message = `Bought ${goods[i]}`;
      } catch (err) {
        message = err.message;
      }

      busy = false;
      return;
    }
  }

  // SELL
  if (consumeKey("s") || consumeKey("S")) {
    busy = true;

    try {
      const updated = await sell();
      syncPlayer(updated);
      message = "Sold all cargo";
    } catch (err) {
      message = err.message;
    }

    busy = false;
    return;
  }

  // FUEL
  if (consumeKey("f") || consumeKey("F")) {
    busy = true;

    try {
      const updated = await fuel();
      syncPlayer(updated);
      message = "+10 fuel";
    } catch (err) {
      message = err.message;
    }

    busy = false;
    return;
  }

  // EXIT
  if (consumeKey("m") || consumeKey("M")) {
    prices = null;
    lastStation = null;
    message = "";
    STATE.ui.screen = "system";
  }
}