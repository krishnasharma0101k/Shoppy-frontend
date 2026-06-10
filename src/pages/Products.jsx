
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cardSlice";
import "../style/products.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        imageUrl: product.imageurl,
        price: product.price,
        qty: 1,
      })
    );

    alert("Added to cart successfully!");
  };

  if (loading) {
    return (
      <div className="product-loading">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-error">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-container">

        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-grid">

          <div className="product-image-card">
            <img
              src={product.imageurl}
              alt={product.name}
              className="product-image"
            />
          </div>

          <div className="product-info">

            <span className="product-badge">
              Premium Product
            </span>

            <h1>{product.name}</h1>

            <div className="product-price">
              ₹{product.price}
            </div>

            <div className={`stock-status ${product.stock === 0 ? "out" : ""}`}>
              {product.stock > 0
                ? `✓ In Stock (${product.stock} available)`
                  : "✕ Out of Stock"}
            </div>

            <p className="product-description">
              {product.description}
            </p>

            <button
              className="add-cart-btn"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

