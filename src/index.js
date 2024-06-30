import { Powerboost } from "./powerboost.js";

// register global namespace with a new powerboost instance
window.powerboost = new Powerboost();
window.console.log('powerboost VERSION 0.1-alpha');