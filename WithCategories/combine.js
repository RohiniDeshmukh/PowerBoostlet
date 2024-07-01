// Single JavaScript file containing both HTML and JavaScript code

// HTML content as a string
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PowerBoostlet</title>

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
    />

    <style> 
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    min-height: 100vh;
    background-color: #1111;
    overflow: hidden;
  }
  
  nav {
    position: fixed;
    top: 20px;
    right: 0;
    right: calc(100% - 100px);
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
    left: 0;
  }
  
  nav .nav-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .nav-content .toggle-btn,
  .nav-content span a {
    height: 60px;
    width: 60px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
  
  .nav-content .toggle-btn {
    font-size: 35px;
    color: #0e2431;
    z-index: 100;
    cursor: pointer;
    transition: all 0.6s ease;
  }
  
  .nav-content .myspan {
    position: absolute;
    transition: all 0.6s ease;
    opacity: 0;
  }
  
  nav.open .nav-content span {
    opacity: 1;
    transform: translateX(calc(var(--i) * 80px));
  }
  
  .nav-content span a {
    text-decoration: none;
  }
  
  .nav-content span a i {
    font-size: 24px;
    color: #0e2431;
    opacity: 0.8;
    transition: 0.2s;
  }
  
  .nav-content span a:hover i {
    opacity: 1;
  }
  
  /* 1 */
  .search-box {
    position: absolute;
    top: 130%;
    width: 200px;
    height: 60px;
    background-color: white;
    border-radius: 10px;
    display: none;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .search-box.show {
    display: flex;
  }
  
  input[type="text"] {
    width: 80%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 5px;
  }
  
  /* 2 */
  .rect-box {
    position: absolute;
    top: 130%;
    width: 300px;
    height: 150px;
    background-color: rgb(250, 250, 255);
    border-radius: 10px;
    display: none;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex-direction: column;
  }
  
  .rect-box.show {
    display: flex;
  }
  
  .rect-box .rect-btn {
    padding: 8px 16px;
    margin: 4px;
    box-sizing: border-box;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #0e2431;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .edit-box {
    position: absolute;
    top: 130%;
    width: 700px;
    height: 200px;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  #editor {
    position: relative;
    height: 100%;
    width: 100%;
    border: 1px solid lightgray;
    margin: auto;
  }
  
  #output {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    padding: 5px;
    overflow: auto;
  }
  
  #suggestionsContainer {
    background-color: white;
    border: 1px solid #ccc;
    border-top: none;
    position: absolute;
    width: 100%;
    box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.25);
    z-index: 5;
  }
  
  
  .suggestion-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }
  
  .suggestion-item:hover {
    background-color: #f0f0f0;
  }
  
  
  /* Style for boostlet categories */
  .boostlet-categories {
    position: absolute;
    top: 100%;
    left: 0;
    display: none;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 1000;
  }
  
  .scrollable-container {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 1000;
  }
  
  
  .file-container {
    display: none; /* Initially hide file buttons */
    
  }
  
  /* Style for boostlet categories */
  .boostlet-categories {
    position: absolute;
    top: 100%;
    left: 0;
    display: flex;
    flex-wrap: wrap; /* Allow categories to wrap */
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 1000;
  }
  
  .category-container {
    flex: 0 0 calc(33.33% - 20px); /* Adjust as needed for the number of categories per row */
    margin-bottom: 20px;
    transition: all 0.3s ease;
  }
  
  .rect-btn {
    /* Adjust button styles to ensure equal dimensions */
    width: 150px; /* Set a fixed width for each button */
    height: 50px; /* Set a fixed height for each button */
    border: 1px solid #ccc;
    background-color: #f0f0f0;
    color: #333;
    padding: 5px 10px;
    margin: 0;
  }
  
  .boostlet-popup {
    position: absolute;
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 999;
    display: none; /* Initially hide the popup */
  }
  
  .boostlet-popup.open {
    display: block; /* Show the popup when open */
  }
  
  
  .rect-btn {
    /* Updated button styles */
    width: 200px;
    height: 60px;
    border: none;
    background-color: #0e2431;
    color: #fff;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .rect-btn:hover {
    background-color: #1a3b4f;
    transform: translateY(-3px);
  }
  
  .back-arrow {
    display: none; 
    position: relative; /* Change position to relative */
    display: none; /* Hide back button initially */
    background-color: #0e2431;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .back-arrow:hover {
    background-color: #1a3b4f;
    transform: translateY(-3px);
  }
    </style>
    <!-- <script src="https://boostlet.org/dist/boostlet.min.js"></script> -->
    <script src="http://localhost:5501/dist/boostlet.min.js"></script>
  </head>

  <body>
    <nav>
      <div class="nav-content">
        <div class="toggle-btn">
          <i class="fas fa-plus"></i>
        </div>

        <span class="myspan" style="--i: 2">
          <a href="#"><i class="fa-solid fa-magnifying-glass"></i></a>
          <div class="search-box">
            <input
              type="text"
              placeholder="Search..."
              id="searchInput"
              list="suggestions"
            />
            <datalist id="suggestions">
              <option value="Sobel"></option>
              <option value="Sam"></option>
              <option value="Image Captioning"></option>
              <option value="Plotly"></option>
              <option value="Tracko"></option>
              <option value="Cactus"></option>
            </datalist>
          </div>
        </span>

        <div class="search-box">
          <input
            type="text"
            id="searchInput"
            placeholder="Search..."
            oninput="showSuggestions(this.value)"
            autocomplete="off"
          />
          <div id="suggestionsContainer" class="suggestions"></div>
        </div>

        <!-- ***************** -->

        <span class="myspan" style="--i: 3">
          <a href="#"><i class="fa-regular fa-pen-to-square"></i></a>
          <div class="edit-box">
            <div id="editor">console.log(Boostlet.init());</div>
            <!-- <div id="editor">console.log(Boostlet.getImage());</div> -->
            <button onclick="runCode()">Run Code</button>
            <div id="output"></div>
          </div>
        </span>

        <!-- Update the Boostlet tab with an ID -->
        <span class="myspan" id="boostletTab" style="--i: 4">
          <a href="#" class="boostlet-toggle"><i class="fa-sharp fa-solid fa-b"></i></a>
          <div class="boostlet-categories">
            <!-- Add boostlet popup -->
            <div class="boostlet-popup"></div>
            <div class="scrollable-container"></div> <!-- Scrollable container for boostlet buttons -->
            <!-- Add back button -->
            <button class="back-arrow"><i class="fa-solid fa-arrow-left"></i> </button>
          </div>
        </span>
      </div>
    </nav>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.33.0/ace.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/ace-builds@1.33.0/src-min-noconflict/theme-chrome.min.js"></script>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/ace-builds@1.33.0/css/ace.min.css"
    />

  </body>
