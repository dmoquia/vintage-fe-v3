import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import img from "../../assets/mainBcg.jpeg";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function Product({ image, title, id, price }) {
  const location = useLocation();

  return (
    <article className="product">
      <div className="img-container">
        {/* <img
          src={image || img}
          alt={title || "default title remove-decorative-line"}
        /> */}
        <LazyLoadImage
          src={image || img}
          width={200}
          height={200}
          alt={title || "default title"}
        />
        <Link
          to={
            location.pathname === "/products"
              ? `/products/${id}`
              : `products/${id}`
          }
          className="btn btn-primary product-link"
        >
          details
        </Link>
      </div>
      <div className="product-footer">
        <p className="product-title">{title || "default title"}</p>
        <p className="product-price">${price || 0}</p>
      </div>
    </article>
  );
}

Product.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
