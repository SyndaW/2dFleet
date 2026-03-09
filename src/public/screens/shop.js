import {ctx} from "../engine/canvas.js"

export function renderShop(){

    ctx.fillStyle="white"

    ctx.fillText("Station Market",50,50)

    ctx.fillText("Food",50,120)
    ctx.fillText("Textiles",50,150)
    ctx.fillText("Minerals",50,180)
}