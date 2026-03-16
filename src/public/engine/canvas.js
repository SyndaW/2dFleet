export const canvas = document.getElementById("game");
export const ctx = canvas.getContext("2d");

ctx.font = "16px monospace";

export function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

export function clear() {
  ctx.fillStyle = "#fdf6e3";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
