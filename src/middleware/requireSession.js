export function requirePlayer(req, res, next) {
  if (!req.session?.player) {
    return res.status(401).json({
      error: "Game session not started",
    });
  }

  next();
}