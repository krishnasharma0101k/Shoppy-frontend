import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cardSlice";

const Shop = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
        const cats = ["All", ...new Set(data.map((p) => p.category).filter(Boolean))];
        setCategories(cats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    setFiltered(result);
  }, [search, category, sort, products]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      productId: product._id,
      name: product.name,
      imageUrl: product.imageurl,
      price: product.price,
      qty: 1,
    }));
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#0f0f0f",
      backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,90,0,0.10) 0%, transparent 60%)",
      padding: "60px 5%",
      fontFamily: "'Inter', sans-serif",
      color: "#fff",
      overflowX: "hidden",
    },
    container: { maxWidth: "1200px", margin: "0 auto" },
    hl: {
      background: "linear-gradient(90deg,#ff6a00,#ffaa44)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },

    /* Header */
    header: { textAlign: "center", marginBottom: "3rem" },
    badge: {
      display: "inline-block", padding: "4px 14px", borderRadius: "999px",
      fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase",
      color: "#ff9a3c", background: "rgba(255,106,0,0.1)", border: "1px solid rgba(255,140,40,0.25)",
      marginBottom: "1rem",
    },
    title: { fontSize: "clamp(28px,8vw,52px)", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" },
    subtitle: { fontSize: "14px", color: "rgba(255,200,140,0.55)" },

    /* Controls */
    controls: {
      display: "flex", gap: "1rem", marginBottom: "2.5rem",
      flexWrap: "wrap", alignItems: "center",
    },
    searchBox: {
      flex: 1, minWidth: "220px",
      display: "flex", alignItems: "center", gap: "10px",
      padding: "10px 16px",
      background: "rgba(255,100,10,0.06)",
      border: "1px solid rgba(255,140,40,0.2)",
      borderRadius: "10px",
    },
    searchInput: {
      flex: 1, background: "transparent", border: "none", outline: "none",
      color: "#fff", fontSize: "14px", fontFamily: "'Inter',sans-serif",
      minWidth: 0,
    },
    select: {
      padding: "10px 14px",
      background: "rgba(255,100,10,0.06)",
      border: "1px solid rgba(255,140,40,0.2)",
      borderRadius: "10px",
      color: "#fff",
      fontSize: "13px",
      fontFamily: "'Inter',sans-serif",
      outline: "none",
      cursor: "pointer",
    },

    /* Results count */
    resultsRow: {
      display: "flex", justifyContent: "space-between", alignItems: "center",
      marginBottom: "1.5rem", flexWrap: "wrap", gap: "8px",
    },
    resultsText: { fontSize: "13px", color: "rgba(255,180,100,0.5)" },

    /* Grid */
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "1.5rem",
    },

    /* Card */
    card: {
      background: "rgba(255,120,20,0.06)",
      border: "1px solid rgba(255,140,40,0.18)",
      borderRadius: "14px",
      overflow: "hidden",
      backdropFilter: "blur(16px)",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s",
    },
    cardImg: {
      width: "100%", height: "200px", objectFit: "cover",
      background: "#111", display: "block",
    },
    cardBody: {
      padding: "14px", display: "flex", flexDirection: "column", gap: "8px", flex: 1,
    },
    cardName: {
      fontSize: "15px", fontWeight: 600, color: "#fff",
      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
    },
    cardCategory: {
      fontSize: "11px", fontWeight: 500, letterSpacing: "1px",
      textTransform: "uppercase", color: "rgba(255,180,100,0.45)",
    },
    cardPrice: {
      fontSize: "18px", fontWeight: 700,
      background: "linear-gradient(90deg,#ff6a00,#ffaa44)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    },
    cardStock: (stock) => ({
      fontSize: "11px", fontWeight: 500,
      color: stock > 0 ? "#22c55e" : "#f87171",
    }),
    cardFooter: {
      display: "flex", gap: "8px", marginTop: "auto", paddingTop: "8px",
    },
    viewBtn: {
      flex: 1, padding: "9px 10px", borderRadius: "8px", textAlign: "center",
      background: "rgba(255,120,20,0.12)", border: "1px solid rgba(255,140,40,0.22)",
      color: "#fff", fontSize: "13px", fontWeight: 500, textDecoration: "none",
      transition: "all 0.2s",
    },
    cartBtn: {
      flex: 1, padding: "9px 10px", borderRadius: "8px",
      background: "linear-gradient(135deg,#ff6a00,#ff9a3c)",
      border: "none", color: "#fff", fontSize: "13px", fontWeight: 500,
      cursor: "pointer", fontFamily: "'Inter',sans-serif",
      boxShadow: "0 0 14px rgba(255,100,0,0.25)", transition: "all 0.2s",
    },

    /* Empty */
    empty: {
      textAlign: "center", padding: "5rem 2rem",
      color: "rgba(255,180,100,0.4)", fontSize: "15px",
    },

    /* Loading */
    loading: {
      textAlign: "center", padding: "5rem 2rem",
    },
    spinner: {
      width: "44px", height: "44px",
      border: "3px solid rgba(255,140,40,0.15)",
      borderTop: "3px solid #ff6a00",
      borderRadius: "50%", margin: "0 auto 1rem",
      animation: "spin 0.8s linear infinite",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .shop-card:hover { transform: translateY(-6px) !important; border-color: rgba(255,150,50,0.4) !important; box-shadow: 0 0 28px rgba(255,100,10,0.2) !important; }
        .view-btn:hover  { background: rgba(255,120,20,0.28) !important; border-color: rgba(255,150,50,0.4) !important; }
        .cart-btn:hover  { box-shadow: 0 0 24px rgba(255,100,0,0.45) !important; transform: translateY(-1px) !important; }
        .cat-btn { padding: 7px 16px; border-radius: 999px; font-size: 12px; font-weight: 500; cursor: pointer; font-family: 'Inter',sans-serif; transition: all 0.2s; border: 1px solid rgba(255,140,40,0.2); background: rgba(255,100,10,0.06); color: rgba(255,180,100,0.65); white-space: nowrap; }
        .cat-btn:hover { border-color: rgba(255,150,50,0.4); color: #fff; }
        .cat-btn.active { background: linear-gradient(135deg,#ff6a00,#ff9a3c); border-color: transparent; color: #fff; box-shadow: 0 0 14px rgba(255,100,0,0.3); }
        .search-box:focus-within { border-color: rgba(255,150,50,0.45) !important; box-shadow: 0 0 0 3px rgba(255,100,10,0.1) !important; }
        .shop-select:focus { border-color: rgba(255,150,50,0.45) !important; }
        .shop-select option { background: #1a0a00; }

        /* ── RESPONSIVE FIXES ── */
        @media (max-width: 700px) {
          .shop-page { padding: 40px 4% !important; }
          .shop-header { margin-bottom: 2rem !important; }
          .shop-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important; gap: 0.9rem !important; }
        }

        @media (max-width: 600px) {
          .shop-controls { flex-direction: column !important; align-items: stretch !important; gap: 0.7rem !important; }
          .search-box { min-width: 0 !important; width: 100% !important; }
          .shop-select { width: 100% !important; }
          .cat-row { flex-wrap: nowrap !important; overflow-x: auto !important; padding-bottom: 6px !important; -ms-overflow-style: none !important; scrollbar-width: none !important; }
          .cat-row::-webkit-scrollbar { display: none !important; }
        }

        @media (max-width: 420px) {
          .shop-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)) !important; gap: 0.7rem !important; }
          .card-img { height: 130px !important; }
          .card-body { padding: 10px !important; gap: 5px !important; }
          .card-name { font-size: 13px !important; }
          .card-price { font-size: 15px !important; }
          .card-footer { flex-direction: column !important; gap: 6px !important; }
        }
      `}</style>

      <div style={styles.page} className="shop-page">
        <div style={styles.container}>

          {/* ── Header ── */}
          <div style={styles.header} className="shop-header">
            <div style={styles.badge}>🛍 Our Collection</div>
            <h1 style={styles.title}>
              Explore <span style={styles.hl}>Products</span>
            </h1>
            <p style={styles.subtitle}>
              Discover our handpicked collection of premium products
            </p>
          </div>

          {/* ── Controls ── */}
          <div style={styles.controls} className="shop-controls">

            {/* Search */}
            <div style={styles.searchBox} className="search-box">
              <span style={{ fontSize: "16px", opacity: 0.5 }}>🔍</span>
              <input
                style={styles.searchInput}
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")}
                  style={{ background: "none", border: "none", color: "rgba(255,180,100,0.5)", cursor: "pointer", fontSize: "16px" }}>
                  ✕
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              style={styles.select}
              className="shop-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* ── Category pills ── */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "2rem" }} className="cat-row">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-btn ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Results row ── */}
          <div style={styles.resultsRow}>
            <span style={styles.resultsText}>
              {loading ? "Loading..." : `${filtered.length} product${filtered.length !== 1 ? "s" : ""} found`}
            </span>
            {(search || category !== "All") && (
              <button
                onClick={() => { setSearch(""); setCategory("All"); setSort("default"); }}
                style={{ background: "none", border: "none", color: "rgba(255,150,50,0.6)", fontSize: "12px", cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
                ✕ Clear filters
              </button>
            )}
          </div>

          {/* ── Loading ── */}
          {loading && (
            <div style={styles.loading}>
              <div style={styles.spinner} />
              <p style={{ color: "rgba(255,180,100,0.45)", fontSize: "14px" }}>Loading products...</p>
            </div>
          )}

          {/* ── Empty ── */}
          {!loading && filtered.length === 0 && (
            <div style={styles.empty}>
              <div style={{ fontSize: "52px", marginBottom: "1rem" }}>🔍</div>
              <p>No products found for your search.</p>
              <button
                onClick={() => { setSearch(""); setCategory("All"); }}
                style={{ marginTop: "1rem", padding: "10px 22px", background: "linear-gradient(135deg,#ff6a00,#ff9a3c)", border: "none", borderRadius: "10px", color: "#fff", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
                Clear Search
              </button>
            </div>
          )}

          {/* ── Product Grid ── */}
          {!loading && filtered.length > 0 && (
            <div style={styles.grid} className="shop-grid">
              {filtered.map((product, i) => (
                <div
                  key={product._id}
                  className="shop-card"
                  style={{ ...styles.card, animationDelay: `${i * 0.05}s`, animation: "fadeUp 0.5s ease both" }}
                >
                  {/* Image */}
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={product.imageurl || "https://via.placeholder.com/300"}
                      alt={product.name}
                      style={styles.cardImg}
                      className="card-img"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/300"; }}
                    />
                  </Link>

                  {/* Body */}
                  <div style={styles.cardBody} className="card-body">
                    <div style={styles.cardCategory}>{product.category}</div>
                    <div style={styles.cardName} className="card-name" title={product.name}>{product.name}</div>
                    <div style={styles.cardPrice} className="card-price">₹{Number(product.price).toLocaleString("en-IN")}</div>
                    <div style={styles.cardStock(product.stock)}>
                      {product.stock > 0 ? `✓ In Stock (${product.stock})` : "✕ Out of Stock"}
                    </div>

                    {/* Buttons */}
                    <div style={styles.cardFooter} className="card-footer">
                      <Link to={`/products/${product._id}`} className="view-btn" style={styles.viewBtn}>
                        View
                      </Link>
                      <button
                        className="cart-btn"
                        style={styles.cartBtn}
                        disabled={product.stock === 0}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Shop;