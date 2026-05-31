import React, { useState } from "react";

const About = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("krishna@shoppy.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "10K+", label: "Products" },
    { value: "99%", label: "Satisfaction" },
    { value: "24/7", label: "Support" },
  ];

  const values = [
    { icon: "🔥", title: "Quality First", desc: "Every product is handpicked and quality-checked before it reaches you." },
    { icon: "⚡", title: "Fast Delivery", desc: "Top logistics partners ensure lightning-speed order delivery." },
    { icon: "🛡️", title: "Secure Payments", desc: "Bank-grade encryption protects every single transaction." },
    { icon: "💬", title: "24/7 Support", desc: "Our team is always here to help, day or night." },
  ];

  const team = [
    { name: "Aryan Sharma", role: "Founder & CEO", emoji: "👨‍💼" },
    { name: "Priya Mehta", role: "Head of Design", emoji: "👩‍🎨" },
    { name: "Rohan Verma", role: "Lead Developer", emoji: "👨‍💻" },
    { name: "Sneha Gupta", role: "Marketing Head", emoji: "👩‍💼" },
  ];

  const skills = ["React", "Node.js", "MongoDB", "Redux", "Tailwind", "Firebase", "REST API", "Git"];

  const socials = [
    { label: "GitHub",    href: "#", icon: "🐙", color: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.18)", text: "#fff" },
    { label: "LinkedIn",  href: "#", icon: "💼", color: "rgba(59,130,246,0.12)",  border: "#3b82f6",               text: "#3b82f6" },
    { label: "Instagram", href: "#", icon: "📸", color: "rgba(236,72,153,0.12)",  border: "#ec4899",               text: "#ec4899" },
    { label: "Twitter",   href: "#", icon: "✖️", color: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.15)",text: "#aaa" },
    { label: "YouTube",   href: "#", icon: "📺", color: "rgba(239,68,68,0.12)",   border: "#ef4444",               text: "#ef4444" },
    { label: "Portfolio", href: "#", icon: "🌐", color: "rgba(255,106,0,0.15)",   border: "rgba(255,140,40,0.4)",  text: "#ff9a3c" },
  ];

  const hl = { background: "linear-gradient(90deg,#ff6a00,#ffaa44)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };
  const wrap = { maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" };
  const badge = { display: "inline-block", padding: "4px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#ff9a3c", background: "rgba(255,106,0,0.1)", border: "1px solid rgba(255,140,40,0.25)", marginBottom: "1rem" };
  const btnPrimary = { display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 24px", background: "linear-gradient(135deg,#ff6a00,#ff9a3c)", color: "#fff", borderRadius: "10px", fontSize: "14px", fontWeight: 500, textDecoration: "none", boxShadow: "0 0 18px rgba(255,100,0,0.28)", cursor: "pointer", border: "none", fontFamily: "'Inter',sans-serif", transition: "all 0.22s" };

  const hoverCard = (e) => { e.currentTarget.style.borderColor = "rgba(255,150,50,0.4)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(255,100,10,0.2)"; e.currentTarget.style.transform = "translateY(-4px)"; };
  const unhoverCard = (e) => { e.currentTarget.style.borderColor = "rgba(255,140,40,0.14)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse  { 0%,100%{box-shadow:0 0 24px rgba(255,100,0,0.45),0 0 50px rgba(255,80,0,0.18)} 50%{box-shadow:0 0 36px rgba(255,100,0,0.65),0 0 70px rgba(255,80,0,0.3)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .orbit  { position:absolute;border-radius:50%;border:1px solid rgba(255,140,40,0.18);animation:spin linear infinite; }
        .o1 { width:180px;height:180px;animation-duration:10s; }
        .o2 { width:255px;height:255px;animation-duration:16s;animation-direction:reverse; }
        .vdot { position:absolute;border-radius:50%;background:#ff6a00; }
        .stat-card:hover { border-color:rgba(255,150,50,0.4)!important;box-shadow:0 0 22px rgba(255,100,10,0.2)!important;transform:translateY(-4px)!important; }
        .val-card:hover  { border-color:rgba(255,150,50,0.38)!important;box-shadow:0 0 20px rgba(255,100,10,0.15)!important;transform:translateY(-4px)!important; }
        .team-card:hover { border-color:rgba(255,150,50,0.38)!important;box-shadow:0 0 24px rgba(255,100,10,0.18)!important;transform:translateY(-5px)!important; }
        .social-btn:hover { transform:translateY(-3px)!important;filter:brightness(1.25)!important;box-shadow:0 6px 20px rgba(0,0,0,0.35)!important; }
        .skill-tag:hover  { background:rgba(255,110,10,0.25)!important;border-color:rgba(255,150,50,0.5)!important;color:#fff!important; }
        .btn-copy:hover   { background:rgba(255,110,10,0.2)!important;border-color:rgba(255,150,50,0.5)!important; }
        .btn-primary-hover:hover { box-shadow:0 0 30px rgba(255,100,0,0.5)!important;transform:translateY(-2px)!important; }
        .btn-outline-el:hover { border-color:rgba(255,150,50,0.5)!important;color:#fff!important;box-shadow:0 0 14px rgba(255,100,10,0.2)!important; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0f0f0f", backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -10%,rgba(255,90,0,0.10) 0%,transparent 60%)", fontFamily: "'Inter',sans-serif", color: "#fff" }}>

        {/* ── PROFILE HERO ── */}
        <section style={{ position: "relative", padding: "5rem 0 3.5rem", textAlign: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)", width: "700px", height: "420px", background: "radial-gradient(ellipse,rgba(255,90,0,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
          <div style={wrap}>

            {/* Avatar */}
            <div style={{ position: "relative", display: "inline-block", borderRadius: "50%", padding: "4px", background: "linear-gradient(135deg,#ff6a00,#ffaa44)", boxShadow: "0 0 24px rgba(255,100,0,0.45),0 0 50px rgba(255,80,0,0.18)", marginBottom: "1.5rem", animation: "pulse 3s ease-in-out infinite" }}>
              <div style={{ width: "150px", height: "150px", borderRadius: "50%", background: "linear-gradient(135deg,#1a0a00,#2a1400)", border: "3px solid #0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "64px", overflow: "hidden" }}>
                <img src="/dp.jpg" alt="Krishna Sharma" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} onError={(e) => { e.target.style.display = "none"; e.target.parentNode.innerHTML = "👤"; }} />
              </div>
            </div>

            {/* Online badge */}
            <div style={{ position: "absolute", marginLeft: "60px", marginTop: "-30px" }}>
              <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#22c55e", border: "2px solid #0f0f0f", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }} />
            </div>

            {/* Name */}
            <h1 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 700, letterSpacing: "-1.5px", marginBottom: "6px", color: "#fff", lineHeight: 1.1 }}>
              Krishna <span style={hl}>Sharma</span>
            </h1>
            <p style={{ fontSize: "14px", color: "#ff9a3c", fontWeight: 500, letterSpacing: "1px", marginBottom: "1rem" }}>@krishna_sharma · Full Stack Developer</p>

            {/* Bio */}
            <p style={{ fontSize: "14px", color: "rgba(255,200,140,0.6)", maxWidth: "480px", margin: "0 auto 1.5rem", lineHeight: 1.85 }}>
              Building <strong style={{ color: "#fff" }}>Shoppy</strong> — India's fastest growing e-commerce platform. Passionate about clean code, great UX, and scalable systems. 🚀
            </p>

            {/* Profile stats row */}
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "1.8rem" }}>
              {[["128", "Projects"], ["4.2K", "Followers"], ["310", "Following"]].map(([v, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "20px", fontWeight: 700, ...hl }}>{v}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,180,100,0.45)", letterSpacing: "1px", textTransform: "uppercase" }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Location + email row */}
            <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "13px", color: "rgba(255,200,140,0.5)", display: "flex", alignItems: "center", gap: "5px" }}>📍 India</span>
              <span style={{ fontSize: "13px", color: "rgba(255,200,140,0.5)", display: "flex", alignItems: "center", gap: "5px" }}>🎓 B.Tech CSE</span>
              <span style={{ fontSize: "13px", color: "rgba(255,200,140,0.5)", display: "flex", alignItems: "center", gap: "5px" }}>💼 Open to work</span>
            </div>

            {/* Copy email */}
            <button className="btn-copy" onClick={handleCopy}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "9px 20px", background: "rgba(255,100,10,0.08)", border: "1px solid rgba(255,140,40,0.25)", borderRadius: "10px", color: "rgba(255,180,100,0.7)", fontSize: "13px", cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: "all 0.22s", marginBottom: "2rem" }}>
              {copied ? "✅ Copied!" : "📧 krishna@shoppy.com — click to copy"}
            </button>

            {/* Social buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "1rem" }}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-btn"
                  style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "9px 18px", borderRadius: "10px", border: `1px solid ${s.border}`, background: s.color, color: s.text, fontSize: "13px", fontWeight: 500, textDecoration: "none", backdropFilter: "blur(8px)", transition: "all 0.2s" }}>
                  <span>{s.icon}</span>{s.label}
                </a>
              ))}
            </div>

            {/* Skills */}
            <div style={{ marginTop: "1.8rem" }}>
              <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,180,100,0.35)", marginBottom: "0.8rem" }}>Tech Stack</p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
                {skills.map((s) => (
                  <span key={s} className="skill-tag"
                    style={{ padding: "5px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 500, background: "rgba(255,100,10,0.08)", border: "1px solid rgba(255,140,40,0.2)", color: "rgba(255,180,100,0.7)", transition: "all 0.2s", cursor: "default" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg,#ff6a00,#ffaa44)", borderRadius: "2px", margin: "2.5rem auto 0" }} />
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ padding: "3.5rem 0", borderTop: "1px solid rgba(255,140,40,0.12)", borderBottom: "1px solid rgba(255,140,40,0.12)" }}>
          <div style={wrap}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.2rem" }}>
              {stats.map((s, i) => (
                <div key={i} className="stat-card"
                  style={{ textAlign: "center", padding: "1.8rem 1rem", borderRadius: "14px", background: "rgba(255,100,10,0.06)", border: "1px solid rgba(255,140,40,0.16)", backdropFilter: "blur(12px)", transition: "all 0.22s" }}>
                  <div style={{ fontSize: "34px", fontWeight: 700, ...hl, marginBottom: "0.4rem" }}>{s.value}</div>
                  <div style={{ fontSize: "12px", color: "rgba(255,200,140,0.5)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MISSION ── */}
        <section style={{ padding: "5.5rem 0" }}>
          <div style={wrap}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
              <div>
                <div style={badge}>Our Mission</div>
                <h2 style={{ fontSize: "clamp(22px,3.5vw,34px)", fontWeight: 700, marginBottom: "1rem", lineHeight: 1.2, color: "#fff" }}>
                  Built for people who <span style={hl}>love great products</span>
                </h2>
                <p style={{ fontSize: "13px", color: "rgba(255,200,140,0.55)", lineHeight: 1.85, marginBottom: "0.9rem" }}>
                  We believe shopping should feel effortless, trustworthy, and exciting. Every step is designed with you in mind.
                </p>
                <p style={{ fontSize: "13px", color: "rgba(255,200,140,0.55)", lineHeight: 1.85 }}>
                  Founded in 2024, Shoppy has grown from a small startup into a platform trusted by thousands across India.
                </p>
                <a href="/shop" className="btn-primary-hover" style={{ ...btnPrimary, marginTop: "1.5rem" }}>Explore Shop →</a>
              </div>
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", height: "260px" }}>
                <div style={{ width: "120px", height: "120px", background: "linear-gradient(135deg,#ff4500,#ffaa44)", clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "46px", position: "relative", zIndex: 2, animation: "float 4s ease-in-out infinite" }}>🛍️</div>
                <div className="orbit o1" />
                <div className="orbit o2" />
                <div className="vdot" style={{ width: 8, height: 8, top: 38, right: 55, opacity: 0.7 }} />
                <div className="vdot" style={{ width: 5, height: 5, bottom: 48, left: 50, opacity: 0.45 }} />
                <div className="vdot" style={{ width: 6, height: 6, top: 108, left: 22, opacity: 0.35 }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section style={{ padding: "4.5rem 0", background: "rgba(255,100,10,0.025)", borderTop: "1px solid rgba(255,140,40,0.1)", borderBottom: "1px solid rgba(255,140,40,0.1)" }}>
          <div style={wrap}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div style={badge}>Why Choose Us</div>
              <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#fff" }}>The Shoppy <span style={hl}>Difference</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.1rem" }}>
              {values.map((v, i) => (
                <div key={i} className="val-card"
                  style={{ padding: "1.75rem 1.25rem", borderRadius: "14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,140,40,0.14)", transition: "all 0.22s" }}>
                  <div style={{ fontSize: "28px", marginBottom: "0.8rem" }}>{v.icon}</div>
                  <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#fff", marginBottom: "0.5rem" }}>{v.title}</h3>
                  <p style={{ fontSize: "12px", color: "rgba(255,200,140,0.5)", lineHeight: 1.75 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section style={{ padding: "4.5rem 0" }}>
          <div style={wrap}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div style={badge}>The Team</div>
              <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#fff" }}>People behind <span style={hl}>Shoppy</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem" }}>
              {team.map((m, i) => (
                <div key={i} className="team-card"
                  style={{ textAlign: "center", padding: "2.2rem 1rem 1.75rem", borderRadius: "16px", background: "rgba(255,100,10,0.05)", border: "1px solid rgba(255,140,40,0.14)", backdropFilter: "blur(10px)", transition: "all 0.22s" }}>
                  <span style={{ fontSize: "42px", marginBottom: "0.8rem", display: "block" }}>{m.emoji}</span>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff", marginBottom: "3px" }}>{m.name}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,180,100,0.5)", letterSpacing: "0.5px" }}>{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ position: "relative", padding: "6rem 0", textAlign: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: "-60px", left: "50%", transform: "translateX(-50%)", width: "500px", height: "300px", background: "radial-gradient(ellipse,rgba(255,90,0,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
          <div style={wrap}>
            <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 700, marginBottom: "1rem", color: "#fff" }}>
              Ready to start <span style={hl}>shopping?</span>
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,200,140,0.55)", marginBottom: "2rem" }}>
              Join thousands of happy customers and discover something new today.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/shop" className="btn-primary-hover" style={btnPrimary}>Shop Now</a>
              <a href="/login" className="btn-outline-el"
                style={{ display: "inline-flex", alignItems: "center", padding: "10px 24px", border: "1px solid rgba(255,140,40,0.3)", color: "rgba(255,180,100,0.8)", borderRadius: "10px", fontSize: "14px", fontWeight: 500, textDecoration: "none", background: "rgba(255,100,10,0.06)", transition: "all 0.22s" }}>
                Create Account
              </a>
            </div>
            <p style={{ marginTop: "3rem", fontSize: "11px", letterSpacing: "2px", color: "rgba(255,180,100,0.22)", textTransform: "uppercase" }}>✦ Made with ❤️ by Krishna Sharma</p>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;