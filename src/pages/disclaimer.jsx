import React from "react";

const Disclaimer = () => {
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
  };

  const title = {
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

        @keyframes glow {
          0%,100%{
            opacity:.6;
          }
          50%{
            opacity:1;
          }
        }

        .card-hover{
          transition:all .25s ease;
        }

        .card-hover:hover{
          transform:translateY(-4px);
          border-color:rgba(255,150,50,.4)!important;
          box-shadow:0 0 25px rgba(255,100,0,.18);
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
              width: "700px",
              height: "400px",
              left: "50%",
              top: "-100px",
              transform: "translateX(-50%)",
              background:
                "radial-gradient(circle, rgba(255,90,0,.12) 0%, transparent 70%)",
              animation: "glow 4s infinite",
            }}
          />

          <div style={wrap}>
            <div style={badge}>Legal Information</div>

            <h1
              style={{
                fontSize: "clamp(34px,6vw,60px)",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              Website <span style={hl}>Disclaimer</span>
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
              Please read this disclaimer carefully before using Shoppy. By
              accessing our website, you agree to the terms described below.
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section style={{ paddingBottom: "5rem" }}>
          <div style={wrap}>
            <div style={{ ...card }} className="card-hover">
              <h2 style={title}>1. General Information</h2>
              <p style={text}>
                All information provided on Shoppy is published in good faith
                and for general informational purposes only. We make no
                guarantees regarding the completeness, reliability, or accuracy
                of any information displayed on this website.
              </p>
            </div>

            <div style={card} className="card-hover">
              <h2 style={title}>2. Product Information</h2>
              <p style={text}>
                Product descriptions, images, specifications, and pricing may
                change without prior notice. While we strive for accuracy,
                occasional errors may occur and Shoppy reserves the right to
                correct them at any time.
              </p>
            </div>

            <div style={card} className="card-hover">
              <h2 style={title}>3. External Links</h2>
              <p style={text}>
                Our website may contain links to third-party websites. We do not
                control the content or practices of these websites and are not
                responsible for any loss or damages resulting from their use.
              </p>
            </div>

            <div style={card} className="card-hover">
              <h2 style={title}>4. Limitation of Liability</h2>
              <p style={text}>
                Shoppy shall not be liable for any direct, indirect, incidental,
                or consequential damages arising from the use of our website,
                products, or services.
              </p>
            </div>

            <div style={card} className="card-hover">
              <h2 style={title}>5. Consent</h2>
              <p style={text}>
                By using our website, you hereby consent to this disclaimer and
                agree to its terms and conditions.
              </p>
            </div>

            <div style={card} className="card-hover">
              <h2 style={title}>6. Updates</h2>
              <p style={text}>
                We may update, amend, or make changes to this disclaimer at any
                time. Any modifications will be posted on this page with
                immediate effect.
              </p>
            </div>

            {/* FOOTER */}
            <div
              style={{
                textAlign: "center",
                marginTop: "3rem",
                color: "rgba(255,180,100,.35)",
                fontSize: "13px",
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

export default Disclaimer;