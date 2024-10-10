import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Grid, Grid2 } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://localhost:5000/api/products/${id}`)
        .then(() => {
          alert("Product deleted successfully");
          fetchProducts(); // Refresh the product list after deleting
        })
        .catch((error) => console.error("Error deleting product:", error));
    }
  };

  return (
    <Grid2 container spacing={3} sx={{ padding: 3 }}>
      {products.map((product) => (
        <Grid2
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={product.id}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Card>
            {/* Display product image */}
            <CardMedia
              component="img"
              // height="1200"
              image={
                product.image
                  ? `http://localhost:5000/uploads/${product.image}`
                  : "placeholder.jpg"
              }
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h5">{product.name}</Typography>
              <Typography>${product.price}</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default AllProducts;
