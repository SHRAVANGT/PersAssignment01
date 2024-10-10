import React, { useState, useEffect } from "react";
import Header from "./components/Header"; // Navbar
import AllProducts from "./components/AllProducts";
import AddToCart from "./components/AddToCart";
import AddProduct from "./components/AddProduct";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./theme.css"; // Import the CSS file for theming
import "./App.css";
function App() {
  // State to manage the theme mode (dark or light)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"; // Get saved theme from localStorage or default to 'light'
  });

  // Function to toggle between dark and light mode
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Apply the theme class to the body element and save it to localStorage
  useEffect(() => {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(`${theme}-mode`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <CartProvider>
      {" "}
      {/* Wrap the app with CartProvider */}
      <Router>
        <Header theme={theme} toggleTheme={toggleTheme} />{" "}
        {/* Pass the theme and toggle function to Header */}
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
