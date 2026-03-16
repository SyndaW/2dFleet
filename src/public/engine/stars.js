import { ctx, canvas } from "./canvas.js";

const stars = [];

for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  });
}

export function renderStars() {
  ctx.fillStyle = "#ffffff22";

  stars.forEach((s) => {
    ctx.fillRect(s.x, s.y, 2, 2);
  });
}
