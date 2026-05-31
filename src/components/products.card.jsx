// 



import React from "react";
import { Link } from "react-router-dom";
import "../style/products.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card glass">

      {/* CLICKABLE IMAGE (theme styled) */}
      <Link to={`/products/${product._id}`} className="product-image-link">
        <img
          src={product.imageurl || "https://via.placeholder.com/300"}
          alt={product.name}
          className="product-image"
        />
      </Link>

      <div className="product-info">
        <h3 className="product-name text-glow" title={product.name}>
          {product.name}
        </h3>

        <p className="product-price">
          ₹{product.price ? Number(product.price).toFixed(2) : "0.00"}
        </p>

        <Link
          to={`/products/${product._id}`}
          className="view-details-button glass-btn"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;