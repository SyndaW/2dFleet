import { ctx } from "./canvas.js";

export function panel(x, y, w, h, title = null) {
  ctx.fillStyle = "rgba(10,15,28,0.85)";
  ctx.fillRect(x, y, w, h);

  ctx.strokeStyle = "#4dabf7";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  if (title) {
    ctx.fillStyle = "#4dabf7";
    ctx.fillText(title, x + 10, y + 10);
  }
}

export function label(text, x, y, color = "#e6edf3") {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

export function progressBar(x, y, w, h, value, color = "#4dabf7") {
  ctx.fillStyle = "#222";
  ctx.fillRect(x, y, w, h);

  ctx.fillStyle = color;
  ctx.fillRect(x, y, w * value, h);

  ctx.strokeStyle = "#4dabf7";
  ctx.strokeRect(x, y, w, h);
}

export function list(items, x, y, spacing = 28) {
  items.forEach((item, i) => {
    label(item, x, y + i * spacing);
  });
}
