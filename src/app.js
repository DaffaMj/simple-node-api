/**
 * @fileoverview Simple Express API untuk mengelola daftar item.
 * Endpoint '/items' -> JSON (agar lolos test CI/CD)
 * Endpoint '/items/view' -> HTML cantik untuk tampilan user
 * Endpoint DELETE /items/:index ditambahkan.
 */

// 📦 Import modul utama
const express = require("express");
const app = express();

// --- Middleware ---

// ⚙️ Menggunakan middleware untuk memparsing body permintaan JSON
app.use(express.json());

// --- Data Sementara ---

// 💾 Array untuk menyimpan item
let items = []; 

// --- ROUTES ---

// GET root (Tampilan Visual Selamat Datang)
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
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #eef2f7; color: #333; text-align: center; padding-top: 50px; line-height: 1.6; }
            .container { max-width: 700px; margin: auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); border-left: 5px solid #007bff; }
            h1 { color: #007bff; margin-bottom: 20px;}
            code { background-color: #f8f9fa; padding: 5px 10px; border-radius: 6px; font-weight: bold; color: #d63384; border: 1px solid #ddd; display: inline-block; margin: 5px 0;}
            
            /* Gaya Tombol */
            .btn-access {
                display: inline-block; padding: 12px 25px; margin: 5px 10px;
                background-color: #28a745; color: white; text-decoration: none;
                border-radius: 8px; font-weight: bold; font-size: 1.1em;
                transition: background-color 0.3s, transform 0.1s; border: none; cursor: pointer;
            }
            .btn-access:hover { 
                background-color: #218838; 
                box-shadow: 0 4px 8px rgba(0,0,0,0.2); 
            }
            .btn-secondary { 
                background-color: #007bff; 
            }
            .btn-secondary:hover { 
                background-color: #0056b3; 
                box-shadow: 0 4px 8px rgba(0,0,0,0.2); 
            }
            .btn-delete-info { 
                background-color: #dc3545; /* Merah */
                padding: 5px 10px;
                border-radius: 4px;
                color: white;
                font-weight: normal;
                font-size: 0.9em;
                display: block;
                margin-top: 10px;
            }
            hr { border: 0; height: 1px; background: #eee; margin: 25px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Simple Node.js API is Running!</h1>
            <p>Selamat datang! Ini adalah contoh API dasar menggunakan Express.</p>
            <hr>
            
            <h2>Akses Data</h2>
            
            <p>Pilih mode tampilan:</p>
            
            <a href="/items/view" class="btn-access">
                Lihat Item (Tampilan User) 🖼️ →
            </a>
            
            <a href="/items" class="btn-access btn-secondary">
                GET /items (JSON API) 📄
            </a>

            <hr>

            <h2>Untuk Pengembang (API Endpoint):</h2>
            <p><strong>POST</strong> Menambahkan Item Baru (Gunakan Postman/Insomnia):</p>
            <p><code>/items</code></p>
            
            <p><strong>DELETE</strong> Menghapus Item (Gunakan Postman/Insomnia):</p>
            <p><code>/items/:index</code></p>
            <span class="btn-delete-info">
                Contoh: DELETE /items/1 (Menghapus item pada indeks ke-1)
            </span>
            <p style="font-size: 0.9em; color: #6c757d; margin-top: 10px;">
                Catatan: Indeks dimulai dari 0. Gunakan GET /items untuk melihat posisi item.
            </p>
        </div>
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
  // 📄 Membuat daftar HTML dari array items
  const itemListHTML = items.length > 0 
    ? items.map((item, index) => `
        <li class="item-list-li"><strong>${index + 1}.</strong> ${item} (Indeks: ${index})</li>
      `).join('')
    : '<p style="text-align:center; color:#dc3545; font-weight:bold; padding: 20px 0;">List item masih kosong. Silakan gunakan POST untuk menambah data.</p>';

  // 🎨 Mengirimkan respons HTML dengan CSS
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
                background-color: #e9f7ef; margin-bottom: 10px; padding: 12px 15px; 
                border-radius: 6px; font-size: 1.1em; border-left: 5px solid #28a745; 
                text-align: left; transition: background-color 0.3s;
            }
            .item-list-li:hover { background-color: #d1eccd;}
            .item-list-li:nth-child(even) { background-color: #f7fcf9; border-left: 5px solid #17a2b8;}
            .item-list-li:nth-child(even):hover { background-color: #e2f4f7;}

            /* Tombol Kembali yang Rapi */
            .back-link { 
                display: inline-block; 
                margin-top: 30px; 
                padding: 10px 15px;
                background-color: #6c757d; 
                color: white; 
                text-decoration: none; 
                font-weight: bold; 
                font-size: 1em;
                border-radius: 6px;
                transition: background-color 0.3s;
            }
            .back-link:hover { 
                background-color: #5a6268; 
                text-decoration: none;
            }
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

// POST add item
app.post("/items", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  items.push(name);

  // 🎉 Kirim status 201 (Created) dan respons yang berisi data terbaru
  res.status(201).json({ message: "Item added successfully", items });
});

// 🗑️ DELETE an item
app.delete("/items/:index", (req, res) => {
    // Ambil indeks dari URL parameter, dan konversi ke integer
    const index = parseInt(req.params.index, 10); 

    // 1. Validasi Indeks: Pastikan indeks adalah angka yang valid dan ada dalam array
    if (isNaN(index) || index < 0 || index >= items.length) {
        return res.status(404).json({ error: "Item not found or invalid index." });
    }

    // 2. Hapus Item menggunakan splice
    const deletedItem = items.splice(index, 1);

    // 3. Kirim Respons Sukses
    res.status(200).json({ 
        message: `Item '${deletedItem[0]}' at index ${index} deleted successfully.`, 
        items: items 
    });
});

// 📤 Ekspor aplikasi Express
module.exports = app;