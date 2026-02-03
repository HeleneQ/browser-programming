console.log("PortFolio page loaded successfully!");


//Realise a dark mode for the webpage
let isDarkMode = false;

function setTheme() {
    // Toggle the state variable
    isDarkMode = !isDarkMode;
    
    // Toggle the 'dark-mode' class on the body element
    document.body.classList.toggle('dark-mode');
    
    // Console log #2: Log the current theme state
    if (isDarkMode) {
        console.log("Theme changed to: Dark Mode");
    } else {
        console.log("Theme changed to: Light Mode");
    }
}

const themeButton = document.getElementById('theme-toggle');
if (themeButton) {
    themeButton.addEventListener('click', setTheme);
}

console.log("Initial state - Dark Mode: " + isDarkMode);


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