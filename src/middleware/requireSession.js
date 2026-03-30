import { loadPlayer } from "../services/playerService.js";

export function requirePlayer(req, res, next) {
  if (!req.session.player && req.sessionID) {
    const saved = loadPlayer(req.sessionID);

    if (saved) {
      req.session.player = saved;
    }
  }

  if (!req.session?.player) {
    return res.status(401).json({
      error: "Game session not started",
    });
  }

  next();
}
