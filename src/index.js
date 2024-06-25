import { Powerboost } from "./powerboost.js";

// register global namespace with a new BoxCraft instance
window.powerboost = new Powerboost();
console.log("inside index.js");
window.console.log('powerboost VERSION 0.1-alpha');