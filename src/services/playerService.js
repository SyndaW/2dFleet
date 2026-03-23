import JSONdb from "simple-json-db";

const db = new JSONdb("players.json");

export function savePlayer(id, player) {
  db.set(id, player);
}

export function loadPlayer(id) {
  return db.has(id) ? db.get(id) : null;
}