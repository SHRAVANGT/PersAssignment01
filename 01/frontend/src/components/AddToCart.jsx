import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Button from "@mui/material/Button";

const AddToCart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalAmount,
  } = useContext(CartContext);

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} x {product.quantity} = $
            {(product.price * product.quantity).toFixed(2)}
            <div>
              <Button
                variant="outlined"
                component="label"
                onClick={() => decreaseQuantity(product.id)}
              >
                -
              </Button>
              <span>{product.quantity}</span>
              <Button
                variant="outlined"
                component="label"
                onClick={() => increaseQuantity(product.id)}
              >
                +
              </Button>
              <Button
                variant="outlined"
                component="label"
                color="error"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Total: ${totalAmount.toFixed(2)}</h2>
    </div>
  );
};

export default AddToCart;
