import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.filter((product) => product._id !== id)
        );
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading Products...</div>;
  }

  return (
    <div
      className="container"
      style={{
        maxWidth: "1400px",
        marginTop: "20px",
      }}
    >
      <div className="glass" style={{ padding: "20px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <h2
              className="text-glow"
              style={{
                fontSize: "1.6rem",
                marginBottom: "5px",
              }}
            >
              Product Management
            </h2>

            <p
              style={{
                color: "rgba(255,200,140,0.7)",
                fontSize: "0.9rem",
              }}
            >
              Total Products: {products.length}
            </p>
          </div>

          <Link
            to="/admin/add-product"
            className="theme-btn"
          >
            ➕ Add Product
          </Link>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id.slice(0, 8)}...</td>

                  <td
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                    }}
                  >
                    {product.name}
                  </td>

                  <td>
                    ₹
                    {Number(product.price || 0).toFixed(2)}
                  </td>

                  <td>{product.category}</td>

                  <td>
                    <span
                      className={`badge ${
                        product.stock > 10
                          ? "badge-stock-high"
                          : product.stock > 0
                          ? "badge-stock-medium"
                          : "badge-stock-low"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        className="theme-btn-secondary"
                        style={{
                          padding: "6px 10px",
                          fontSize: "0.8rem",
                        }}
                      >
                        ✏️ Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(product._id)
                        }
                        className="theme-btn-danger"
                        style={{
                          padding: "6px 10px",
                          fontSize: "0.8rem",
                        }}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div
              style={{
                padding: "30px",
                textAlign: "center",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;