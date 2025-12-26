import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ai-search", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }



 const q = query.toLowerCase();

  let category = "all";

  if (q.includes("laptop")) {
    category = "laptops";
  } else if (q.includes("phone") || q.includes("smartphone")) {
    category = "smartphones";
  }


  
 res.json({
    category,
    priceRange: { min: 0, max: 60000 }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
