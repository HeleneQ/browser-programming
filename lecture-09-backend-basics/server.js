const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/api/message", (req, res) => {
  res.json({
    message: "Hello",
    course: "Browser Programming",
    year: 2026,
    });
});

app.get("/api/student", (req, res) => {
  res.json({
    name: "Helene",
    role: "Student"
  });
});

app.get("/api/date", (req, res) => {
  res.json({
    time: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

