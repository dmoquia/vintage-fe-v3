import React from "react";
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";
import { CartContext } from "../../context/cart";

export default function CartItem({ id, image, title, price, amount }) {
  const { removeItem, increaseAmount, decreaseAmount } =
    React.useContext(CartContext);
  return (
    <article className="cart-item">
      {/* <img src={`${URL}${image}`} alt={title} /> */}
      <img src={image} alt={title} />
      <div>
        <h4>{title}</h4>
        <h5>${price}</h5>
        <button
          type="button"
          className="cart-btn remove-btn"
          onClick={() => {
            removeItem(id);
          }}
        >
          remove
        </button>
      </div>
      <div>
        <button
          type="button"
          className="cart-btn amount-btn"
          onClick={() => {
            increaseAmount(id);
          }}
        >
          <IoIosArrowDropup />
        </button>
        <p className="item-amount">{amount}</p>
        <button
          type="button"
          className="cart-btn amount-btn"
          onClick={() => {
            decreaseAmount(id, amount);
          }}
        >
          <IoIosArrowDropdown />
        </button>
      </div>
    </article>
  );
}
