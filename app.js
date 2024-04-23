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

// *********************** for boostlet icon ******************************
//on clicking ML
const mlBtn = document.querySelector(".rect-btn.ML");
const mlRectBox = document.querySelector(".rect-box.ML");

mlBtn.addEventListener("click", () => {
  mlRectBox.style.display = "flex";
});
const backArrowMl = document.querySelector(".back-arrow.ML");
backArrowMl.addEventListener("click", () => {
  mlRectBox.style.display = "none";
});

//on clicking LLM

const llmBtn = document.querySelector(".rect-btn.LLM");
const llmRectBox = document.querySelector(".rect-box.LLM");
llmBtn.addEventListener("click", () => {
  llmRectBox.style.display = "flex";
});
const backArrowLLM = document.querySelector(".back-arrow.LLM");
backArrowLLM.addEventListener("click", () => {
  llmRectBox.style.display = "none";
});

//on clicking Filters

const filtersBtn = document.querySelector(".rect-btn.Filters");
const filtersRectBox = document.querySelector(".rect-box.Filters");
filtersBtn.addEventListener("click", () => {
  filtersRectBox.style.display = "flex";
});
const backArrowFilters = document.querySelector(".back-arrow.Filters");
backArrowFilters.addEventListener("click", () => {
  filtersRectBox.style.display = "none";
});

//on clicking Data Viz

const DataVizBtn = document.querySelector(".rect-btn.DataViz");
const DataVizRectBox = document.querySelector(".rect-box.DataViz");
DataVizBtn.addEventListener("click", () => {
  DataVizRectBox.style.display = "flex";
});
const backArrowDataViz = document.querySelector(".back-arrow.DataViz");
backArrowDataViz.addEventListener("click", () => {
  DataVizRectBox.style.display = "none";
});

// Function to close all open spans
function closeAllSpans() {
  document
    .querySelectorAll(".nav-content .edit-box, .nav-content .rect-box")
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
// document
//   .querySelector(".fa-solid.fa-magnifying-glass")
//   .parentNode.addEventListener("click", function () {
//     toggleSpan(document.querySelector(".search-box"));
//   });

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

// *********************** for edit box  icon ******************************

var editor;
document.addEventListener("DOMContentLoaded", function () {
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
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
