import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/products";
import { CartContext } from "../context/cart";
import Loading from "../components/Loading";
import img from "../assets/mainBcg.jpeg";
export default function ProductDetails() {
  const { id } = useParams();
  // const history = useHistory();
  const navigate = useNavigate();
  const { products } = React.useContext(ProductContext);
  const { addToCart } = React.useContext(CartContext);
  const product = products.find((item) => item.id === parseInt(id));

  if (products.length === 0) {
    return <Loading />;
  } else {
    const { image, title, price, description } = product;

    return (
      <section className="single-product">
        <img
          src={image || img}
          alt={title}
          className="signle-product-image decoration-remove"
        />
        <article>
          <h1>{title}</h1>
          <h2>{price}</h2>
          <p>{description}</p>
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              // add to cart
              addToCart(product);
              navigate("/cart");
            }}
          >
            add to cart
          </button>
        </article>
      </section>
    );
  }
}
