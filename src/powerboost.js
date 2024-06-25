let editor;
import { Util } from "./util.js";

export class Powerboost {
  constructor() {
    console.log("inside powerboost.js");
    this.editor = null;
  }

  init() {
    //load css links
    Util.load_Links(
      "stylesheet",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
    );
    Util.load_Links(
      "stylesheet",
      "http://localhost:8000/examples/floatingUI/floatingUI.css"
    );

    //load script links
    
    Util.load_Scripts("https://boostlet.org/dist/boostlet.min.js");
    Util.load_Scripts(
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.33.0/ace.js",
      true,
      () => {
        this.editor = ace.edit("editor", {
          theme: "ace/theme/monokai",
          mode: "ace/mode/javascript",
        });
      }
    );
    Util.load_Scripts("http://localhost:8000/examples/floatingUI/script.js");
  }

  load_Html() {
    fetch("http://localhost:8000/examples/floatingUI/floatingUI.html")
      .then((response) => response.text())
      .then((htmlContent) => {
        const template = document.createElement("template");
        template.innerHTML = htmlContent.trim();
        document.body.appendChild(template.content.firstChild);
      })
      .catch((error) => console.error("Error loading HTML content:", error));
  }
}


