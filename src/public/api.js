async function handle(res) {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "API error");
  }

  return data;
}

export async function startGame() {
  return handle(await fetch("/api/game/start"));
}

export async function getUniverse() {
  return handle(await fetch("/api/game/universe"));
}

export async function travel(system) {
  return handle(
    await fetch("/api/game/travel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ system }),
    })
  );
}

export async function getPrices() {
  return handle(await fetch("/api/shop"));
}