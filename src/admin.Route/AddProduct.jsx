import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* AUTH GUARD */
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") return null;

  /* IMAGE PREVIEW */
  const handleImageChange = (file) => {
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select a product image");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("image", image);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        alert("Product created successfully!");
        navigate("/admin/products");
      } else {
        alert(result.message || "Failed to create product");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "900px" }}>
      {/* HEADER */}
      <div className="hero-banner" style={{ padding: "30px 20px" }}>
        <h1 className="text-glow" style={{ fontSize: "2rem" }}>
          Add Product
        </h1>
        <p style={{ color: "rgba(255,200,140,0.7)" }}>
          Create a new product for your store
        </p>
      </div>

      {/* FORM CARD */}
      <div className="glass" style={{ padding: "20px" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
          }}
        >
          {/* NAME */}
          <input
            type="text"
            placeholder="Product Name"
            className="theme-input"
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />

          {/* PRICE */}
          <input
            type="number"
            placeholder="Price"
            className="theme-input"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />

          {/* CATEGORY */}
          <input
            type="text"
            placeholder="Category"
            className="theme-input"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          />

          {/* STOCK */}
          <input
            type="number"
            placeholder="Stock"
            className="theme-input"
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            required
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Product Description"
            rows="4"
            className="theme-textarea"
            style={{ gridColumn: "1 / -1" }}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            required
          />

          {/* IMAGE UPLOAD */}
          <div
            style={{
              gridColumn: "1 / -1",
              padding: "16px",
              border: "1px dashed rgba(255,120,20,0.4)",
              borderRadius: "12px",
              background: "rgba(255,120,20,0.03)",
            }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                color: "rgba(255,200,140,0.8)",
              }}
            >
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageChange(e.target.files[0])
              }
              style={{ color: "#fff" }}
              required
            />

            {/* PREVIEW */}
            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{
                  marginTop: "12px",
                  width: "100%",
                  maxHeight: "220px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,120,20,0.2)",
                }}
              />
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="theme-btn"
            style={{
              gridColumn: "1 / -1",
              padding: "12px",
            }}
          >
            {loading ? "Uploading..." : "🚀 Publish Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;