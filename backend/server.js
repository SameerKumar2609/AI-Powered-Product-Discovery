import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/**
 * HELPER — validate + sanitize AI output
 */
const normalizeResult = (aiData) => {
  let category = aiData?.category || "all";
  let min = aiData?.priceRange?.min ?? 0;
  let max = aiData?.priceRange?.max ?? 1000000;
  let features = Array.isArray(aiData?.features) ? aiData.features : [];

  // Normalize text
  category = String(category).toLowerCase().trim();

  // Safety checks
  if (!["smartphone", "laptop", "watch", "headphone", "earbuds", "powerbank", "tablet", "camera"].includes(category)) {
    category = "all";   // unknown category → return all products
  }

  return {
    category,
    priceRange: { min, max },
    features
  };
};


/**
 * ------------------------------------
 * AI SEARCH ENDPOINT
 * ------------------------------------
 */
app.post("/api/ai-search", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({
        error: "Query is required"
      });
    }

    console.log("Received AI Query:", query);

    // -----------------------------
    // If NO AI KEY → safe dummy logic
    // -----------------------------
    if (!process.env.OPENAI_API_KEY) {
      console.log("⚠️ No AI Key. Using fallback mode.");

      // Basic smart guess
      const q = query.toLowerCase();

      if (q.includes("phone") || q.includes("mobile")) {
        return res.json({
          category: "smartphone",
          priceRange: { min: 0, max: 50000 },
          features: []
        });
      }

      if (q.includes("laptop")) {
        return res.json({
          category: "laptop",
          priceRange: { min: 0, max: 100000 },
          features: []
        });
      }

      if (q.includes("watch")) {
        return res.json({
          category: "watch",
          priceRange: { min: 0, max: 20000 },
          features: []
        });
      }

      if (q.includes("powerbank") || q.includes("power bank")) {
        return res.json({
          category: "powerbank",
          priceRange: { min: 0, max: 10000 },
          features: []
        });
      }

      // nonsense queries
      return res.json({
        category: "all",
        priceRange: { min: 0, max: 1000000 },
        features: []
      });
    }


    // -----------------------------
    // REAL AI MODE
    // -----------------------------
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an AI shopping assistant. ALWAYS return STRICT JSON only. " +
              "No explanation. Categories allowed: smartphone, laptop, watch, headphone, earbuds, tablet, camera, powerbank, all. " +
              "Return: { category: string, priceRange:{min:number,max:number}, features:string[] }"
          },
          {
            role: "user",
            content: query
          }
        ],
        temperature: 0.2
      })
    });

    const data = await response.json();

    // Extract text JSON from AI
    let raw = data?.choices?.[0]?.message?.content;

    console.log("AI Raw Output:", raw);

    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { category: "all" };
    }

    const finalResponse = normalizeResult(parsed);

    console.log("Final AI Parsed Response:", finalResponse);

    return res.json(finalResponse);

  } catch (err) {
    console.error("AI Search Error:", err);
    return res.status(500).json({
      error: "AI failed. Please try again",
      fallback: true
    });
  }
});


/**
 * SERVER START
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
