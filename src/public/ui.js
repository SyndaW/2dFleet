import { STATE } from "./engine/state.js";

window.openMap = () => {
  STATE.screen = "map";
};

window.openTravel = () => {
  STATE.screen = "travel";
};

window.openShop = () => {
  STATE.screen = "shop";
};
