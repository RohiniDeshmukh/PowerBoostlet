var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://raw.githubusercontent.com/RohiniDeshmukh/PowerBoostlet/main/dist/powerboost.min.js";
console.log("it is working on my system ")
document.head.appendChild(script);
script.onload = run();
eval(script);

function run() {

    powerboost.load_links();
    console.log("inside run...")
    powerboost.load_html(() => { powerboost.load_scripts(() => { powerboost.load_aceEditor(); }); });


}