import { Util } from "./util.js";

export class Powerboost {
  constructor() {
    this.editor = null;
  }

  load_links() {
    //load css links
    Util.load_Links("stylesheet", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css");
    // Util.load_Links("stylesheet", "http://localhost:8000/examples/floatingUI/style.css");
    Util.load_Links("stylesheet", "https://raw.githubusercontent.com/RohiniDeshmukh/PowerBoostlet/dev_two/examples/floatingUI/style.css");


  }

  load_html(callback) {
    console.log("Loading HTML...");

    // fetch("http://localhost:8000/examples/floatingUI/index.html")
    fetch("https://raw.githubusercontent.com/RohiniDeshmukh/PowerBoostlet/dev_two/examples/floatingUI/index.html")
      .then((response) => response.text())
      .then((htmlContent) => {
        const template = document.createElement("template");
        template.innerHTML = htmlContent.trim();
        document.body.appendChild(template.content.firstChild);
      })
      .catch((error) => console.error("Error loading HTML content:", error));

    // Simulate an asynchronous operation using setTimeout
    setTimeout(function () {
      console.log("HTML loaded.");

      // Call the callback function after HTML is loaded
      callback();
    }, 10);
  }

  load_scripts(callback) {
    console.log("Loading scripts...");
    Util.load_Scripts("https://boostlet.org/dist/boostlet.min.js", "head");
    Util.load_Scripts("https://cdnjs.cloudflare.com/ajax/libs/ace/1.33.0/ace.js", "head");
    Util.load_Scripts("https://raw.githubusercontent.com/RohiniDeshmukh/PowerBoostlet/dev_two/examples/floatingUI/script.js", "body");
    // Util.load_Scripts("http://localhost:8000/examples/floatingUI/script.js","body");

    // Simulate an asynchronous operation using setTimeout
    setTimeout(function () {
      console.log("Scripts loaded.");
      callback();
    }, 100);
  }

  load_aceEditor() {
    Util.load_ace();
  }


}


