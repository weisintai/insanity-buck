const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

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
    res.redirect("/");
  }
};

// Serve static files from 'public' directory
app.use(express.static("public"));

// Serve login page
app.get("/", (req, res) => {
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
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "launchpage") {
    req.session.isAuthenticated = true;
    res.redirect("/success");
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
