# Lecture 06 - Async JavaScript & Fetch API
## Features implemented

1. External data loading (Fetch API + async/await) -- A "Load Data" button retrieves user data from https://jsonplaceholder.typicode.com/users/2. The request is handled using async/await, response.ok, and try/catch. The Name, Email, and Company name are displayed dynamically in the DOM.

Loading and error handling (State management) -- When the button is clicked, a temporary "Loading..." message is displayed while waiting for the server response. If an error occurs (network issue or invalid response), an "Error loading data" message is shown instead.

## How to test

**Load Data button:** Open the page and click the "Load Data" button in the External Data Demo section.

A "Loading..." message appears.

After a short delay, the page displays:

- Name
- Email
- Company name

If something goes wrong (for example, disconnect your internet), the message "Error loading data" appears instead.