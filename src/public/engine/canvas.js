export const canvas = document.getElementById("game")
export const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

export function clear(){

    ctx.fillStyle = "black"
    ctx.fillRect(0,0,canvas.width,canvas.height)
}