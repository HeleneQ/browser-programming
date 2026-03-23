function getMessage() {
  fetch("http://localhost:3000/api/message")
    .then(response => response.json())
    .then(data => {
      document.getElementById("output").innerText =
        "Message: " + data.message + "\n" +
        "Course: " + data.course + "\n" +
        "Year: " + data.year;
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function getStudent() {
  fetch("http://localhost:3000/api/student")
    .then(response => response.json())
    .then(data => {
      document.getElementById("output").innerText =
        "Name: " + data.name + "\n" +
        "Role: " + data.role + "\n";
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function getDate() {
  fetch("http://localhost:3000/api/date")
    .then(response => response.json())
    .then(data => {

      const date = new Date(data.time);
      const formattedDate = date.toLocaleString();
      document.getElementById("output").innerText =
        "Time: " + formattedDate;
    })
    .catch(error => {
      console.error("Error:", error);
    });
}