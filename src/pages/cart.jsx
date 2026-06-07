// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { removeFromCart, clearCart, addToCart } from "../redux/cardSlice";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const cartItems = useSelector((state) => state.cart.cartItems);

//   const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
//   const shipping = subtotal > 999 ? 0 : 99;
//   const total = subtotal + shipping;

//   const handleIncrease = (item) => {
//     dispatch(addToCart({ ...item, qty: item.qty + 1 }));
//   };

//   const handleDecrease = (item) => {
//     if (item.qty <= 1) {
//       dispatch(removeFromCart(item.productId));
//     } else {
//       dispatch(addToCart({ ...item, qty: item.qty - 1 }));
//     }
//   };

//   const hl = {
//     background: "linear-gradient(90deg,#ff6a00,#ffaa44)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//     backgroundClip: "text",
//   };

//   /* ── Empty State ── */
//   if (cartItems.length === 0) {
//     return (
//       <>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`}</style>
//         <div style={{ minHeight: "100vh", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif" }}>
//           <div style={{ textAlign: "center", padding: "2rem" }}>
//             <div style={{ fontSize: "80px", marginBottom: "1.5rem" }}>🛒</div>
//             <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#fff", marginBottom: "0.8rem" }}>
//               Your cart is <span style={hl}>empty</span>
//             </h2>
//             <p style={{ fontSize: "14px", color: "rgba(255,200,140,0.5)", marginBottom: "2rem" }}>
//               Looks like you haven't added anything yet.
//             </p>
//             <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "12px 28px", background: "linear-gradient(135deg,#ff6a00,#ff9a3c)", color: "#fff", borderRadius: "12px", fontSize: "14px", fontWeight: 500, textDecoration: "none", boxShadow: "0 0 20px rgba(255,100,0,0.3)" }}>
//               Browse Products →
//             </Link>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
//         * { box-sizing: border-box; }
//         .cart-item-card:hover { border-color: rgba(255,150,50,0.35) !important; box-shadow: 0 0 20px rgba(255,100,10,0.12) !important; }
//         .qty-btn:hover  { background: rgba(255,110,10,0.28) !important; border-color: rgba(255,150,50,0.5) !important; color: #fff !important; }
//         .rm-btn:hover   { background: rgba(248,113,113,0.18) !important; color: #fca5a5 !important; }
//         .checkout-btn:hover { box-shadow: 0 0 36px rgba(255,100,0,0.55) !important; transform: translateY(-2px) !important; }
//         .continue-btn:hover { border-color: rgba(255,150,50,0.4) !important; color: #fff !important; }
//         .clear-btn:hover    { color: #f87171 !important; }
//         @media (max-width: 900px) {
//           .cart-layout { grid-template-columns: 1fr !important; }
//         }
//         @media (max-width: 560px) {
//           .cart-item-card { grid-template-columns: 80px 1fr !important; }
//           .rm-col { grid-column: 1 / -1; display: flex; justify-content: flex-end; }
//         }
//       `}</style>

//       <div style={{ minHeight: "100vh", background: "#0f0f0f", backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,90,0,0.10) 0%, transparent 60%)", padding: "60px 5%", fontFamily: "'Inter',sans-serif", color: "#fff" }}>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

//           {/* ── Header ── */}
//           <div style={{ marginBottom: "2.5rem" }}>
//             <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#ff9a3c", background: "rgba(255,106,0,0.1)", border: "1px solid rgba(255,140,40,0.25)", marginBottom: "0.8rem" }}>
//               🛍 Your Cart
//             </div>
//             <h1 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, color: "#fff", marginBottom: "0.3rem" }}>
//               Shopping <span style={hl}>Cart</span>
//             </h1>
//             <p style={{ fontSize: "14px", color: "rgba(255,200,140,0.5)" }}>
//               {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in your cart
//             </p>
//           </div>

//           {/* ── Layout ── */}
//           <div className="cart-layout" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", alignItems: "start" }}>

