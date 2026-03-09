import express from "express"

const router = express.Router()

const basePrices = {
    Food: 10,
    Textiles: 20,
    Minerals: 40,
    Machinery: 100,
    Technology: 250,
    Medicine: 150
}

const stationModifiers = {

    sol_station:{
        Food:1.0,
        Minerals:0.8,
        Technology:1.2
    },

    ac_station:{
        Food:1.3,
        Minerals:1.1,
        Technology:0.7
    }
}

router.get("/",(req,res)=>{

    const player = req.session.player
    const station = player.location

    const mod = stationModifiers[station] || {}

    const prices = {}

    for(const item in basePrices){

        const m = mod[item] || 1

        prices[item] = Math.round(basePrices[item] * m)
    }

    res.json(prices)
})

export default router