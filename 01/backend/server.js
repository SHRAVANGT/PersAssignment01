const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const multer = require("multer"); // For handling file uploads
const path = require("path");
require("dotenv").config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files
app.use(express.json());
// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

// Multer setup for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique name
  },
});

const upload = multer({ storage });

// Add Product API with image upload
app.post("/api/products", upload.single("image"), (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? req.file.filename : null; // Store the image filename
  const sql = "INSERT INTO products (name, price, image) VALUES (?, ?, ?)";

  db.query(sql, [name, price, image], (err, result) => {
    if (err) throw err;
    res.send({ message: "Product added", id: result.insertId });
  });
});

// Get all products (with image URL)
app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) throw err;
    // Map image path
    const products = results.map((product) => ({
      ...product,
      image: product.image
        ? `http://localhost:5000/uploads/${product.image}`
        : null,
    }));
    res.json(products);
  });
});
// DELETE product by id
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error deleting product" });
    } else if (result.affectedRows === 0) {
      res.status(404).send({ message: "Product not found" });
    } else {
      res.send({ message: "Product deleted successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
