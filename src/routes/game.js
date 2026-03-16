import express from "express";

import { createPlayer } from "../game/player.js";
import { getUniverse } from "../services/universeService.js";
import { requirePlayer } from "../middleware/requireSession.js";

const router = express.Router();

router.get("/start", (req, res) => {
  if (!req.session.player) {
    req.session.player = createPlayer();
  }

  res.json(req.session.player);
});

router.get("/universe", async (req, res) => {
  const universe = await getUniverse();

  res.json(universe);
});

router.post("/travel", requirePlayer, async (req, res) => {
  const { system } = req.body;

  const player = req.session.player;
  const universe = await getUniverse();

  const current = universe[player.system];

  const neighbor = current.neighbors.find((n) => n.id === system);

  if (!neighbor) {
    return res.status(400).json({
      error: "System unreachable",
    });
  }

  const fuelCost = neighbor.distance * 10;

  if (player.fuel < fuelCost) {
    return res.status(400).json({
      error: "Not enough fuel",
    });
  }

  player.fuel -= fuelCost;
  player.system = system;
  player.location = null;

  res.json(player);
});

export default router;
