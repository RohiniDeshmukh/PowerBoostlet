// Function to append tags to the head of the document
function appendTagsToHead() {
  // Create and append the first link tag
  var link1 = document.createElement("link");
  link1.rel = "stylesheet";
  link1.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css";
  document.head.appendChild(link1);

  // Create and append the second link tag
  var link2 = document.createElement("link");
  link2.rel = "stylesheet";
  //   link2.href = "http://localhost:8000/style.css";
  link2.href = "https://rohinideshmukh.github.io/PowerBoostlet/style.css";
  document.head.appendChild(link2);

  // Create and append the first script tag
  var script1 = document.createElement("script");
  script1.src = "https://boostlet.org/dist/boostlet.min.js";
  document.head.appendChild(script1);

  // Create and append the second script tag
  var script2 = document.createElement("script");
  script2.src = "https://cdnjs.cloudflare.com/ajax/libs/ace/1.33.0/ace.js";
  script2.async = true; // Setting the script to load asynchronously
  script2.onload = function () {
    editor = ace.edit("editor", {
      theme: "ace/theme/monokai",
      mode: "ace/mode/javascript",
    });
  };
  document.head.appendChild(script2);

  // Create and append the third script tag
  var script3 = document.createElement("script");
  //   script3.src = "http://localhost:8000/script.js";
  script3.src = "https://rohinideshmukh.github.io/PowerBoostlet/script.js";
  document.head.appendChild(script3);
}
// Call the function to append tags
appendTagsToHead();

// Function to append the provided HTML to the body of the document
function appendHtmlToBody() {
  // Define the HTML content as a template string
  const htmlContent = `
        <nav>
            <div class="nav-content">
                <div class="toggle-btn">
                    <i class="fas fa-plus"></i>
                </div>
                <span class="myspan" style="--i: 2">
                    <a href="#"><i class="fa-solid fa-magnifying-glass"></i></a>
                    <div class="search-box">
                   
                        <datalist id="suggestions">
                            <option value="Sobel"></option>
                            <option value="Sam"></option>
                            <option value="Image Captioning"></option>
                            <option value="Plotly"></option>
                            <option value="Tracko"></option>
                            
                        </datalist>
    
                       
                        <input list="functionalityOptions" id="functionalitySelector" placeholder="Type to search functionality...">
    <datalist id="functionalityOptions">
        <option value="Sobel">Sobel</option>
        <option value="Sam">Sam</option>
        <option value="Image Captioning">Image Captioning</option>
        <option value="Plotly">Plotly</option>
    </datalist>
    <button onclick="applySelectedFunctionality()">Apply </button>
    
                      
                    </div>
                </span>
                <div class="search-box">
                    <input type="text" id="searchInput" placeholder="Search..." oninput="showSuggestions(this.value)" autocomplete="off"/>
                    <div id="suggestionsContainer" class="suggestions"></div>
                </div>
                <span class="myspan" style="--i: 3">
                    <a href="#"><i class="fa-regular fa-pen-to-square"></i></a>
                    <div class="edit-box">
                        <div id="editor">console.log(Boostlet.init());</div>
                        <button onclick="runCode()">Run Code</button>
                        <div id="output"></div>
                    </div>
                </span>
                <span class="myspan" style="--i: 4">
                    <a href="#"><i class="fa-sharp fa-solid fa-b"></i></a>
                    <div class="rect-box">
                        <div class="button-row">
                            <button class="rect-btn ML">Machine Learning</button>
                            <button class="rect-btn LLM">LLM Models</button>
                        </div>
                        <div class="button-row">
                            <button class="rect-btn Filters">Filters</button>
                            <button class="rect-btn DataViz">Data visualisation</button>
                        </div>
                    </div>
                    <div class="rect-box ML">
                        <div class="button-row">
                            <button class="rect-btn" id="SAM">SAM</button>
                            <button class="rect-btn" id="Melanoma">Melanoma</button>
                        </div>
                        <div class="button-row">
                            <div class="back-arrow ML">
                                <i class="fa-solid fa-arrow-left"></i>
                            </div>
                        </div>
                    </div>
                    <div class="rect-box LLM">
                        <div class="button-row">
                            <button class="rect-btn" id="ImageCaptioning">Image Captioning</button>
                        </div>
                        <div class="button-row">
                            <div class="back-arrow LLM">
                                <i class="fa-solid fa-arrow-left"></i>
                            </div>
                        </div>
                    </div>
                    <div class="rect-box Filters">
                        <div class="button-row">
                            <button class="rect-btn" id="Sobel">Sobel</button>
                            <button class="rect-btn" id="Trako">Trako</button>
                        </div>
                        <div class="button-row">
                            <div class="back-arrow Filters">
                                <i class="fa-solid fa-arrow-left"></i>
                            </div>
                        </div>
                    </div>
                    <div class="rect-box DataViz">
                        <div class="button-row">
                            <button class="rect-btn" id="Plotly">Plotly</button>
                        </div>
                        <div the "button-row">
                            <div class="back-arrow DataViz">
                                <i class="fa-solid fa-arrow-left"></i>
                            </div>
                        </div>
                    </div>
                </span>
            </div>
        </nav>`;

  // Convert the HTML string to a DOM element
  const template = document.createElement("template");
  template.innerHTML = htmlContent.trim(); // Never return a text node of whitespace as the result

  // Append the content to the body
  document.body.appendChild(template.content.firstChild);
}
// Call the function to append HTML
appendHtmlToBody();
