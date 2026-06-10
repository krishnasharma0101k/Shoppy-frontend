import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH ORDERS =================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch( `${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const data = await res.json();

        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch orders error:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchOrders();
  }, [user]);

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch( `${process.env.REACT_APP_BACKEND_URL}/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === id ? { ...o, status } : o
          )
        );
      }
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="container">
        <div className="glass" style={{ padding: "30px", textAlign: "center" }}>
          <div className="loading">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">

      {/* HEADER */}
      <div className="hero-banner" style={{ padding: "30px 20px" }}>
        <h1 className="text-glow">Order Management</h1>
        <p style={{ color: "rgba(255,200,140,0.7)" }}>
          Admin can track and update all customer orders
        </p>
      </div>

      {/* TABLE */}
      <div className="glass" style={{ padding: "18px" }}>

        {orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.5)" }}>
            📦 No orders found
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">

              <thead>
                <tr>
                  <th>ORDER ID</th>
                  <th>USER</th>
                  <th>ADDRESS</th>
                  <th>TOTAL</th>
                  <th>PAYMENT</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>

                    {/* ORDER ID */}
                    <td style={{ fontFamily: "monospace", color: "rgba(255,180,100,0.8)" }}>
                      {order._id?.substring(0, 10)}...
                    </td>

                    {/* USER */}
                    <td>
                      <div style={{ color: "#fff", fontWeight: 500 }}>
                        {order.user?.name || "Deleted User"}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "rgba(255,200,140,0.5)" }}>
                        {order.user?.email || ""}
                      </div>
                    </td>

                    {/* ADDRESS (FIXED - NO OBJECT ERROR) */}
                    <td style={{ fontSize: "0.8rem", color: "rgba(255,200,140,0.7)" }}>
                      {order.address
                        ? `${order.address.fullname}, ${order.address.street}, ${order.address.city}`
                        : "—"}
                    </td>

                    {/* TOTAL */}
                    <td style={{ color: "#ff9a3c", fontWeight: 600 }}>
                      ₹{order.totalAmount?.toFixed(2)}
                    </td>

                    {/* PAYMENT ID */}
                    <td style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(255,200,100,0.5)" }}>
                      {order.paymentId ? order.paymentId.substring(0, 12) : "—"}
                    </td>

                    {/* DATE */}
                    <td style={{ color: "rgba(255,200,140,0.6)", fontSize: "0.85rem" }}>
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    {/* STATUS */}
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className={`status-select status-${order.status?.toLowerCase()}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;