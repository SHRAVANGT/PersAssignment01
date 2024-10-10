# Backend - Product Management API

## Description

This backend API allows managing products by adding, viewing, and deleting products. It stores product data, including images, using **Node.js**, **Express**, and **MySQL**. The images are stored locally in an uploads folder.

## Features

- **GET /api/products** - Retrieves all products from the database.
- **POST /api/products** - Adds a new product, including an image.
- **DELETE /api/products/:id** - Deletes a product by its ID.

## Requirements

- **Node.js** (v14 or later)
- **MySQL** database

## Installation Steps

1. Clone the repository.
   ```bash
   git clone <repository_url>
   ```
   cd backend

npm install

# env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=products_db
PORT=5000

# Import the database schema.

mysql -u root -p products_db < products_db.sql

npm start
