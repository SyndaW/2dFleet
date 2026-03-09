import {ctx} from "../engine/canvas.js"
import {STATE} from "../engine/state.js"
import {keys} from "../engine/input.js"

export function renderLanding(){

    const p = STATE.player
    const dock = STATE.docking

    if(keys["ArrowUp"]) p.vy -= 0.1
    if(keys["ArrowDown"]) p.vy += 0.1
    if(keys["ArrowLeft"]) p.vx -= 0.1
    if(keys["ArrowRight"]) p.vx += 0.1

    p.x += p.vx
    p.y += p.vy

    p.vx *= 0.97
    p.vy *= 0.97

    ctx.fillStyle="#586e75"
    ctx.fillText("Dock With Station",50,50)

    ctx.strokeStyle="#859900"

    ctx.strokeRect(
        dock.targetX,
        dock.targetY,
        80,
        50
    )

    ctx.fillStyle="#268bd2"

    ctx.fillRect(p.x,p.y,20,10)

    const dx = p.x - dock.targetX
    const dy = p.y - dock.targetY

    if(Math.abs(dx) < 30 && Math.abs(dy) < 25){

        STATE.screen = "shop"
    }
}