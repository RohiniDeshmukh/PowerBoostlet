var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://raw.githubusercontent.com/RohiniDeshmukh/PowerBoostlet/main/dist/powerboost.min.js";
console.log("it is working on my system ")
document.head.appendChild(script);
script.onload = run();
eval(script);

function run() {

    Powerboost.load_links();
    console.log("inside run...")
    Powerboost.load_html(() => { Powerboost.load_scripts(() => { Powerboost.load_aceEditor(); }); });


}