//             {/* ── Items ── */}
//             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//               {cartItems.map((item) => (
//                 <div key={item.productId} className="cart-item-card"
//                   style={{ display: "grid", gridTemplateColumns: "100px 1fr auto", gap: "1.2rem", alignItems: "center", padding: "1.2rem", borderRadius: "14px", background: "rgba(255,100,10,0.05)", border: "1px solid rgba(255,140,40,0.15)", backdropFilter: "blur(12px)", transition: "border-color 0.22s, box-shadow 0.22s" }}>

//                   {/* Image */}
//                   <img
//                     src={item.imageUrl || "https://via.placeholder.com/100"}
//                     alt={item.name}
//                     onError={(e) => { e.target.src = "https://via.placeholder.com/100"; }}
//                     style={{ width: "100px", height: "100px", borderRadius: "10px", objectFit: "cover", background: "#1a1a1a", border: "1px solid rgba(255,140,40,0.15)", display: "block" }}
//                   />

//                   {/* Info */}
//                   <div>
//                     <div style={{ fontSize: "15px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>{item.name}</div>
//                     <div style={{ fontSize: "13px", color: "rgba(255,180,100,0.55)", marginBottom: "14px" }}>₹{Number(item.price).toFixed(2)} each</div>

//                     {/* Qty controls */}
//                     <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
//                       <button className="qty-btn" onClick={() => handleDecrease(item)}
//                         style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid rgba(255,140,40,0.25)", background: "rgba(255,100,10,0.1)", color: "#ff9a3c", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", fontFamily: "'Inter',sans-serif", lineHeight: 1 }}>
//                         −
//                       </button>
//                       <span style={{ fontSize: "15px", fontWeight: 600, color: "#fff", minWidth: "20px", textAlign: "center" }}>{item.qty}</span>
//                       <button className="qty-btn" onClick={() => handleIncrease(item)}
//                         style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid rgba(255,140,40,0.25)", background: "rgba(255,100,10,0.1)", color: "#ff9a3c", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", fontFamily: "'Inter',sans-serif", lineHeight: 1 }}>
//                         +
//                       </button>
//                     </div>

//                     {/* Item total */}
//                     <div style={{ fontSize: "16px", fontWeight: 700, ...hl }}>
//                       ₹{(item.price * item.qty).toFixed(2)}
//                     </div>
//                   </div>

//                   {/* Remove */}
//                   <div className="rm-col">
//                     <button className="rm-btn" onClick={() => dispatch(removeFromCart(item.productId))}
//                       style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171", borderRadius: "8px", padding: "7px 14px", fontSize: "12px", cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: "all 0.2s", alignSelf: "start", whiteSpace: "nowrap" }}>
//                       ✕ Remove
//                     </button>
//                   </div>

//                 </div>
//               ))}
//             </div>

//             {/* ── Order Summary ── */}
//             <div style={{ borderRadius: "18px", background: "rgba(255,100,10,0.06)", border: "1px solid rgba(255,140,40,0.18)", backdropFilter: "blur(16px)", padding: "1.8rem", position: "sticky", top: "80px", boxShadow: "0 0 40px rgba(255,90,0,0.08), inset 0 1px 0 rgba(255,180,80,0.1)" }}>

//               <div style={{ fontSize: "16px", fontWeight: 600, color: "#fff", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,140,40,0.15)" }}>
//                 Order Summary
//               </div>

//               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "rgba(255,200,140,0.6)", marginBottom: "0.8rem" }}>
//                 <span>Subtotal ({cartItems.length} items)</span>
//                 <span>₹{subtotal.toFixed(2)}</span>
//               </div>

//               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "rgba(255,200,140,0.6)", marginBottom: "0.5rem" }}>
//                 <span>Shipping</span>
//                 <span>
//                   {shipping === 0
//                     ? <span style={{ color: "#22c55e", fontWeight: 500 }}>FREE ✓</span>
//                     : `₹${shipping}`}
//                 </span>
//               </div>

//               {shipping > 0 && (
//                 <div style={{ fontSize: "11px", color: "rgba(255,180,100,0.4)", marginBottom: "0.8rem", padding: "6px 10px", background: "rgba(255,100,10,0.06)", borderRadius: "6px", border: "1px solid rgba(255,140,40,0.1)" }}>
//                   Add ₹{(999 - subtotal).toFixed(0)} more for free shipping 🚚
//                 </div>
//               )}

