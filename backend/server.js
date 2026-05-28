import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();



const app = express();

app.use(cors());
app.use(express.json());

/**
 * -----------------------------------------
 * AI PRODUCT DESCRIPTION GENERATOR
 * -----------------------------------------
 */
app.post("/api/generate-description", async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Product name required" });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "Groq API key missing" });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are a professional e-commerce copywriter. Write a short, engaging product description with 3 bullet points highlighting key features."
          },
          {
            role: "user",
            content: `Product: ${name}, Category: ${category}`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!data.choices) {
      console.log("Groq Error:", data);
      return res.status(500).json({ error: "AI generation failed" });
    }

    const description = data.choices[0].message.content;

    res.json({ description });

  } catch (error) {
    console.error("Groq AI Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





/**
 * -----------------------------------------
 * HEALTH CHECK ROUTE (Optional but Useful)
 * -----------------------------------------
 */
app.get("/", (req, res) => {
  res.json({ message: "AI Description Backend Running 🚀" });
});


/**
 * SERVER START
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

app.post("/api/admin-login", (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true });
  }

  return res.status(401).json({
    success: false,
    error: "Invalid password",
  });
});