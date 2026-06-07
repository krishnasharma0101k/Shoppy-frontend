import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="container">
      <div
        className="glass"
        style={{
          maxWidth: "600px",
          margin: "60px auto",
          padding: "50px 30px",
          textAlign: "center",
        }}
      >
        {/* SUCCESS ICON / TITLE */}
        <h1
          className="text-glow"
          style={{
            fontSize: "2.4rem",
            marginBottom: "15px",
          }}
        >
          🎉 Order Successful!
        </h1>

        {/* MESSAGE */}
        <p
          style={{
            color: "rgba(255, 200, 140, 0.75)",
            fontSize: "1.1rem",
            lineHeight: "1.6",
            marginBottom: "35px",
          }}
        >
          Thank you for your purchase. Your order has been placed successfully
          and is now being processed. You will receive updates shortly.
        </p>

        {/* ORDER STATUS CARD */}
        <div
          style={{
            background: "rgba(255, 120, 20, 0.05)",
            border: "1px solid rgba(255, 120, 20, 0.2)",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "30px",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          We’ll notify you when your order is shipped 🚚
        </div>

        {/* BUTTON */}
        <Link
          to="/shop"
          className="theme-btn"
          style={{
            display: "inline-block",
            textDecoration: "none",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;