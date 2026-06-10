import React, { useEffect, useState } from "react";
import ProductCard from "../components/products.card";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
        const data = await res.json();

        setProducts(data.slice(0, 4)); // featured products
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-container">

      {/* HERO */}
      <div className="hero-banner">
        <h1>Welcome to Shoppy</h1>
        <p>Discover the best products at unbeatable prices</p>
      </div>

      {/* FEATURED */}
      <h2>Featured Products</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Home;