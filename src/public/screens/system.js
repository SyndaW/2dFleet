import {ctx} from "../engine/canvas.js"
import {STATE} from "../engine/state.js"

export function renderSystem(){

    const system = STATE.universe[STATE.selectedSystem]

    ctx.fillStyle="#586e75"

    ctx.fillText(system.name+" System",50,50)

    ctx.fillStyle="#b58900"

    ctx.beginPath()
    ctx.arc(500,300,30,0,Math.PI*2)
    ctx.fill()

    system.planets.forEach((p,i)=>{

        ctx.beginPath()
        ctx.arc(500,350+i*40,8,0,Math.PI*2)
        ctx.fill()

        ctx.fillText(p,520,350+i*40)
    })
}