import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

import { ENV, isProd } from "./config/env.js";

import gameRoutes from "./routes/game.js";
import shopRoutes from "./routes/shop.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(
  session({
    name: "2dfleet.sid",
    secret: ENV.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: false, // ✅ ALWAYS false in local dev (IMPORTANT)
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/game", gameRoutes);
app.use("/api/shop", shopRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(ENV.PORT, () => {
  console.log(`2dFleet running on http://${ENV.HOST}:${ENV.PORT}`);
});
