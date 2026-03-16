export async function startGame() {
  const res = await fetch("/api/game/start");
  return res.json();
}

export async function getUniverse() {
  const res = await fetch("/api/game/universe");
  return res.json();
}

export async function travel(system) {
  const res = await fetch("/api/game/travel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system }),
  });
  return res.json();
}

export async function getPrices() {
  const res = await fetch("/api/shop");
  return res.json();
}
