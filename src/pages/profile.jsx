import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          if (res.status === 401) {
            logout();
            navigate("/login");
          }
          setOrders([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="checkout-page">
      <div className="checkout-wrapper">

        {/* HEADER */}
        <div className="checkout-header">
          <div className="checkout-badge">👤 My Account</div>
          <h1 className="checkout-title">
            Profile <span>Dashboard</span>
          </h1>
          <p className="checkout-subtitle">
            Manage your account and view order history
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="checkout-section">
          <h2 className="checkout-section-title">🧑 Personal Info</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>

            <div>
              <span className="razorpay-badge">
                {user.role ? user.role.toUpperCase() : "USER"}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="checkout-pay-btn"
            style={{
              marginTop: "20px",
              background: "linear-gradient(135deg, #ef4444, #f97316)",
            }}
          >
            Logout
          </button>
        </div>

        {/* ORDERS */}
        <div className="checkout-section">
          <h2 className="checkout-section-title">📦 Order History</h2>

          {loading ? (
            <p style={{ color: "rgba(255,200,140,0.6)" }}>
              Loading your orders...
            </p>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "rgba(255,200,140,0.6)" }}>
                No orders found
              </p>

              <Link to="/shop">
                <button className="checkout-pay-btn">
                  Start Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="summary-items">
              {orders.map((order) => (
                <div key={order._id} className="summary-item">

                  <div className="summary-item-info">
                    <div className="summary-item-name">
                      Order #{order._id.slice(-6)}
                    </div>

                    <div style={{ fontSize: "12px", color: "rgba(255,200,140,0.6)" }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="summary-item-price">
                    ₹{order.totalAmount.toFixed(2)}
                  </div>

                  <div
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      fontSize: "11px",
                      fontWeight: "600",
                      color:
                        order.status === "Delivered"
                          ? "#22c55e"
                          : order.status === "Shipped"
                          ? "#3b82f6"
                          : "#f59e0b",
                      background:
                        order.status === "Delivered"
                          ? "rgba(34,197,94,0.1)"
                          : order.status === "Shipped"
                          ? "rgba(59,130,246,0.1)"
                          : "rgba(245,158,11,0.1)",
                      border: "1px solid rgba(255,140,40,0.15)",
                    }}
                  >
                    {order.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;