console.log("PortFolio page loaded successfully!");


// ===================================================
// TASK 1: Build the "Skills" section with JavaScript (DOM)
// ===================================================

// Data: an array of skill strings
const skills = ["HTML", "CSS", "JavaScript", "Python", "IoT", "Java", "Git & GitHub", "C Programming"];

// 1. Create the <section> container
const skillsSection = document.createElement("section");
skillsSection.id = "skills";                        // gives it id="skills" so CSS and nav link work

// 2. Create and append the <h2> title
const skillsTitle = document.createElement("h2");
skillsTitle.innerText = "Skills";                  // .textContent sets the visible text
skillsSection.appendChild(skillsTitle);

// 3. Create and append the <p> description
const skillsDesc = document.createElement("p");
skillsDesc.innerText = "Here are some of the technical skills I have developed during my studies and personal projects:";
skillsSection.appendChild(skillsDesc);

// 4. Create the <ul> and loop through the skills array to create each <li>
const skillsList = document.createElement("ul");
skillsList.classList.add("skills-list");              // classList.add() attaches a CSS class

skills.forEach(function (skill) {
    const li = document.createElement("li");          // create one <li> per skill
    li.innerText = skill;                           // set its text
    skillsList.appendChild(li);                       // add it inside the <ul>
});

skillsSection.appendChild(skillsList);

// 5. Insert the finished section into <main>
const mainElement = document.getElementById("main");
mainElement.appendChild(skillsSection);

console.log("Skills section created with " + skills.length + " skills");


// ===================================================
// TASK 2: Build the "Projects" section with JavaScript (DOM)
// ===================================================


// Data: an array of project objects
const projects = [
    {
        title: "Browser Programming Portfolio",
        description: "A personal portfolio website built with HTML, CSS and JavaScript as part of my Browser Programming course. Includes responsive design, dark mode and dynamic content.",
        link: "https://heleneq.github.io/browser-programming/lecture-05-dom-data/"
    },
    {
        title: "Semester project: Habits Tracker",
        description: "Project realized in 2026, realization of a Habits Tracker to gather all the knowledges learned during this course",
        link: "https://heleneq.github.io/browser-programming/semester-project/"
    }
];

// 1. Create the <section> container
const projectsSection = document.createElement("section");
projectsSection.id = "projects";

// 2. Create and append the <h2> title
const projectsTitle = document.createElement("h2");
projectsTitle.textContent = "Projects";
projectsSection.appendChild(projectsTitle);

// 3. Create and append the <p> description
const projectsDesc = document.createElement("p");
projectsDesc.textContent = "Below are some of the projects I have worked on:";
projectsSection.appendChild(projectsDesc);

// 4. Create the grid container <div>
const projectsGrid = document.createElement("div");
projectsGrid.classList.add("projects-grid");          // CSS class for the 2-column grid

// 5. Loop through projects array and build each card
projects.forEach(function (project) {
    // Create the card wrapper
    const card = document.createElement("div");
    card.classList.add("project-card");

    // Create the <h3> project title
    const h3 = document.createElement("h3");
    h3.textContent = project.title;
    card.appendChild(h3);

    // Create the <p> description
    const p = document.createElement("p");
    p.textContent = project.description;
    card.appendChild(p);

    // Create the <a> link
    const a = document.createElement("a");
    a.href = project.link;                            // .href sets the link destination
    a.textContent = "View on GitHub";
    card.appendChild(a);

    // Add the finished card into the grid
    projectsGrid.appendChild(card);
});

projectsSection.appendChild(projectsGrid);

// 6. Insert the finished section into <main>
mainElement.appendChild(projectsSection);

console.log("Projects section created with " + projects.length + " projects");



// ===================================================
// TASK 3: Theme Toggle (DOM + State)
// ===================================================

let isDarkMode = false;

function setTheme() {
    // Toggle the state variable
    isDarkMode = !isDarkMode;

    // Toggle the 'dark-mode' class on the body element
    // classList.toggle adds the class if absent, removes it if present
    document.body.classList.toggle("dark-mode");

    // TASK 4: Save the user's choice to localStorage
    // localStorage.setItem stores a key-value pair as strings
    localStorage.setItem("portfolio_theme", isDarkMode ? "dark" : "light");

    // Console log: Log the current theme state
    if (isDarkMode) {
        console.log("Theme changed to: Dark Mode");
    } else {
        console.log("Theme changed to: Light Mode");
    }
}

// Attach the click event listener to the toggle button
const themeButton = document.getElementById("theme-toggle");
if (themeButton) {
    themeButton.addEventListener("click", setTheme);
}

console.log("Initial state - Dark Mode: " + isDarkMode);





// ===================================================
// TASK 4: Load saved theme from localStorage on page load
// ===================================================

const savedTheme = localStorage.getItem("portfolio_theme");

if (savedTheme === "dark") {
    // Apply dark mode without toggling — set state and class directly
    isDarkMode = true;
    document.body.classList.add("dark-mode");
    console.log("Loaded saved theme: Dark Mode");
} else {
    console.log("Loaded saved theme: Light Mode (default)");
}

console.log("Initial state - Dark Mode: " + isDarkMode);



// ===================================================
// TASK 5: "Last updated" text generated by JavaScript (DOM)
// ===================================================

const lastUpdated = document.createElement("p");
lastUpdated.id = "last-updated";

// Create a new Date object (represents "right now")
const today = new Date();

// toISOString() returns something like "2026-02-25T12:34:56.789Z"
// .split('T')[0] extracts just the "YYYY-MM-DD" part
const formattedDate = today.toISOString().split("T")[0];

// Set the text content of the element (DOM manipulation)
lastUpdated.textContent = "Last updated: " + formattedDate;

// Append to main
mainElement.appendChild(lastUpdated);

console.log("Last updated date set to: " + formattedDate);



// ===================================================
// Contact Button (already existed)
// ===================================================
//Button to access quick contact information

const contactEmail = "helene.quernet@edu.savonia.fi";

function showContactInfo() {
    // Console log #3: Log when contact info is requested
    console.log("Contact quick action triggered - Email: " + contactEmail);
    
    // Show alert with contact information
    alert(
        "📧 Contact Hélène Quernet\n\n" +
        "Finnish email: helene.quernet@edu.savonia.fi\n" +
        "French email: helene.quernet@etu.estia.fr\n" +
        "GitHub: github.com/HeleneQ"
    );
}

const contactButton = document.getElementById('contact-btn');
if (contactButton) {
    contactButton.addEventListener('click', showContactInfo);
}