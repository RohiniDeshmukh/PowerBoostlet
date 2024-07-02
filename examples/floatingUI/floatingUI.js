var script = document.createElement("script");
script.type = "text/javascript";
// script.src = "http://localhost:8000/dist/powerboost.min.js";
script.src ="https://raw.githubusercontent.com/RohiniDeshmukh/PowerBoostlet/dev_two/dist/powerboost.min.js";
script.onload = run;
document.head.appendChild(script);
eval(script);

function run() {

    powerboost.load_links();

    // powerboost.load_html(powerboost.load_scripts);

    powerboost.load_html(() => {
        powerboost.load_scripts(() => {
            powerboost.load_aceEditor();
        });
    });

   
}
