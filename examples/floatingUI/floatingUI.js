var script = document.createElement("script");
script.type = "text/javascript";
script.src = "http://localhost:8000/dist/powerboostlet.min.js";
script.onload = run;
document.head.appendChild(script);
eval(script);
console.log("inside floatingUI.js");

function run() {
  //load URLs
  powerboost.init();

    //load html
  powerboost.load_Html();
}
