import {ctx} from "../engine/canvas.js"
import {STATE} from "../engine/state.js"

export function renderLanding(){

    ctx.fillStyle="white"

    ctx.fillText("Docking Sequence",50,50)

    ctx.fillRect(400,300,100,50)

    ctx.fillRect(
        STATE.player.x,
        STATE.player.y,
        20,
        10
    )
}