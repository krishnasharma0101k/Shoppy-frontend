import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch( `${process.env.REACT_APP_BACKEND_URL}/api/auth/users`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <div className="container">
      {/* HEADER */}
      <div className="hero-banner">
        <h1 className="text-glow">User Management</h1>
        <p>
          Manage all registered users in your system
        </p>
      </div>

      {/* TABLE WRAPPER */}
      <div className="glass" style={{ padding: "20px", overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>NAME</th>
              <th style={thStyle}>EMAIL</th>
              <th style={thStyle}>ROLE</th>
              <th style={thStyle}>JOINED</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} style={rowStyle}>
                <td style={tdStyle}>
                  <span style={idStyle}>
                    {u._id.substring(0, 8)}...
                  </span>
                </td>

                <td style={tdStyle}>
                  <span style={nameStyle}>{u.name}</span>
                </td>

                <td style={tdStyle}>{u.email}</td>

                <td style={tdStyle}>
                  <span
                    style={{
                      ...roleBadge,
                      background:
                        u.role === "admin"
                          ? "rgba(255,120,20,0.15)"
                          : "rgba(34,197,94,0.12)",
                      color:
                        u.role === "admin" ? "#ff7a18" : "#22c55e",
                      boxShadow:
                        u.role === "admin"
                          ? "0 0 12px rgba(255,120,20,0.25)"
                          : "0 0 12px rgba(34,197,94,0.15)",
                    }}
                  >
                    {u.role.toUpperCase()}
                  </span>
                </td>

                <td style={tdStyle}>
                  <span style={dateStyle}>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ================= THEME STYLES ================= */

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  color: "#fff",
};

const rowStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  transition: "all 0.3s ease",
};

const thStyle = {
  padding: "14px",
  textAlign: "left",
  color: "rgba(255,200,140,0.7)",
  fontSize: "0.85rem",
  letterSpacing: "1px",
  textTransform: "uppercase",
};

const tdStyle = {
  padding: "14px",
  textAlign: "left",
  color: "#e5e5e5",
};

const idStyle = {
  color: "rgba(255,255,255,0.6)",
  fontSize: "0.85rem",
};

const nameStyle = {
  color: "#fff",
  fontWeight: "600",
  textShadow: "0 0 10px rgba(255,120,20,0.2)",
};

const roleBadge = {
  padding: "5px 10px",
  borderRadius: "6px",
  fontSize: "0.75rem",
  fontWeight: "700",
  letterSpacing: "1px",
};

const dateStyle = {
  color: "rgba(255,255,255,0.6)",
  fontSize: "0.85rem",
};

export default AdminUsers;