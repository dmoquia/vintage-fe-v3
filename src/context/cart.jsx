import React from "react";
import reducer from "./reducer";
// import localCart from '../utils/localCart';
import {
  remove,
  incAmount,
  decAmount,
  ADD_TO_CART,
  CLEARCART,
  INCREASE,
} from "./actions.jsx";
function getCartFromLocalStorage() {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}

const CartContext = React.createContext();

function CartProvider({ children }) {
  const [cart, dispatch] = React.useReducer(reducer, getCartFromLocalStorage());
  const [total, setTotal] = React.useState(0);
  const [cartItems, setCartItems] = React.useState(0);

  React.useEffect(() => {
    // local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    // cart items
    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0);

    setCartItems(newCartItems);
    // cart total
    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price);
    }, 0);

    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);
  }, [cart]);
  // remove item
  const removeItem = (id) => {
    // dispatch({ type: "REMOVE", payload: id });
    dispatch(remove(id));
    // let newCart = [...cart].filter((item) => item.id !== id);
    // setCart(newCart);
    // setCart([...cart].filter(item => item.id !== id)) <--- other code or short one
  };
  // increase amount
  const increaseAmount = (id) => {
    // dispatch({ type: "INCREASE", payload: id });
    dispatch(incAmount(id));
    // const newCart = [...cart].map((item) => {
    //   return item.id === id
    //     ? { ...item, amount: item.amount + 1 }
    //     : { ...item };
    // });
    // setCart(newCart);
  };
  // decrease amount
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      dispatch(remove(id));
      //   removeItem(id);
      return;
    } else {
      dispatch(decAmount(id));
      //   const newCart = [...cart].map((item) => {
      //     return item.id === id
      //       ? { ...item, amount: item.amount - 1 }
      //       : { ...item };
      //   });
      //   setCart(newCart);
    }
  };
  // add to cart
  const addToCart = (product) => {
    // const { id, image: { url }, title, price } = product;
    // const { id, image, title, price } = product;
    const item = [...cart].find((item) => item.id === product.id);
    if (item) {
      dispatch({ type: INCREASE, payload: product.id });
      //   increaseAmount(id);

      //   return;
    } else {
      dispatch({ type: ADD_TO_CART, payload: product });
      //   // const newItem = { id, image: url, title, price, amount: 1 };
      //   const newItem = { id, image, title, price, amount: 1 };
      //   const newCart = [...cart, newItem];
      //   setCart(newCart);
    }
  };
  // clear cart
  const clearCart = () => {
    dispatch({ type: CLEARCART });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
