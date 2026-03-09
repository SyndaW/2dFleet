let ship = {x:50,y:250,vx:0,vy:0}

function updateDocking(){

    if(keys["ArrowUp"]) ship.vy -= 0.1
    if(keys["ArrowDown"]) ship.vy += 0.1

    ship.y += ship.vy

    if(Math.abs(ship.y-250) < 10 && ship.x > 800){
        dockSuccess()
    }

}