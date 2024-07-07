var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://raw.githubusercontent.com/RohiniDeshmukh/PowerBoostlet/main/dist/powerboost.min.js";
script.onload = run;
document.head.appendChild(script);
eval(script);

function run() {

    powerboost.load_links();



    powerboost.load_html(() => { powerboost.load_scripts(() => { powerboost.load_aceEditor(); }); });


}