const baseurl = 'https://api.github.com/repos/mpsych/boostlet/contents/examples';
const downloadurl = 'https://raw.githubusercontent.com/mpsych/boostlet/main/examples/';
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
      ".nav-content .search-box, .nav-content .edit-box, .nav-content .rect-box .boostlet-categories .category-container"
    )
    .forEach(function (box) {
      box.style.display = "none";
    });
}

// Function to toggle a span element
function toggleSpan(span) {
  // If the clicked span is already open, close it
  if (span.style.display === "block") {
    span.style.display = "none";
  } else {
    // Close all spans first
    closeAllSpans();
    // Then open the clicked span
    span.style.display = "block";
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

  document.querySelector("#boostletTab").addEventListener("click", function () {
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
    console.log("Boostlet is triggered !")
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
  const suggestionsContainer = document.getElementById("suggestionsContainer");

  // If the input value is empty, clear the suggestions container and return
  if (!inputValue.trim()) {
    suggestionsContainer.innerHTML = "";
    suggestionsContainer.style.display = "none";
    return;
  }

  // Fetch filenames from the server
  fetch(baseurl)
    .then(response => response.json())
    .then(files => {
      const filenames = files.map(file => file.name);
      
      // Filter filenames based on the input value
      const matchedSuggestions = filenames.filter(filename =>
        filename.toLowerCase().startsWith(inputValue.toLowerCase())
      );

      // Clear previous suggestions
      suggestionsContainer.innerHTML = "";

      // Create suggestion elements and add them to the suggestions container
      matchedSuggestions.forEach(function (suggestion) {
        const suggestionElement = document.createElement("div");
        suggestionElement.classList.add("suggestion-item");
        suggestionElement.textContent = suggestion;
        suggestionElement.onclick = function () {
          // Run the file when the suggestion is clicked
          run(suggestion);
          // Clear suggestions after selection
          suggestionsContainer.innerHTML = "";
          // Clear the search input value
          document.getElementById("searchInput").value = "";
        };
        suggestionsContainer.appendChild(suggestionElement);
      });

      // Show suggestions if there are any matches
      if (matchedSuggestions.length > 0) {
        suggestionsContainer.style.display = "block";
      } else {
        // Display "No Boostlets found" message when there are no matches
        suggestionsContainer.innerHTML = "No Boostlets found";
        suggestionsContainer.style.display = "block"; // Change display to block
      }
    })
    .catch(error => {
      console.error('Error fetching filenames:', error);
    });
}

// Call the showSuggestions function whenever the input value changes
document.getElementById("searchInput").addEventListener("input", function (e) {
  showSuggestions(e.target.value);
});




function toggleCategoryButtons(categoryContainer) {
  const categories = document.querySelectorAll(".category-container");
  categories.forEach(function (cat) {
    if (cat !== categoryContainer) {
      cat.style.display = "none"; // Hide other category buttons
    }
  });
}

// Modify the function toggleFileButtons to toggle the display of the file container and back button
function toggleFileButtons(categoryContainer) {
  const filesContainer = categoryContainer.querySelector(".file-container");
  const backButton = categoryContainer.querySelector(".back-arrow");

  if (
    filesContainer.style.display === "none" ||
    filesContainer.style.display === ""
  ) {
    // Show files container and expand category container
    filesContainer.style.display = "flex"; // Change display to flex
    backButton.style.display = "block"; // Display back button
    categoryContainer.style.height = `${categoryContainer.scrollHeight}px`;
    // Hide other category buttons
    toggleCategoryButtons(categoryContainer);
  } else {
    // Hide files container and collapse category container
    filesContainer.style.display = "none";
    backButton.style.display = "none";
    categoryContainer.style.height = "";
    // Show all category buttons
    const categories = document.querySelectorAll(".category-container");
    categories.forEach(function (cat) {
      cat.style.display = "block";
    });
  }
}

function createCategoryButton(categoryName, files, container) {
  const categoryContainer = document.createElement("div"); // Create a container for the category
  categoryContainer.classList.add("category-container");

  const button = document.createElement("button");
  button.textContent = categoryName;
  button.classList.add("rect-btn");
  button.addEventListener("click", (event) => {
    console.log(`Clicked category: ${categoryName}`);
    // Toggle the visibility of file buttons under this category
    toggleFileButtons(categoryContainer);
    // Prevent the click event from propagating to the parent span
    event.stopPropagation();
  });
  categoryContainer.appendChild(button);

  const filesContainer = document.createElement("div"); // Create a container for file buttons
  filesContainer.classList.add("file-container");

  // Create a row container for file buttons
  let rowContainer;
  files.forEach((fileName, index) => {
    if (index % 2 === 0) {
      // Start a new row for every two buttons
      rowContainer = document.createElement("div");
      rowContainer.classList.add("row-container");
      filesContainer.appendChild(rowContainer);
    }
    const fileButton = document.createElement("button");
    fileButton.textContent = fileName;
    fileButton.classList.add("rect-btn");
    fileButton.addEventListener("click", () => {
      console.log(`Clicked file: ${fileName}`);
      // Trigger the run function for the clicked file
      run(fileName);
    });
    rowContainer.appendChild(fileButton);
  });

  // Initially hide the file buttons container
  filesContainer.style.display = "none";

  categoryContainer.appendChild(filesContainer); // Append file buttons container to category container

  // Append category container to main container
  container.appendChild(categoryContainer);

  // Create back button for each category
  const backButton = document.createElement("button");
  backButton.textContent = "Back";
  backButton.classList.add("back-arrow");
  backButton.style.display = "none"; // Hide the back button initially
  backButton.addEventListener("click", () => {
    // Hide files container and collapse category container when back button is clicked
    filesContainer.style.display = "none";
    backButton.style.display = "none";
    categoryContainer.style.height = "";
    // Show all category buttons
    const categories = document.querySelectorAll(".category-container");
    categories.forEach(function (cat) {
      cat.style.display = "block";
    });
  });
  categoryContainer.appendChild(backButton); // Append back button to category container
}


function fetchBoostletFiles() {
  fetch(baseurl)
      .then(response => response.json())
      .then(files => {
          const filesByCategory = {};

          // Fetch the category for each file and organize them by category
          Promise.all(files.map(file => {
              const fileName = file.name;
              return getCategoryFromFile(fileName)
                  .then(category => {
                      if (!filesByCategory[category]) {
                          filesByCategory[category] = []; // Initialize category array if not exists
                      }
                      filesByCategory[category].push(fileName);
                  });
          })).then(() => {
              const filesContainer = document.querySelector('.boostlet-categories');
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
  return fetch(downloadurl + fileName)
      .then(response => response.text())
      .then(scriptText => {
          // Search for the category link in the script text
          const categoryRegex = /category:\s*["']([^"']+)["']/;
          const match = categoryRegex.exec(scriptText);
          return match ? match[1] : "Others"; // Return the captured category or default to "Others"
      })
      .catch(error => {
          console.error('Error fetching file:', error);
          return "Others"; // If an error occurs, default to "Others"
      });
}

function run(fileName) {
  fetch(downloadurl + fileName)
    .then(response => response.text())
    .then(scriptText => {
      // Execute the script content in the console within an IIFE
      eval(`(function() { ${scriptText} })();`);
    })
    .catch(error => {
      console.error('Error fetching or executing file:', error);
    });
}
