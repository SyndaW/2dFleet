export const keys = {};
export const pressed = {};

window.addEventListener("keydown", (e) => {
  if (!keys[e.key]) {
    pressed[e.key] = true;
  }

  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

export function consumeKey(key) {
  if (pressed[key]) {
    pressed[key] = false;
    return true;
  }

  return false;
}
