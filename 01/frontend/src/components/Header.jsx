import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Moon icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sun icon

const Header = ({ theme, toggleTheme }) => {
  const { cart } = useContext(CartContext);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          VirtualShop
        </Typography>
        <Button color="inherit" component={Link} to="/">
          All Products
        </Button>
        <Button color="inherit" component={Link} to="/add-product">
          Add Product
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          🛒 Cart ({cart.length})
        </Button>

        {/* Theme Toggle Button */}
        <IconButton color="inherit" onClick={toggleTheme}>
          {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}{" "}
          {/* Switch icon based on theme */}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
