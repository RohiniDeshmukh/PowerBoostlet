var editor;

function appendScriptToBody() {
  // Create a script element
  const scriptElement = document.createElement("script");

  // Set the JavaScript content to the script element
  scriptElement.textContent = `
          const nav = document.querySelector("nav");
          const toggleBtn = document.querySelector(".toggle-btn");
          toggleBtn.addEventListener("click", () => {
              nav.classList.toggle("open");
          });
          function onDrag({ movementX, movementY }) {
              const navStyle = window.getComputedStyle(nav);
              const navTop = parseInt(navStyle.top);
              const navLeft = parseInt(navStyle.left);
              const windowHeight = window.innerHeight;
              const windowWidth = window.innerWidth;
              let newTop = navTop + movementY;
              let newLeft = navLeft + movementX;
              if (newTop < 0) newTop = 0;
              else if (newTop > windowHeight - nav.offsetHeight)
                  newTop = windowHeight - nav.offsetHeight;
              if (newLeft < 0) newLeft = 0;
              else if (newLeft > windowWidth - nav.offsetWidth)
                  newLeft = windowWidth - nav.offsetWidth;
              nav.style.top = \`\${newTop}px\`;
              nav.style.left = \`\${newLeft}px\`;
          }
          nav.addEventListener("mousedown", () => {
              nav.addEventListener("mousemove", onDrag);
          });
          nav.addEventListener("mouseup", () => {
              nav.removeEventListener("mousemove", onDrag);
          });
          nav.addEventListener("mouseleave", () => {
              nav.removeEventListener("mousemove", onDrag);
          });
          
  
        // Event listeners for the machine learning, LLM, Filters, and Data Visualization buttons
        const mlBtn = document.querySelector(".rect-btn.ML");
        const mlRectBox = document.querySelector(".rect-box.ML");
        mlBtn.addEventListener("click", () => {
          mlRectBox.style.display = "flex";
        });
        const backArrowMl = document.querySelector(".back-arrow.ML");
        backArrowMl.addEventListener("click", () => {
          mlRectBox.style.display = "none";
        });
  
        const llmBtn = document.querySelector(".rect-btn.LLM");
        const llmRectBox = document.querySelector(".rect-box.LLM");
        llmBtn.addEventListener("click", () => {
          llmRectBox.style.display = "flex";
        });
        const backArrowLLM = document.querySelector(".back-arrow.LLM");
        backArrowLLM.addEventListener("click", () => {
          llmRectBox.style.display = "none";
        });
  
        const filtersBtn = document.querySelector(".rect-btn.Filters");
        const filtersRectBox = document.querySelector(".rect-box.Filters");
        filtersBtn.addEventListener("click", () => {
          filtersRectBox.style.display = "flex";
        });
        const backArrowFilters = document.querySelector(".back-arrow.Filters");
        backArrowFilters.addEventListener("click", () => {
          filtersRectBox.style.display = "none";
        });
  
        const DataVizBtn = document.querySelector(".rect-btn.DataViz");
        const DataVizRectBox = document.querySelector(".rect-box.DataViz");
        DataVizBtn.addEventListener("click", () => {
          DataVizRectBox.style.display = "flex";
        });
        const backArrowDataViz = document.querySelector(".back-arrow.DataViz");
        backArrowDataViz.addEventListener("click", () => {
          DataVizRectBox.style.display = "none";
        });
  
        function closeAllSpans() {
          document
            .querySelectorAll(
              ".nav-content .search-box, .nav-content .edit-box, .nav-content .rect-box"
            )
            .forEach(function (box) {
              box.style.display = "none";
            });
        }
  
        function toggleSpan(span) {
          if (span.style.display === "flex") {
            span.style.display = "none";
          } else {
            closeAllSpans();
            span.style.display = "flex";
          }
        }
  
        document
          .querySelector(".fa-solid.fa-magnifying-glass")
          .parentNode.addEventListener("click", function () {
            toggleSpan(document.querySelector(".search-box"));
          });
  
        document
          .querySelector(".fa-regular.fa-pen-to-square")
          .parentNode.addEventListener("click", function () {
            toggleSpan(document.querySelector(".edit-box"));
          });
  
        document
          .querySelector(".fa-sharp.fa-solid.fa-b")
          .parentNode.addEventListener("click", function () {
            toggleSpan(document.querySelector(".rect-box"));
          });
        
          
          // var editor;
          // editor = ace.edit("editor", {
          //   theme: "ace/theme/monokai",
          //   mode: "ace/mode/javascript",
          //   value: "console.log('Hello world');",
          // });
          
          async function runCode() {
            const userCode = editor.getValue();
            const outputDiv = document.getElementById("output");
            outputDiv.innerHTML = "";
          
            console.log = function (message) {
              outputDiv.innerHTML += message + "<br>";
            };
          
            try {
              eval(userCode);
            } catch (e) {
              console.log("Error: " + e.message);
            }
          }
          
        // Function to load and execute a script
        function loadScript(scriptId) {
          var script = document.createElement("script");
          script.src = scriptId;
          document.head.appendChild(script);
        }
        
        function showSuggestions(inputValue) {
          const suggestions = {
            s: [{name: "Sam", script: "https://shrutivarade.github.io/boostlet/examples/segmentanything.js"}, {name: "Sobel", script: "https://shrutivarade.github.io/boostlet/examples/sobel.js"}],
            i: [{name: "Image Captioning", script: "https://shrutivarade.github.io/boostlet/examples/imageCaptioning.js"}],
            t: [{name: "Tracko", script: "https://shrutivarade.github.io/boostlet/examples/trako.js"}],
            p: [{name: "Plotly", script: "https://shrutivarade.github.io/boostlet/examples/plotly.js"}]
          };
        
          const suggestionsContainer = document.getElementById("suggestionsContainer");
          suggestionsContainer.innerHTML = "";
        
          let matchedSuggestions = [];
          for (let key in suggestions) {
            if (key.startsWith(inputValue.toLowerCase())) {
              matchedSuggestions = matchedSuggestions.concat(suggestions[key]);
            }
          }
        
          matchedSuggestions.forEach(function(suggestion) {
            const suggestionElement = document.createElement("div");
            suggestionElement.classList.add("suggestion-item");
            suggestionElement.textContent = suggestion.name;
            suggestionElement.onclick = function() {
              document.getElementById("searchInput").value = suggestion.name;
              suggestionsContainer.innerHTML = "";
              loadScript(suggestion.script);  // Load and execute the script
            };
            suggestionsContainer.appendChild(suggestionElement);
          });
        
          suggestionsContainer.style.display = matchedSuggestions.length > 0 ? "block" : "none";
        }
        
        document.getElementById("searchInput").addEventListener("input", function(e) {
          showSuggestions(e.target.value);
        });
        
      `;

  // Append the script element to the body of the document
  document.body.appendChild(scriptElement);
}

