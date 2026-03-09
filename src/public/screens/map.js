import {ctx} from "../engine/canvas.js"
import {STATE} from "../engine/state.js"
import {keys} from "../engine/input.js"

let index = 0

async function loadUniverse(){

    if(!STATE.universe){

        const res = await fetch("/api/game/universe")

        STATE.universe = await res.json()

        let x = 300

        for(const id in STATE.universe){

            STATE.systems.push({
                id,
                x,
                y:300
            })

            x += 350
        }
    }
}

export async function renderMap(){

    await loadUniverse()

    ctx.fillStyle="#586e75"

    ctx.fillText("GALAXY MAP",50,50)
    ctx.fillText("Arrow Keys: Select System",50,80)
    ctx.fillText("T: Jump",50,110)

    STATE.systems.forEach((sys,i)=>{

        const star = STATE.universe[sys.id]

        ctx.fillStyle = i===index ? "#dc322f" : "#b58900"

        ctx.beginPath()
        ctx.arc(sys.x,sys.y,20,0,Math.PI*2)
        ctx.fill()

        ctx.fillStyle="#586e75"

        ctx.fillText(star.name,sys.x-40,sys.y+40)

    })

    if(keys["ArrowRight"])
        index = Math.min(index+1, STATE.systems.length-1)

    if(keys["ArrowLeft"])
        index = Math.max(index-1,0)

    const selected = STATE.systems[index]

    STATE.selectedSystem = selected.id

    if(keys["t"]){

        STATE.destination = selected.id

        STATE.screen = "travel"

        STATE.player.speed = 1
    }
}