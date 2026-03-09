import express from "express"
import { createPlayer } from "../game/player.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const universe = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/universe.json"))
)

router.get("/start", (req,res)=>{

    if(!req.session.player){
        req.session.player = createPlayer()
    }

    res.json(req.session.player)
})

router.get("/universe",(req,res)=>{
    res.json(universe)
})

router.post("/travel",(req,res)=>{

    const {system} = req.body
    const player = req.session.player

    const current = universe[player.system]

    const neighbor = current.neighbors.find(n => n.id === system)

    if(!neighbor)
        return res.status(400).json({error:"System unreachable"})

    const fuelCost = neighbor.distance * 10

    if(player.fuel < fuelCost)
        return res.status(400).json({error:"Not enough fuel"})

    player.fuel -= fuelCost
    player.system = system
    player.location = null

    res.json(player)
})

router.post("/dock",(req,res)=>{

    const {station} = req.body
    const player = req.session.player

    player.location = station

    res.json({success:true})
})

export default router