import express from "express";
import { createPlayer } from "../game/player.js";
import { getUniverse } from "../services/universeService.js";
import { calculateTravel } from "../game/travel.js";
import { savePlayer, loadPlayer } from "../services/playerService.js";
import { requirePlayer } from "../middleware/requireSession.js";

const router = express.Router();

router.get("/start", (req, res) => {
  if (!req.session.player) {
    const saved = loadPlayer(req.sessionID);
    req.session.player = saved || createPlayer();
  }

  savePlayer(req.sessionID, req.session.player);
  res.json(req.session.player);
});

router.get("/universe", async (req, res) => {
  const universe = await getUniverse();

  if (!req.session.player) {
    req.session.player = createPlayer();
  }

  res.json(universe);
});

router.post("/travel", requirePlayer, async (req, res) => {
  const { system } = req.body;

  // ✅ FIX: validation INSIDE route
  if (typeof system !== "string") {
    return res.status(400).json({ error: "Invalid system" });
  }

  const player = req.session.player;
  const universe = await getUniverse();

  const current = universe[player.system];
  const neighbor = current.neighbors.find((n) => n.id === system);

  if (!neighbor) {
    return res.status(400).json({ error: "System unreachable" });
  }

  if (neighbor.distance > player.ship.jumpRange) {
    return res.status(400).json({ error: "Out of range" });
  }

  const fuelCost = neighbor.distance * 10;

  if (player.fuel < fuelCost) {
    return res.status(400).json({ error: "Not enough fuel" });
  }

  player.fuel -= fuelCost;
  player.system = system;
  player.location = null;

  const travelTime = calculateTravel(
    neighbor.distance,
    player.ship.engineLevel,
  );

  savePlayer(req.sessionID, player);

  res.json({
    system: player.system,
    location: player.location,
    fuel: player.fuel,
    travelTime,
  });
});

export default router;