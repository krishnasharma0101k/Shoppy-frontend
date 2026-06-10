import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import "../style/Navbar.css"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state?.cart?.cartItems || []);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* BRAND */}
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <img
            src="/ShoppyLOGO.svg"
            alt="shoppy"
            style={{
              height: "36px",
              width: "36px",
              borderRadius: "8px",
              objectFit: "cover",
              filter: "drop-shadow(0 2px 8px rgba(249, 115, 22, 0.35))",
            }}
          />
          <span>Shoppy</span>
        </Link>
      </div>

      {/* LINKS */}
      <ul className="navbar-links">
        <li>
          <Link to="/shop">Shop</Link>
        </li>

        <li>
          <Link to="/cart">
            Cart{" "}
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </Link>
        </li>

        {/* AUTH SECTION */}
        {user ? (
          <>
            <li>
              <Link to="/profile">Hi, {user.name}</Link>
            </li>

            {user.role === "admin" && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}

            <li>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;