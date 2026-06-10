import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await (`${process.env.REACT_APP_BACKEND_URL}/api/analytics`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setStats({
            totalUsers: data.totalUsers || 0,
            totalOrders: data.totalOrders || 0,
            totalProducts: data.totalProducts || 0,
            totalRevenue: data.totalRevenue || 0,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, navigate]);

  const StatCard = ({ title, value }) => (
    <div className="glass" style={{ padding: "20px", textAlign: "center" }}>
      <h4 style={{ color: "rgba(255,200,140,0.8)" }}>{title}</h4>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#fff",
          textShadow:
            "0 0 15px rgba(255,120,20,0.7), 0 0 30px rgba(255,80,0,0.4)",
        }}
      >
        {value}
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="container">
      {/* HEADER */}
      <div className="hero-banner">
        <h1 className="text-glow">Admin Dashboard</h1>
        <p>
          Welcome back, <span style={{ color: "#fff" }}>{user?.name}</span>
        </p>
      </div>

      {/* STATS GRID */}
      <div className="product-grid">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Total Products" value={stats.totalProducts} />
        <StatCard
          title="Total Revenue"
          value={`₹${(stats.totalRevenue || 0).toFixed(2)}`}
        />
      </div>

      {/* ACTIONS */}
      <div className="glass" style={{ padding: "25px", marginTop: "30px" }}>
        <h2 className="text-glow" style={{ marginBottom: "20px" }}>
          Admin Controls
        </h2>

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <button
            className="checkout-pay-btn"
            onClick={() => navigate("/admin/add-product")}
          >
            ➕ Add Product
          </button>

          <button
            className="checkout-pay-btn"
            style={{ background: "#333" }}
            onClick={() => navigate("/admin/products")}
          >
            📦 Manage Products
          </button>

          <button
            className="checkout-pay-btn"
            style={{ background: "#333" }}
            onClick={() => navigate("/admin/orders")}
          >
            🚚 Manage Orders
          </button>

          <button
            className="checkout-pay-btn"
            style={{ background: "#333" }}
            onClick={() => navigate("/admin/users")}
          >
            👥 Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
