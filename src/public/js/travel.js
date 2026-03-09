let distance = 10000
let speed = 1

function updateTravel(){

    speed *= 1.05
    distance -= speed

    if(distance <= 0){
        arrive()
    }
}