//               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: 700, color: "#fff", paddingTop: "1rem", marginTop: "0.5rem", borderTop: "1px solid rgba(255,140,40,0.15)" }}>
//                 <span>Total</span>
//                 <span style={hl}>₹{total.toFixed(2)}</span>
//               </div>

//               <button className="checkout-btn" onClick={() => navigate("/checkout")}
//                 style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg,#ff6a00,#ff9a3c)", color: "#fff", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif", boxShadow: "0 0 22px rgba(255,100,0,0.3)", transition: "all 0.22s", marginTop: "1.5rem" }}>
//                 Proceed to Checkout →
//               </button>

//               <Link to="/shop" className="continue-btn"
//                 style={{ width: "100%", padding: "11px", background: "transparent", color: "rgba(255,180,100,0.7)", border: "1px solid rgba(255,140,40,0.2)", borderRadius: "12px", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: "all 0.22s", marginTop: "0.7rem", textAlign: "center", display: "block", textDecoration: "none" }}>
//                 ← Continue Shopping
//               </Link>

//               <button className="clear-btn" onClick={() => dispatch(clearCart())}
//                 style={{ background: "none", border: "none", color: "rgba(248,113,113,0.5)", fontSize: "12px", cursor: "pointer", fontFamily: "'Inter',sans-serif", marginTop: "1rem", display: "block", width: "100%", textAlign: "center", transition: "color 0.2s" }}>
//                 Clear entire cart
//               </button>

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cart;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, clearCart, addToCart } from "../redux/cardSlice";
import "../style/cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleIncrease = (item) => {
    dispatch(addToCart({ ...item, qty: item.qty + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.qty <= 1) {
      dispatch(removeFromCart(item.productId));
    } else {
      dispatch(addToCart({ ...item, qty: item.qty - 1 }));
    }
  };

  /* ── Empty State ── */
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-inner">
          <div className="cart-empty-icon">🛒</div>
          <h2 className="cart-empty-title">
            Your cart is <span>empty</span>
          </h2>
          <p className="cart-empty-text">
            Looks like you haven't added anything yet.
          </p>
          <Link to="/shop" className="cart-shop-btn">
            Browse Products →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-wrapper">

        {/* ── Header ── */}
        <div className="cart-header">
          <div className="cart-badge">🛍 Your Cart</div>
          <h1 className="cart-title">
            Shopping <span>Cart</span>
          </h1>
          <p className="cart-count">
            {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in your cart
          </p>
        </div>

        {/* ── Layout ── */}
        <div className="cart-layout">

          {/* ── Items ── */}
          <div className="cart-items-col">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item-card">

                {/* Image */}
                <img
                  src={item.imageUrl || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="cart-item-img"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/100"; }}
                />

                {/* Info */}
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-unit-price">
                    ₹{Number(item.price).toFixed(2)} each
                  </div>

                  {/* Qty */}
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => handleDecrease(item)}>−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button className="qty-btn" onClick={() => handleIncrease(item)}>+</button>
                  </div>

                  <div className="cart-item-total">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </div>
                </div>

                {/* Remove */}
                <div className="rm-col">
                  <button
                    className="rm-btn"
                    onClick={() => dispatch(removeFromCart(item.productId))}
                  >
                    ✕ Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* ── Order Summary ── */}
          <div className="cart-summary">

            <div className="summary-title">Order Summary</div>

            <div className="summary-row">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>
                {shipping === 0
                  ? <span className="summary-free-ship">FREE ✓</span>
                  : `₹${shipping}`}
              </span>
            </div>

            {shipping > 0 && (
              <div className="summary-ship-hint">
                Add ₹{(999 - subtotal).toFixed(0)} more for free shipping 🚚
              </div>
            )}

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>
              <span className="summary-total-amount">₹{total.toFixed(2)}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout →
            </button>

            <Link to="/shop" className="continue-btn">
              ← Continue Shopping
            </Link>

            <button
              className="clear-btn"
              onClick={() => dispatch(clearCart())}
            >
              Clear entire cart
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;