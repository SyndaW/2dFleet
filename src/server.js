import express from "express"
import session from "express-session"
import path from "path"
import { fileURLToPath } from "url"

import gameRoutes from "./routes/game.js"
import shopRoutes from "./routes/shop.js"
import authRoutes from "./routes/auth.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())

app.use(session({
    secret: "2dfleet-secret",
    resave: false,
    saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, "public")))

app.use("/api/game", gameRoutes)
app.use("/api/shop", shopRoutes)
app.use("/api", authRoutes)

app.listen(3000, () => {
    console.log("2dFleet running on http://localhost:3000")
})