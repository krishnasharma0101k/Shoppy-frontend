import React from "react";

const ReturnPolicy = () => {
  const wrap = {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 2rem",
  };

  const hl = {
    background: "linear-gradient(90deg,#ff6a00,#ffaa44)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const badge = {
    display: "inline-block",
    padding: "4px 14px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#ff9a3c",
    background: "rgba(255,106,0,0.1)",
    border: "1px solid rgba(255,140,40,0.25)",
    marginBottom: "1rem",
  };

  const card = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,140,40,0.15)",
    borderRadius: "18px",
    padding: "2rem",
    marginBottom: "1.5rem",
    backdropFilter: "blur(10px)",
    transition: "all .25s ease",
  };

  const heading = {
    color: "#fff",
    fontSize: "20px",
    fontWeight: 600,
    marginBottom: "1rem",
  };

  const text = {
    color: "rgba(255,200,140,0.65)",
    lineHeight: "1.9",
    fontSize: "14px",
  };

  return (
    <>
      <style>{`
        *{
          box-sizing:border-box;
        }

        .policy-card:hover{
          transform:translateY(-4px);
          border-color:rgba(255,150,50,.4)!important;
          box-shadow:0 0 25px rgba(255,100,0,.18);
        }

        @keyframes glow {
          0%,100%{opacity:.6}
          50%{opacity:1}
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#0f0f0f",
          color: "#fff",
          fontFamily: "'Inter',sans-serif",
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,90,0,.10) 0%, transparent 60%)",
        }}
      >
        {/* HERO */}
        <section
          style={{
            padding: "6rem 0 4rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-100px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "700px",
              height: "400px",
              background:
                "radial-gradient(circle, rgba(255,90,0,.12) 0%, transparent 70%)",
              animation: "glow 4s infinite",
            }}
          />

          <div style={wrap}>
            <div style={badge}>Customer Support</div>

            <h1
              style={{
                fontSize: "clamp(34px,6vw,60px)",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              Return <span style={hl}>Policy</span>
            </h1>

            <p
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                color: "rgba(255,200,140,0.6)",
                lineHeight: "1.9",
                fontSize: "15px",
              }}
            >
              We want you to love every purchase from Shoppy. If you're not
              completely satisfied, we're here to help with easy returns and
              refunds.
            </p>
          </div>
        </section>

        {/* POLICY CONTENT */}
        <section style={{ paddingBottom: "5rem" }}>
          <div style={wrap}>
            <div style={card} className="policy-card">
              <h2 style={heading}>1. Return Eligibility</h2>
              <p style={text}>
                Products may be returned within 7 days of delivery if they are
                unused, in original condition, and include all original
                packaging, accessories, tags, and invoices.
              </p>
            </div>

            <div style={card} className="policy-card">
              <h2 style={heading}>2. Non-Returnable Items</h2>
              <p style={text}>
                Certain products cannot be returned, including personal care
                items, undergarments, customized products, gift cards, digital
                downloads, and items marked as non-returnable at the time of
                purchase.
              </p>
            </div>

            <div style={card} className="policy-card">
              <h2 style={heading}>3. Damaged or Defective Products</h2>
              <p style={text}>
                If you receive a damaged, defective, or incorrect product,
                please contact our support team within 48 hours of delivery with
                photos or videos for verification.
              </p>
            </div>

            <div style={card} className="policy-card">
              <h2 style={heading}>4. Refund Process</h2>
              <p style={text}>
                Once the returned item is received and inspected, refunds will
                be processed to the original payment method within 5–10 business
                days. Processing times may vary depending on your bank or
                payment provider.
              </p>
            </div>

            <div style={card} className="policy-card">
              <h2 style={heading}>5. Exchange Policy</h2>
              <p style={text}>
                Eligible products may be exchanged for a different size, color,
                or replacement item, subject to stock availability.
              </p>
            </div>

            <div style={card} className="policy-card">
              <h2 style={heading}>6. Return Shipping</h2>
              <p style={text}>
                Return shipping may be free for damaged, defective, or incorrect
                items. For other returns, shipping costs may be deducted from
                the refund amount unless otherwise specified.
              </p>
            </div>

            <div style={card} className="policy-card">
              <h2 style={heading}>7. Contact Us</h2>
              <p style={text}>
                If you have any questions regarding returns, refunds, or
                exchanges, please contact our support team at
                support@shoppy.com.
              </p>
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: "3rem",
                color: "rgba(255,180,100,.35)",
                fontSize: "13px",
                letterSpacing: "1px",
              }}
            >
              Last Updated: June 2026
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ReturnPolicy;

// import React from "react";

// const ReturnPolicy = () => {
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#0f0f0f",
//         color: "#fff",
//         padding: "50px",
//       }}
//     >
//       <h1>Return Policy</h1>
//       <p>Page is working successfully.</p>
//     </div>
//   );
// };

// export default ReturnPolicy;