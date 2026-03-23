import express from "express";
import { requirePlayer } from "../middleware/requireSession.js";
import { getPrices } from "../services/priceService.js";
import { savePlayer } from "../services/playerService.js";

const router = express.Router();

router.get("/", requirePlayer, (req, res) => {
  const station = req.session.player.location;
  res.json(getPrices(station));
});

router.post("/buy", requirePlayer, (req, res) => {
  const { item } = req.body;
  const player = req.session.player;

  const prices = getPrices(player.location);
  const price = prices[item];

  if (!price) return res.status(400).json({ error: "Invalid item" });

  const cargoCount = Object.values(player.cargo).reduce((a, b) => a + b, 0);

  if (cargoCount >= player.ship.cargoCapacity)
    return res.status(400).json({ error: "Cargo full" });

  if (player.credits < price)
    return res.status(400).json({ error: "Not enough credits" });

  player.credits -= price;
  player.cargo[item] = (player.cargo[item] || 0) + 1;

  savePlayer(req.sessionID, player);
  res.json(player);
});

router.post("/sell", requirePlayer, (req, res) => {
  const player = req.session.player;
  const prices = getPrices(player.location);

  for (const item in player.cargo) {
    const amount = player.cargo[item] || 0;
    if (amount > 0) {
      player.credits += Math.round(prices[item] * 0.8 * amount);
      player.cargo[item] = 0;
    }
  }

  savePlayer(req.sessionID, player);
  res.json(player);
});

router.post("/fuel", requirePlayer, (req, res) => {
  const player = req.session.player;

  if (player.credits < 10)
    return res.status(400).json({ error: "Not enough credits" });

  player.credits -= 10;
  player.fuel = Math.min(player.maxFuel, player.fuel + 10);

  savePlayer(req.sessionID, player);
  res.json(player);
});

export default router;