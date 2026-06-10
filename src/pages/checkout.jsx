import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cardSlice";
import { AuthContext } from "../context/AuthContext";
import "../style/checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const cartItems = useSelector((state) => state.cart.cartItems || []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0
  );

  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const [address, setAddress] = useState({
    fullName: user?.name || "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ─── AUTH GUARD ────────────────────────────────────────────────────────────
  // If no user is logged in, show a prompt instead of the checkout form.
  if (!user) {
    return (
      <div className="checkout-empty">
        <div className="checkout-empty-inner">
          <div
            style={{
              fontSize: "48px",
              marginBottom: "12px",
              lineHeight: 1,
            }}
          >
            🔒
          </div>
          <h2>Sign in to continue</h2>
          <p>You need to be logged in to place an order.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "8px" }}>
            <button
              className="checkout-pay-btn"
              onClick={() => navigate("/login", { state: { from: "/checkout" } })}
            >
              Log In
            </button>
            <button
              className="checkout-pay-btn"
              style={{ background: "#333" }}
              onClick={() => navigate("/register", { state: { from: "/checkout" } })}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
  // ──────────────────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { fullName, phone, street, city, state, pincode } = address;

    if (!fullName || !phone || !street || !city || !state || !pincode) {
      setError("Please fill all fields");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Invalid phone number");
      return false;
    }

    if (!/^\d{6}$/.test(pincode)) {
      setError("Invalid pincode");
      return false;
    }

    setError("");
    return true;
  };

  const placeOrder = async (paymentId) => {
    // Re-check auth before sending the request (token could have expired)
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: "/checkout" } });
      throw new Error("Session expired. Please log in again.");
    }

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: cartItems.map((item) => ({
          product: item.productId || item._id,
          quantity: Number(item.qty || 1),
        })),
        totalAmount: Number(total),
        address: {
          fullname: address.fullName,
          street: address.street,
          city: address.city,
        },
        paymentId,
      }),
    });

    const data = await res.json();

    // Handle 401 Unauthorized explicitly
    if (res.status === 401) {
      navigate("/login", { state: { from: "/checkout" } });
      throw new Error("Session expired. Please log in again.");
    }

    if (!res.ok) throw new Error(data.message || "Order failed");

    dispatch(clearCart());
    navigate("/order-success", { state: { order: data.order } });
  };

  const handleTestOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      await placeOrder("TEST_" + Date.now());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (cartItems.length === 0) return navigate("/shop");
    if (!validateForm()) return;

    setLoading(true);

    try {
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Razorpay failed to load");

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { state: { from: "/checkout" } });
        return;
      }

      const orderRes = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/payment/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: total }),
        }
      );

      const orderData = await orderRes.json();

      if (orderRes.status === 401) {
        navigate("/login", { state: { from: "/checkout" } });
        return;
      }

      if (!orderRes.ok) throw new Error(orderData.message);

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        order_id: orderData.id,

        handler: async (response) => {
          try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payment/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(response),
            });

            await placeOrder(response.razorpay_payment_id);
          } catch (err) {
            setError(err.message);
          }
        },

        prefill: {
          name: address.fullName,
          contact: address.phone,
          email: user?.email || "",
        },
        theme: { color: "#ff6a00" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems.length) {
    return (
      <div className="checkout-empty">
        <div className="checkout-empty-inner">
          <h2>Your cart is empty</h2>
          <p>Add items to continue checkout</p>
          <button onClick={() => navigate("/shop")} className="checkout-pay-btn">
            Go Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-wrapper">

        {/* HEADER */}
        <div className="checkout-header">
          <div className="checkout-badge">SECURE CHECKOUT</div>
          <h1 className="checkout-title">
            Complete <span>Order</span>
          </h1>
          <p className="checkout-subtitle">Fill details to continue</p>
        </div>

        <div className="checkout-layout">

          {/* FORM */}
          <div className="checkout-form-col">
            <div className="checkout-section">
              <h2 className="checkout-section-title">Shipping Address</h2>

              <div className="form-grid">
                {Object.keys(address).map((key) => (
                  <div
                    className={`form-group ${
                      key === "fullName" || key === "phone" ? "full" : ""
                    }`}
                    key={key}
                  >
                    <label>{key}</label>
                    <input
                      name={key}
                      value={address[key]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            </div>

            {error && <div className="checkout-error">{error}</div>}
          </div>

          {/* SUMMARY */}
          <div className="checkout-summary">
            <div className="summary-title">Order Summary</div>

            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.productId} className="summary-item">
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/50"}
                    className="summary-item-img"
                    alt=""
                  />
                  <div>
                    <div className="summary-item-name">{item.name}</div>
                    <div className="summary-item-price">
                      ₹{item.price * (item.qty || 1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span className="summary-total-amt">₹{total}</span>
            </div>

            <button
              className="checkout-pay-btn"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay ₹${total}`}
            </button>

            <button
              className="checkout-pay-btn"
              style={{ marginTop: "10px", background: "#333" }}
              onClick={handleTestOrder}
              disabled={loading}
            >
              Test Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;