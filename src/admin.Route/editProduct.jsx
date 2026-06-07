import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
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

  /* FETCH PRODUCT */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          category: data.category || "",
          stock: data.stock || "",
        });

        if (data.image) setPreview(data.image);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  /* IMAGE CHANGE */
  const handleImage = (file) => {
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);

    if (image) {
      data.append("image", image);
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        alert("Product updated successfully!");
        navigate("/admin/products");
      } else {
        alert(result.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "850px" }}>
      {/* HEADER */}
      <div className="hero-banner" style={{ padding: "30px 20px" }}>
        <h1 className="text-glow">Edit Product</h1>
        <p style={{ color: "rgba(255,200,140,0.7)" }}>
          Update product information
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
            value={formData.name}
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
            value={formData.price}
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
            value={formData.category}
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
            value={formData.stock}
            className="theme-input"
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            required
          />

          {/* DESCRIPTION */}
          <textarea
            rows="5"
            placeholder="Description"
            value={formData.description}
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

          {/* IMAGE */}
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
              Replace Image (Optional)
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImage(e.target.files[0])
              }
              style={{ color: "#fff" }}
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

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="theme-btn"
            style={{
              gridColumn: "1 / -1",
              padding: "12px",
            }}
          >
            {loading ? "Updating..." : "💾 Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;