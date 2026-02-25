import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { generateDescription } from "../services/aiDescriptionService";

const Admin = () => {
  const { products, addProduct, deleteProduct } = useProducts();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("smartphone");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  /* ---------- AI GENERATE DESCRIPTION ---------- */
  const handleGenerateDescription = async () => {
    if (!name.trim()) {
      return alert("Enter product name first");
    }

    try {
      setLoadingAI(true);

      const result = await generateDescription(name, category);

      setDescription(result.description);
    } catch (error) {
      alert("AI generation failed. Check backend.");
    } finally {
      setLoadingAI(false);
    }
  };

  /* ---------- ADD PRODUCT ---------- */
  const handleAdd = () => {
    if (!name || !price || !image) {
      return alert("Fill all required fields");
    }

    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
      category,
      rating: 4,
      image,
      description
    };

    addProduct(newProduct);

    // Reset fields
    setName("");
    setPrice("");
    setImage("");
    setDescription("");
  };

  return (
    <div style={styles.container}>
      <h2>Admin Panel</h2>

      <h3>Add Product</h3>

      <input
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <select
        style={styles.input}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="smartphone">Smartphone</option>
        <option value="laptop">Laptop</option>
        <option value="watch">Watch</option>
        <option value="headphone">Headphone</option>
      </select>

      {/* DESCRIPTION FIELD */}
      <textarea
        style={styles.textarea}
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* AI BUTTON */}
      <button
        style={styles.aiButton}
        onClick={handleGenerateDescription}
        disabled={loadingAI}
      >
        {loadingAI ? "Generating..." : "Generate AI Description"}
      </button>

      <button style={styles.addButton} onClick={handleAdd}>
        Add Product
      </button>

      <h3 style={{ marginTop: "40px" }}>Manage Products</h3>

      {products.map((p) => (
        <div key={p.id} style={styles.productRow}>
          <div>
            <strong>{p.name}</strong> - ₹{p.price}
          </div>
          <button
            style={styles.deleteButton}
            onClick={() => deleteProduct(p.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

/* ---------- STYLES ---------- */
const styles = {
  container: {
    padding: "40px",
    maxWidth: "600px",
    margin: "auto"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px"
  },

  textarea: {
    width: "100%",
    height: "120px",
    padding: "10px",
    marginBottom: "10px"
  },

  aiButton: {
    padding: "10px",
    width: "100%",
    marginBottom: "10px",
    background: "#4c6ef5",
    color: "white",
    border: "none",
    cursor: "pointer"
  },

  addButton: {
    padding: "10px",
    width: "100%",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer"
  },

  productRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    padding: "8px",
    borderBottom: "1px solid #ddd"
  },

  deleteButton: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer"
  }
};

export default Admin;
