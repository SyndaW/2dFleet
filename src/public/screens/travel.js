import {ctx} from "../engine/canvas.js"
import {STATE} from "../engine/state.js"

const MAX_SPEED = 30000000000000000

let distance = 9.461e15 * 4.2
let speed = 1

export function renderTravel(){

    speed *= 1.05

    if(speed > MAX_SPEED)
        speed = MAX_SPEED

    distance -= speed

    ctx.fillStyle="#586e75"

    ctx.fillText("HYPERSPACE JUMP",50,50)

    ctx.fillText("Speed: "+speed.toExponential(2)+" m/s",50,90)

    ctx.fillText("Distance Remaining:",50,130)
    ctx.fillText(distance.toExponential(2)+" meters",50,160)

    ctx.fillText("Fuel: "+STATE.fuel,50,200)

    ctx.fillStyle="#268bd2"

    ctx.fillRect(400,300,20,10)

    if(distance <= 0){

        distance = 9.461e15 * 4.2

        speed = 1

        STATE.screen="landing"

        STATE.player.x=100
        STATE.player.y=300
    }
}