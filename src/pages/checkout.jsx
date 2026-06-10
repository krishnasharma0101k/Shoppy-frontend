import React, { useState, useContext, useEffect } from "react";
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [address, setAddress] = useState({
    fullName: user?.name || "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  // 🔐 PROTECT PAGE
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0
  );

  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

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

  // 🛒 PLACE ORDER
  const placeOrder = async (paymentId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            product: item.productId || item._id,
            quantity: item.qty || 1,
          })),
          totalAmount: total,
          address: {
            fullname: address.fullName,
            street: address.street,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
          },
          paymentId,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Order failed");

    dispatch(clearCart());
    navigate("/order-success", { state: { order: data.order } });
  };

  // 🧪 TEST ORDER
  const handleTestOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await placeOrder("TEST_" + Date.now());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 💳 RAZORPAY PAYMENT
  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) return navigate("/shop");
    if (!validateForm()) return;

    setLoading(true);

    try {
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Razorpay failed to load");

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
      if (!orderRes.ok) throw new Error(orderData.message);

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        order_id: orderData.id,

        handler: async (response) => {
          try {
            await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/api/payment/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(response),
              }
            );

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

  // 🛒 EMPTY CART UI
  if (!cartItems.length) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/shop")}>Go Shopping</button>
      </div>
    );
  }

  // 🧾 UI
  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <input name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={address.phone} onChange={handleChange} />
      <input name="street" placeholder="Street" value={address.street} onChange={handleChange} />
      <input name="city" placeholder="City" value={address.city} onChange={handleChange} />
      <input name="state" placeholder="State" value={address.state} onChange={handleChange} />
      <input name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Total: ₹{total}</h3>

      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : `Pay ₹${total}`}
      </button>

      <button onClick={handleTestOrder} disabled={loading}>
        Test Order
      </button>

    </div>
  );
};

export default Checkout;