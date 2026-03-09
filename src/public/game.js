import "./engine/input.js"

import {clear} from "./engine/canvas.js"
import {STATE} from "./engine/state.js"

import {renderLanding} from "./screens/landing.js"
import {renderMap} from "./screens/map.js"
import {renderTravel} from "./screens/travel.js"
import {renderShop} from "./screens/shop.js"
import {renderSystem} from "./screens/system.js"

function loop(){

    clear()

    switch(STATE.screen){

        case "landing":
            renderLanding()
            break

        case "map":
            renderMap()
            break

        case "travel":
            renderTravel()
            break

        case "shop":
            renderShop()
            break
        case "system":
            renderSystem()
            break
    }

    requestAnimationFrame(loop)
}

loop()