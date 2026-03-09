import express from "express"
import bcrypt from "bcryptjs"
import JsonDB from "simple-json-db"

const router = express.Router()
const db = new JsonDB("./data/users.json")

router.post("/register", async (req,res)=>{

    const {username,password} = req.body

    if(db.has(username))
        return res.status(400).json({error:"User exists"})

    const hash = await bcrypt.hash(password,10)

    db.set(username,{
        password:hash,
        credits:1000,
        cargo:{},
        location:"sol_station"
    })

    res.json({success:true})
})

router.post("/login", async (req,res)=>{

    const {username,password} = req.body

    if(!db.has(username))
        return res.status(404).json({error:"User not found"})

    const user = db.get(username)

    const valid = await bcrypt.compare(password,user.password)

    if(!valid)
        return res.status(401).json({error:"Invalid password"})

    req.session.user = username

    res.json({success:true})
})

export default router