</html>
`;

// Inject the HTML content into the document body
document.body.innerHTML = htmlContent;

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

  // Vertical movement boundaries
  if (newTop < 0) newTop = 0;
  else if (newTop > windowHeight - nav.offsetHeight)
    newTop = windowHeight - nav.offsetHeight;

  // Horizontal movement boundaries
  if (newLeft < 0) newLeft = 0;
  else if (newLeft > windowWidth - nav.offsetWidth)
    newLeft = windowWidth - nav.offsetWidth;

  // Set the new top and left values
  nav.style.top = `${newTop}px`;
  nav.style.left = `${newLeft}px`;
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


function closeAllSpans() {
  document
    .querySelectorAll(
      ".nav-content .search-box, .nav-content .edit-box, .nav-content .rect-box .boostlet-categories"
    )
    .forEach(function (box) {
      box.style.display = "none";
    });
}

// Function to toggle a span element
function toggleSpan(span) {
  // If the clicked span is already open, close it
  if (span.style.display === "flex") {
    span.style.display = "none";
  } else {
    // Close all spans first
    closeAllSpans();
    // Then open the clicked span
    span.style.display = "flex";
  }
}
// Add event listeners to each icon to toggle the corresponding span
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

// Add event listener to the boostlet toggle anchor tag
document.getElementById("boostletTab").addEventListener("click", function () {
  // Toggle the boostlet categories span
  toggleSpan(document.querySelector(".boostlet-categories"));
});


// *********************** for edit box  icon ******************************

var editor;
document.addEventListener("DOMContentLoaded", function () {
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
  // Add an event listener for the Boostlet tab
  document.getElementById("boostletTab").addEventListener("click", function () {
    // Call fetchBoostletFiles() when the Boostlet tab is clicked
    fetchBoostletFiles();
});
  
});

function runCode() {
  const userCode = editor.getValue(); // Get the code from the editor
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";

  // Capture console.log output
  console.log = function (message) {
    outputDiv.innerHTML += message + "<br>";
  };

  try {
    eval(userCode);
  } catch (e) {
    console.log("Error: " + e.message);
  }
}

// Function to show suggestions based on the input
function showSuggestions(inputValue) {
  const suggestions = {
    s: ["Sam", "Sobel"],
    S: ["Sam", "Sobel"],
    i: ["Image Captioning"],
    I: ["Image Captioning"],
    t: ["Tracko"],
    T: ["Tracko"],
    p: ["plotly"],
    P: ["plotly"],
    c: ["Cactus"],
    C: ["Cactus"],
  };

  const suggestionsContainer = document.getElementById("suggestionsContainer");

  suggestionsContainer.innerHTML = "";

  // Find suggestions that start with the input value
  let matchedSuggestions = [];
  for (let key in suggestions) {
    if (key.startsWith(inputValue.toLowerCase())) {
      matchedSuggestions = matchedSuggestions.concat(suggestions[key]);
    }
  }

  // Create the suggestion elements and add them to the suggestions container
  matchedSuggestions.forEach(function (suggestion) {
    const suggestionElement = document.createElement("div");
    suggestionElement.classList.add("suggestion-item");
    suggestionElement.textContent = suggestion;
    suggestionElement.onclick = function () {
      document.getElementById("searchInput").value = suggestion;
      suggestionsContainer.innerHTML = ""; // Clear suggestions after selection
    };
    suggestionsContainer.appendChild(suggestionElement);
  });

  // Show suggestions if there are any matches
  if (matchedSuggestions.length > 0) {
    suggestionsContainer.style.display = "block";
  } else {
    suggestionsContainer.style.display = "none";
  }
}

// Call the showSuggestions function whenever the input value changes
document.getElementById("searchInput").addEventListener("input", function (e) {
  showSuggestions(e.target.value);
});


function fetchBoostletFiles() {
  fetch('http://localhost:5501/examples/')
      .then(response => response.text())
      .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const boostletFiles = doc.querySelectorAll('a[href$=".js"]');

          const filesByCategory = {};

          // Fetch the category for each file and organize them by category
          Promise.all(Array.from(boostletFiles).map(file => {
              const fileName = file.getAttribute('href');
              const fileName_edit = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.lastIndexOf('.'));
              return getCategoryFromFile(fileName_edit)
                  .then(category => {
                      if (!filesByCategory[category]) {
                          filesByCategory[category] = []; // Initialize category array if not exists
                      }
                      filesByCategory[category].push(fileName_edit);
                  });
          })).then(() => {
              const filesContainer = document.querySelector('.boostlet-categories .scrollable-container');
              filesContainer.innerHTML = ""; // Clear existing buttons

              // Create buttons for each category
              for (const category in filesByCategory) {
                  createCategoryButton(category, filesByCategory[category], filesContainer);
              }
          });
      })
      .catch(error => {
          console.error('Error fetching Boostlet files:', error);
      });
}


function getCategoryFromFile(fileName) {
  return fetch('http://localhost:5501/examples/' + fileName + '.js')
      .then(response => response.text())
      .then(scriptText => {
          // Extract the category from the script text
          const categoryRegex = /let\s+category\s*=\s*["']([^"']+)["']/;
          const match = categoryRegex.exec(scriptText);
          return match ? match[1] : "Others"; // Return the captured category or default to "Others"
      })
      .catch(error => {
          console.error('Error fetching file:', error);
          return "Others"; // If an error occurs, default to "Others"
      });
}
function createCategoryButton(categoryName, files, container) {
  const categoryContainer = document.createElement('div'); // Create a container for the category
  categoryContainer.classList.add('category-container');
  
  const button = document.createElement('button');
  button.textContent = categoryName;
  button.classList.add('rect-btn');
  button.addEventListener('click', (event) => {
    console.log(`Clicked category: ${categoryName}`);
    // Toggle the visibility of file buttons under this category
    toggleFileButtons(categoryContainer);
    // Prevent the click event from propagating to the parent span
    event.stopPropagation();
});
  categoryContainer.appendChild(button);
  
  const filesContainer = document.createElement('div'); // Create a container for file buttons
  filesContainer.classList.add('file-container');

  // Create file buttons for each file under the category
  files.forEach((fileName, index) => {
      const fileButton = document.createElement('button');
      fileButton.textContent = fileName;
      fileButton.classList.add('rect-btn');
      fileButton.addEventListener('click', () => {
          console.log(`Clicked file: ${fileName}`);
          // Trigger the run function for the clicked file
          run(fileName);
      });
      filesContainer.appendChild(fileButton);
  });

  // Initially hide the file buttons container
  filesContainer.style.display = 'none';

  categoryContainer.appendChild(filesContainer); // Append file buttons container to category container
  
  // Append category container to main container
  container.appendChild(categoryContainer); 

  // Create boostlet popup for each category
  const boostletPopup = document.createElement('div');
  boostletPopup.classList.add('boostlet-popup');
  boostletPopup.innerHTML = files.map(fileName => `<div>${fileName}</div>`).join('');
  container.appendChild(boostletPopup);
}


function toggleCategoryButtons(categoryContainer) {
  const categories = document.querySelectorAll('.category-container');
  categories.forEach(function(cat) {
    if (cat !== categoryContainer) {
      cat.style.display = 'none'; // Hide other category buttons
    }
  });
}

function toggleFileButtons(categoryContainer) {
  const filesContainer = categoryContainer.querySelector('.file-container');
  const boostletPopup = document.querySelector('.boostlet-popup');
  
  if (filesContainer.style.display === 'none' || filesContainer.style.display === '') {
    // Show files container and expand category container
    filesContainer.style.display = 'block';
    categoryContainer.style.height = `${categoryContainer.scrollHeight}px`;
    boostletPopup.classList.add('open'); // Show the boostlet popup
    // Hide other category buttons
    toggleCategoryButtons(categoryContainer);
  } else {
    // Hide files container and collapse category container
    filesContainer.style.display = 'none';
    categoryContainer.style.height = '';
    boostletPopup.classList.remove('open'); // Hide the boostlet popup
    // Show all category buttons
    const categories = document.querySelectorAll('.category-container');
    categories.forEach(function(cat) {
      cat.style.display = 'block';
    });
  }
}

// Function to run the Boostlet script
function run(fileName) {
  // Load and run the Boostlet script corresponding to the clicked file
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `http://localhost:5501/examples/${fileName}.js`;
  document.head.appendChild(script);

}
