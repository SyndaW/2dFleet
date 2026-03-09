import {ctx} from "../engine/canvas.js"
import {STATE} from "../engine/state.js"
import {keys} from "../engine/input.js"

export function renderShop(){

    ctx.fillStyle="#586e75"

    ctx.fillText("STATION MARKET",50,50)

    ctx.fillText("Credits: "+STATE.credits,50,80)

    ctx.fillText("1 Buy Food (10)",50,140)
    ctx.fillText("2 Buy Minerals (40)",50,170)

    ctx.fillText("M Return to Galaxy Map",50,220)

    if(keys["1"]){

        if(STATE.credits >= 10){

            STATE.credits -= 10

            STATE.cargo.food = (STATE.cargo.food||0)+1
        }
    }

    if(keys["2"]){

        if(STATE.credits >= 40){

            STATE.credits -= 40

            STATE.cargo.minerals = (STATE.cargo.minerals||0)+1
        }
    }

    if(keys["m"]){

        STATE.screen="map"
    }
}