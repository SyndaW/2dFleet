import { ctx, canvas } from "./canvas.js";

const stars = [];

function generateStars() {
  stars.length = 0;

  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    });
  }
}

generateStars();

window.addEventListener("resize", generateStars);

export function renderStars() {
  ctx.fillStyle = "#ffffff22";

  stars.forEach((s) => {
    ctx.fillRect(s.x, s.y, 2, 2);
  });
}
