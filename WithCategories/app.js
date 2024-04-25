const baseurl = 'http://localhost:5501/examples/';
// 'https://api.github.com/repos/mpsych/boostlet/contents/examples';
const downloadurl = '"https://raw.githubusercontent.com/mpsych/boostlet/main/examples/'
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
  fetch(baseurl)
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
  script.src = baseurl + fileName + '.js';
  document.head.appendChild(script);

}
