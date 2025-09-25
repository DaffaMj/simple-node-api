const express = require("express");
const app = express();

app.use(express.json());

let items = [];

// GET all items
app.get("/items", (req, res) => {
  res.json(items);
});

// GET root
app.get("/", (req, res) => {
  res.send("🚀 Simple Node API is running! Try /items");
});

// POST add item
app.post("/items", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  items.push(name);
  res.status(201).json({ message: "Item added", items });
});

module.exports = app;
