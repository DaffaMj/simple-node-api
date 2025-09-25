/**
 * @fileoverview Simple Express API untuk mengelola daftar item.
 * Kode ini mencakup perbaikan visual pada endpoint root (/) menggunakan HTML/CSS.
 */

// 📦 Import modul utama
const express = require("express");
const app = express(); // Inisialisasi aplikasi Express

// --- Middleware ---

// ⚙️ Menggunakan middleware untuk memparsing body permintaan JSON
app.use(express.json());

// --- Data Sementara ---

// 💾 Array untuk menyimpan item (simulasi database sederhana)
let items = ["Apple", "Banana", "Cherry"];

// --- Routes/Endpoints ---

// GET root (Tampilan Visual yang diperbarui)
app.get("/", (req, res) => {
  // 🎨 Mengirimkan respons HTML dengan CSS untuk tampilan yang lebih bagus
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>🚀 Simple Node API</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                background-color: #eef2f7; 
                color: #333; 
                text-align: center; 
                padding-top: 50px; 
                line-height: 1.6;
            }
            .container { 
                max-width: 700px; 
                margin: auto; 
                background: white; 
                padding: 40px; 
                border-radius: 12px; 
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); 
                border-left: 5px solid #007bff;
            }
            h1 { 
                color: #007bff; 
                margin-bottom: 20px;
            }
            p { 
                font-size: 1.1em; 
                margin-bottom: 5px;
            }
            code { 
                background-color: #f8f9fa; 
                padding: 5px 10px; 
                border-radius: 6px; 
                font-weight: bold; 
                color: #d63384; 
                border: 1px solid #ddd;
                display: inline-block;
                margin: 5px 0;
            }
            strong {
                color: #28a745;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Simple Node.js API is Running!</h1>
            <p>Selamat datang! Ini adalah contoh API dasar menggunakan Express.</p>
            <hr style="border: 0; height: 1px; background: #eee; margin: 25px 0;">
            
            <h2>Endpoints Tersedia:</h2>
            
            <p><strong>GET</strong> Data Semua Item:</p>
            <p><code>/items</code></p>
            
            <p><strong>POST</strong> Menambahkan Item Baru (membutuhkan body JSON):</p>
            <p><code>/items</code></p>
            <p style="font-size: 0.9em; color: #6c757d;">Body JSON: {"name": "item_baru"}</p>
        </div>
    </body>
    </html>
  `);
});

// GET all items (Mengembalikan data JSON)
app.get("/items", (req, res) => {
  // 📄 Mengirimkan array items sebagai respons JSON
  res.json(items);
});

// POST add item (Menerima data JSON untuk ditambahkan)
app.post("/items", (req, res) => {
  // 🔍 Mendapatkan 'name' dari body permintaan
  const { name } = req.body;

  // ⚠️ Validasi: Pastikan 'name' tidak kosong
  if (!name) {
    // ❌ Jika kosong, kirim status 400 (Bad Request)
    return res.status(400).json({ error: "Name is required" });
  }

  // ✅ Tambahkan item ke dalam array
  items.push(name);

  // 🎉 Kirim status 201 (Created) dan respons yang berisi data terbaru
  res.status(201).json({ message: "Item added successfully", items });
});

// --- Ekspor Aplikasi ---

// 📤 Ekspor aplikasi Express
module.exports = app;