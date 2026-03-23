import { ctx } from "./canvas.js";
import { COLORS } from "./theme.js";

export function panel(x, y, w, h, title = null) {
  ctx.fillStyle = COLORS.panel;
  ctx.fillRect(x, y, w, h);

  ctx.strokeStyle = COLORS.border;
  ctx.strokeRect(x, y, w, h);

  if (title) {
    ctx.fillStyle = COLORS.accent;
    ctx.fillText(title, x + 10, y + 10);
  }
}

export function label(text, x, y, color = COLORS.text) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

export function progressBar(x, y, w, h, value) {
  ctx.fillStyle = COLORS.panel;
  ctx.fillRect(x, y, w, h);

  ctx.fillStyle = COLORS.highlight;
  ctx.fillRect(x, y, w * value, h);

  ctx.strokeStyle = COLORS.border;
  ctx.strokeRect(x, y, w, h);
}

export function list(items, x, y, spacing = 28) {
  items.forEach((item, i) => {
    label(item, x, y + i * spacing);
  });
}
