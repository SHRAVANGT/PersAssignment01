import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const addProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    axios
      .post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setName("");
        setPrice("");
        setImage(null);
        alert("Product added");
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box
      component="form"
      onSubmit={addProduct}
      sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 3 }}
    >
      <TextField
        label="Product Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        sx={{
          input: { color: "white" }, // Ensure text is white in dark mode
          label: { color: "white" }, // Ensure label is white in dark mode
        }}
      />
      <TextField
        label="Price"
        variant="outlined"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        sx={{
          input: { color: "white" }, // Ensure text is white in dark mode
          label: { color: "white" }, // Ensure label is white in dark mode
        }}
      />
      <Button variant="contained" component="label">
        Upload Image
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      <Button type="submit" variant="contained">
        Add Product
      </Button>
    </Box>
  );
};

export default AddProduct;
