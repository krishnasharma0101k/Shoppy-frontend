// // src/components/Footer.jsx

// import React from "react";
// // import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
        
//         <div className="footer-section">
//           <h2>Shoppy</h2>
//           <p>Your one-stop online shopping destination.</p>
//         </div>

//         <div className="footer-section">
//           <h3>Quick Links</h3>

//           <ul>
//             <li><a href="/">Home</a></li>
//             <li><a href="/shop">Shop</a></li>
//             <li><a href="/cart">Cart</a></li>
//             <li><a href="/login">Login</a></li>
//           </ul>
//         </div>

//         <div className="footer-section">
//           <h3>Contact</h3>

//           <p>Email: support@shoppy.com</p>
//           <p>Phone: +91 9876543210</p>
//         </div>

//       </div>

//       <div className="footer-bottom">
//         <p>© 2026 Shoppy. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        padding: "40px 20px",
        marginTop: "auto",

        background: "rgba(255, 120, 20, 0.06)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",

        borderTop: "1px solid rgba(255, 140, 40, 0.25)",

        boxShadow:
          "0 -10px 30px rgba(255, 110, 10, 0.15), 0 -30px 80px rgba(255, 80, 0, 0.08)",

        color: "rgba(255, 220, 180, 0.9)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",

          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* BRAND */}
        <div>
          <h2
            style={{
              color: "#fff",
              marginBottom: "8px",
              fontSize: "20px",

              textShadow:
                "0 0 16px rgba(255, 130, 30, 0.7), 0 0 32px rgba(255, 90, 0, 0.35)",
            }}
          >
            Shoppy
          </h2>

          <p
            style={{
              color: "rgba(255, 200, 140, 0.75)",
              fontSize: "0.9rem",
            }}
          >
            Premium E-Commerce Experience
          </p>
        </div>

        {/* LINKS */}
        <div
          style={{
            display: "flex",
            gap: "18px",
            flexWrap: "wrap",
          }}
        >
          {[
            { name: "About Us", path: "/about" },
            { name: "Return Policy", path: "/return" },
            { name: "Disclaimer", path: "/disclaimer" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.path}
              style={{
                color: "rgba(255, 200, 140, 0.8)",
                textDecoration: "none",
                fontSize: "0.9rem",

                padding: "6px 10px",
                borderRadius: "8px",

                transition: "0.2s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.color = "#fff";
                e.target.style.background = "rgba(255, 120, 20, 0.18)";
                e.target.style.boxShadow =
                  "0 0 18px rgba(255, 100, 10, 0.25)";
              }}
              onMouseOut={(e) => {
                e.target.style.color = "rgba(255, 200, 140, 0.8)";
                e.target.style.background = "transparent";
                e.target.style.boxShadow = "none";
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* COPYRIGHT */}
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "20px",
            paddingTop: "15px",

            borderTop: "1px solid rgba(255, 140, 40, 0.15)",

            color: "rgba(255, 180, 120, 0.7)",
            fontSize: "0.85rem",
          }}
        >
          &copy; {new Date().getFullYear()} Shoppy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;