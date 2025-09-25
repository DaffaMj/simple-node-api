/**
 * @fileoverview Simple Express API untuk mengelola daftar item.
 * Kode ini mencakup perbaikan visual pada endpoint root (/) dan daftar item (/items) 
 * menggunakan HTML/CSS. Tombol navigasi ditambahkan pada halaman root.
 */

// 📦 Import modul utama
const express = require("express");
const app = express(); // Inisialisasi aplikasi Express

// --- Middleware ---

// ⚙️ Menggunakan middleware untuk memparsing body permintaan JSON
app.use(express.json());

// --- Data Sementara ---

// --- Routes/Endpoints ---

// GET root (Tampilan Visual Selamat Datang dengan Tombol)
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
            h1 { color: #007bff; margin-bottom: 20px;}
            p { font-size: 1.1em; margin-bottom: 5px;}
            code { background-color: #f8f9fa; padding: 5px 10px; border-radius: 6px; font-weight: bold; color: #d63384; border: 1px solid #ddd; display: inline-block; margin: 5px 0;}
            strong { color: #28a745;}
            
            /* Gaya Tombol Baru */
            .btn-access {
                display: inline-block;
                padding: 12px 25px;
                margin-top: 30px;
                background-color: #28a745; /* Hijau */
                color: white;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                font-size: 1.1em;
                transition: background-color 0.3s, transform 0.1s;
                border: none;
                cursor: pointer;
            }
            .btn-access:hover {
                background-color: #218838; /* Hijau lebih gelap */
                transform: translateY(-2px);
            }
            .btn-access:active {
                transform: translateY(0);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Simple Node.js API is Running!</h1>
            <p>Selamat datang! Ini adalah contoh API dasar menggunakan Express.</p>
            <hr style="border: 0; height: 1px; background: #eee; margin: 25px 0;">
            
            <h2>Akses Data</h2>
            
            <p>Klik tombol di bawah untuk melihat daftar item saat ini:</p>
            
            <a href="/items" class="btn-access">
                Lihat Semua Item →
            </a>

            <hr style="border: 0; height: 1px; background: #eee; margin: 25px 0;">

            <h2>Untuk Pengembang (API Endpoint):</h2>
            <p><strong>POST</strong> Menambahkan Item Baru (Gunakan Postman/Insomnia):</p>
            <p><code>/items</code></p>
            <p style="font-size: 0.9em; color: #6c757d;">Body JSON: {"name": "item_baru"}</p>
        </div>
    </body>
    </html>
  `);
});

// GET all items (Tampilan Visual Daftar Item yang diperbarui)
app.get("/items", (req, res) => {
  // 📄 Membuat daftar HTML dari array items
  const itemListHTML = items.map((item, index) => `
    <li class="item-list-li"><strong>${index + 1}.</strong> ${item}</li>
  `).join('');

  // 🎨 Mengirimkan respons HTML
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Daftar Item</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f9fc; color: #333; padding-top: 30px; }
            .container-list { max-width: 600px; margin: auto; background: white; padding: 30px 40px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); }
            h1 { color: #28a745; border-bottom: 3px solid #28a745; padding-bottom: 10px; margin-bottom: 20px; text-align: center; }
            .item-list { list-style: none; padding: 0; }
            .item-list-li { 
                background-color: #e9f7ef; 
                margin-bottom: 10px; 
                padding: 12px 15px; 
                border-radius: 6px; 
                font-size: 1.1em; 
                border-left: 5px solid #28a745; 
                text-align: left;
                transition: background-color 0.3s;
            }
            .item-list-li:hover { background-color: #d1eccd;}
            .item-list-li:nth-child(even) { background-color: #f7fcf9; border-left: 5px solid #17a2b8;}
            .item-list-li:nth-child(even):hover { background-color: #e2f4f7;}
            .back-link { display: block; margin-top: 30px; text-align: center; color: #007bff; text-decoration: none; font-weight: bold; font-size: 1em;}
            .back-link:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <div class="container-list">
            <h1>✅ Daftar Item Saat Ini (${items.length} Item)</h1>
            <ul class="item-list">
                ${itemListHTML}
            </ul>
            <a href="/" class="back-link">← Kembali ke Halaman Utama</a>
        </div>
    </body>
    </html>
  `);
});

// POST add item (Endpoint ini tetap mengembalikan JSON agar fungsional untuk API)
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