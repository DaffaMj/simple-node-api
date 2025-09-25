/**
 * @fileoverview Simple Express API untuk mengelola daftar item.
 * Endpoint `/items` -> JSON (agar lolos test CI/CD)
 * Endpoint `/items/view` -> HTML cantik untuk tampilan user
 */

const express = require("express");
const app = express();

app.use(express.json());

// Data sementara
let items = [];

// --- ROUTES ---

// Root page (welcome)
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><title>🚀 Simple Node API</title></head>
    <body style="font-family: sans-serif; text-align:center; padding:40px;">
      <h1>🚀 Simple Node.js API is Running!</h1>
      <p>Selamat datang! Ini adalah contoh API dasar menggunakan Express.</p>
      <p><a href="/items">👉 GET /items (JSON)</a></p>
      <p><a href="/items/view">👉 GET /items/view (HTML tampilan)</a></p>
    </body>
    </html>
  `);
});

// ✅ GET all items (JSON untuk test)
app.get("/items", (req, res) => {
  res.json(items);
});

// 🎨 GET all items (HTML cantik untuk user)
app.get("/items/view", (req, res) => {
  const itemListHTML = items.map(
    (item, index) => `<li><strong>${index + 1}.</strong> ${item}</li>`
  ).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><title>Daftar Item</title></head>
    <body style="font-family: sans-serif; padding:40px;">
      <h1>✅ Daftar Item (${items.length})</h1>
      <ul>${itemListHTML}</ul>
      <a href="/">← Kembali ke Halaman Utama</a>
    </body>
    </html>
  `);
});

// POST add item
app.post("/items", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  items.push(name);
  res.status(201).json({ message: "Item added successfully", items });
});

module.exports = app;
