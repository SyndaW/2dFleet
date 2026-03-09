import {ctx} from "../engine/canvas.js"
import {STATE} from "../engine/state.js"

export function renderTravel(){

    STATE.player.speed *= 1.02

    STATE.player.x += STATE.player.speed

    ctx.fillStyle="white"

    ctx.fillRect(
        STATE.player.x,
        STATE.player.y,
        20,
        10
    )

    ctx.fillText(
        "Speed: "+STATE.player.speed.toFixed(2),
        20,
        20
    )
}