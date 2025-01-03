const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from 'public' directory
app.use(express.static("public"));

// Serve login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Serve success page
app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "success.html"));
});

// Serve wrong.html for additional endpoints
app.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "wrong.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "wrong.html"));
});

app.get("/account", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "wrong.html"));
});

app.get("/reports", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "wrong.html"));
});

app.get("/analytics", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "wrong.html"));
});

app.get("/help", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "wrong.html"));
});

app.get("/support", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "wrong.html"));
});

app.get("/notifications", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "wrong.html"));
});

app.get("/messages", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "wrong.html"));
});

app.get("/security", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "wrong.html"));
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "launchpage") {
    res.redirect("/success");
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