// Call the function to append the script
appendScriptToBody();

// boostlet functionality on examples -- for loop
var scriptsToLoad = [
  {
    id: "Sobel",
    src: "https://shrutivarade.github.io/boostlet/examples/sobel.js",
  },
  {
    id: "SAM",
    src: "https://shrutivarade.github.io/boostlet/examples/segmentanything.js",
  },
  {
    id: "Plotly",
    src: "https://shrutivarade.github.io/boostlet/examples/plotly.js",
  },
  {
    id: "ImageCaptioning",
    src: "https://shrutivarade.github.io/boostlet/examples/imageCaptioning.js",
  },
  {
    id: "Trako",
    src: "https://shrutivarade.github.io/boostlet/examples/trako.js",
  },
];

scriptsToLoad.forEach(function (scriptInfo) {
  document.getElementById(scriptInfo.id).addEventListener("click", function () {
    var script = document.createElement("script");
    script.src = scriptInfo.src;
    document.head.appendChild(script);
  });
});

function loadScript(scriptSrc) {
  var script = document.createElement("script");
  script.src = scriptSrc;
  script.onload = function () {
    applySobelFilter(); // Function defined in sobel.js that applies the Sobel filter
  };
  document.head.appendChild(script);
}

// for search suggestions

// const features = {
//   "Sobel": "https://shrutivarade.github.io/boostlet/examples/sobel.js",
//   "Sam": "https://shrutivarade.github.io/boostlet/examples/segmentanything.js",
//   "Plotly": "https://shrutivarade.github.io/boostlet/examples/plotly.js",
//   "Image Captioning": "https://shrutivarade.github.io/boostlet/examples/imageCaptioning.js"
// };

// function loadExternalScript(scriptSrc, callback) {
//   var script = document.createElement("script");
//   script.type = "text/javascript";
//   script.src = scriptSrc;

//   script.onload = function () {
//     console.log(scriptSrc + " has been loaded successfully.");
//     if (callback) callback();
//   };

//   script.onerror = function () {
//     console.error("Failed to load script: " + scriptSrc);
//   };

//   document.head.appendChild(script);
// }

// Map functionality names to their respective script URLs
// const functionalityScripts = {
//   sobel: "https://shrutivarade.github.io/boostlet/examples/sobel.js",
//   sam: "https://shrutivarade.github.io/boostlet/examples/segmentanything.js",
//   imageCaptioning: "https://shrutivarade.github.io/boostlet/examples/imageCaptioning.js",
//   plotly: "https://shrutivarade.github.io/boostlet/examples/plotly.js",
// };

function loadExternalScript(scriptSrc, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = scriptSrc;

  script.onload = function () {
    console.log(scriptSrc + " has been loaded successfully.");
    if (callback) callback();
  };

  script.onerror = function () {
    console.error("Failed to load script: " + scriptSrc);
  };

  document.head.appendChild(script);
}

const functionalityScripts = {
  Sobel: "https://shrutivarade.github.io/boostlet/examples/sobel.js",
  Sam: "https://shrutivarade.github.io/boostlet/examples/segmentanything.js",
  "Image Captioning":
    "https://shrutivarade.github.io/boostlet/examples/imageCaptioning.js",
  Plotly: "https://shrutivarade.github.io/boostlet/examples/plotly.js",
};

// search suggestion working
function applySelectedFunctionality() {
  const selector = document.getElementById("functionalitySelector");
  const selectedFunctionality = selector.value;
  const scriptUrl = functionalityScripts[selectedFunctionality];
  if (scriptUrl) {
    loadExternalScript(scriptUrl, function () {
      console.log(selectedFunctionality + " functionality has been applied.");
    });
  } else {
    console.error("No script URL found for selected functionality.");
  }
}
