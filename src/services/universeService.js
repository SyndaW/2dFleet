import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const universePath = path.join(__dirname, "../data/universe.json");

let universeCache = null;

export async function getUniverse() {
  if (!universeCache) {
    const file = await fs.readFile(universePath, "utf-8");
    universeCache = JSON.parse(file);
  }

  return universeCache;
}

export async function getSystem(id) {
  const universe = await getUniverse();

  return universe[id] || null;
}
