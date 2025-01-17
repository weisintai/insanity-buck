const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 1234;

app.use(
  session({
    secret: "ptbc2025-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // set to true if using HTTPS
  })
);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Auth middleware
const requireAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(400).json({
      success: false,
      message: "Not authenticated",
    });
  }
};

// Serve static files from 'public' directory
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// Serve login page
app.get("/special", (req, res) => {
  session.isAuthenticated = false;
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Serve success page
app.get("/success", requireAuth, (req, res) => {
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
app.post("/special", (req, res) => {
  const { username, password } = req.body;

  if (username === "simyeeugh" && password === "popcorn") {
    req.session.isAuthenticated = true;
    res.redirect("/success");
  } else {
    res.status(400).json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
