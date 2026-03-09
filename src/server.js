import express from "express"
import session from "express-session"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

import authRoutes from "./routes/auth.js"
import gameRoutes from "./routes/game.js"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET || "fleet-secret",
    resave: false,
    saveUninitialized: false
}))

app.use("/api/auth", authRoutes)
app.use("/api/game", gameRoutes)

app.use(express.static(path.join(__dirname, "public")))

app.use((req, res) => {
  res.status(404).send('Not found');
});

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`2dFleet running on port ${PORT}`)
})