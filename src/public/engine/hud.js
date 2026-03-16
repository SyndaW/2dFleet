import { ctx, canvas } from "./canvas.js";
import { STATE } from "./state.js";

export function renderHUD() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, 40);

  ctx.fillStyle = "#fff";

  ctx.fillText("Credits: " + STATE.credits, 20, 25);

  ctx.fillText("Fuel: " + STATE.fuel.toFixed(2), 200, 25);

  const cargoCount = Object.values(STATE.cargo).reduce((a, b) => a + b, 0);

  ctx.fillText("Cargo: " + cargoCount + " / 20", 350, 25);
}
