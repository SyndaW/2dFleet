import express from "express";
import { getPrices } from "../services/priceService.js";
import { requirePlayer } from "../middleware/requireSession.js";

const router = express.Router();

router.get("/", requirePlayer, (req, res) => {
  const station = req.session.player.location;

  const prices = getPrices(station);

  res.json(prices);
});

export default router;
