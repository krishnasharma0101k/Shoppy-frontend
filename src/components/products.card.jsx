import React from "react";
import { Link } from "react-router-dom";
import "../style/product.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl || "https://via.placeholder.com/300"}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h3 className="product-name" title={product.name}>
          {product.name}
        </h3>

        <p className="product-price">
          ₹{product.price ? Number(product.price).toFixed(2) : "0.00"}
        </p>

        <Link
          to={`/products/${product._id}`}
          className="view-details-button"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;