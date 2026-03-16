export const canvas = document.getElementById("game");
export const ctx = canvas.getContext("2d");

ctx.font = "18px 'Courier New', monospace";
ctx.textBaseline = "top";

export function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

export function drawText(text, x, y, color = "#ffffff") {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000000";
  ctx.strokeText(text, x, y);

  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

export function clear() {
  ctx.fillStyle = "#020617";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
