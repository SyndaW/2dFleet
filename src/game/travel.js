const MAX_SPEED = 30000000000000000

export function calculateTravel(distanceLY){

    const meters = distanceLY * 9.461e15

    let speed = 1
    let time = 0
    let distance = meters

    while(distance > 0){

        speed *= 1.08

        if(speed > MAX_SPEED)
            speed = MAX_SPEED

        distance -= speed

        time++
    }

    return time
}