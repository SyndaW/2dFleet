import express from "express"
import JsonDB from "simple-json-db"

const router = express.Router()

const users = new JsonDB("./data/users.json")
const universe = new JsonDB("./data/universe.json")

function auth(req,res,next){

    if(!req.session.user)
        return res.status(401).json({error:"Unauthorized"})

    next()
}

router.get("/player",auth,(req,res)=>{

    const player = users.get(req.session.user)

    res.json(player)
})

router.get("/system/:id",auth,(req,res)=>{

    const system = universe.get(req.params.id)

    res.json(system)
})

export default router