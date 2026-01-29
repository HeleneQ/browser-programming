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