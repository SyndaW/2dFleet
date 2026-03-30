function api(url, options = {}) {
  return fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
}

/**
 * Central response handler
 */
async function handle(res) {
  // 🔥 SESSION LOST → auto-recover (FIXED)
  if (res.status === 401) {
    console.warn("Session expired. Restoring...");
    await startGame();

    // ✅ Do NOT throw → let caller retry gracefully
    return { recovered: true };
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "API error");
  }

  return data;
}

/* =========================
 * 🎮 GAME
 * ========================= */

export async function startGame() {
  return handle(await api("/api/game/start"));
}

export async function getUniverse() {
  return handle(await api("/api/game/universe"));
}

export async function travel(system) {
  return handle(
    await api("/api/game/travel", {
      method: "POST",
      body: JSON.stringify({ system }),
    }),
  );
}

/* =========================
 * 🛒 SHOP
 * ========================= */

export async function getPrices() {
  return handle(await api("/api/shop"));
}

export async function buy(item) {
  return handle(
    await api("/api/shop/buy", {
      method: "POST",
      body: JSON.stringify({ item }),
    }),
  );
}

export async function sell() {
  return handle(await api("/api/shop/sell", { method: "POST" }));
}

export async function fuel() {
  return handle(await api("/api/shop/fuel", { method: "POST" }));
}
