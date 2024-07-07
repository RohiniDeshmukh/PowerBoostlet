var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://rohinideshmukh.github.io/PowerBoostlet/dist/powerboost.min.js";
script.onload = run;
document.head.appendChild(script);
eval(script);

function run() {

    Powerboost.load_links();
    console.log("inside run...")
    Powerboost.load_html(() => { Powerboost.load_scripts(() => { Powerboost.load_aceEditor(); }); });


}