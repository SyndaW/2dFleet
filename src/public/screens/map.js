import {ctx} from "../engine/canvas.js"
import {STATE} from "../engine/state.js"

export function renderMap(){

    ctx.fillStyle="white"
    ctx.fillText("Solar System Map",50,50)

    ctx.beginPath()
    ctx.arc(300,300,20,0,Math.PI*2)
    ctx.fill()

    ctx.fillText("Station",280,340)
}