import { ctx } from "../engine/canvas.js";
import { STATE } from "../engine/state.js";
import { consumeKey } from "../engine/input.js";

export function renderShop() {
  ctx.fillStyle = "#ffffff";

  ctx.fillText("STATION MARKET", 50, 50);
  ctx.fillText("Credits: " + STATE.credits, 50, 80);

  ctx.fillText("Commodity", 50, 140);
  ctx.fillText("Buy", 200, 140);
  ctx.fillText("Sell", 260, 140);

  ctx.fillText("Food", 50, 180);
  ctx.fillText("10", 200, 180);
  ctx.fillText("8", 260, 180);

  ctx.fillText("Minerals", 50, 220);
  ctx.fillText("40", 200, 220);

  ctx.fillText("M Return to Galaxy Map", 50, 300);

  function cargoCount() {
    return Object.values(STATE.cargo).reduce((a, b) => a + b, 0);
  }

  if (consumeKey("1")) {
    if (STATE.credits >= 10 && cargoCount() < 20) {
      STATE.credits -= 10;
      STATE.cargo.food = (STATE.cargo.food || 0) + 1;
    }
  }

  if (consumeKey("2")) {
    if (STATE.credits >= 40 && cargoCount() < 20) {
      STATE.credits -= 40;
      STATE.cargo.minerals = (STATE.cargo.minerals || 0) + 1;
    }
  }

  if (consumeKey("3")) {
    if ((STATE.cargo.food || 0) > 0) {
      STATE.cargo.food--;
      STATE.credits += 8;
    }
  }

  if (consumeKey("m")) {
    STATE.screen = "map";
  }
}
