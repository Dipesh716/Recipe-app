import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

const PORT = process.env.PORT || 3000;
dotenv.config({ quiet: true });
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/get-recipe", async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: "Ingredients must be an array" });
  }

  try {
    const prompt = `You are a recipe assistant. I have: ${ingredients.join(
      ", "
    )}.
Please write a recipe with a title, ingredients list, and step-by-step instructions in markdown.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
      temperature: 0.7,
    });

    const recipe = response.choices[0].message.content;
    res.json({ recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () =>
  console.log("🚀 Server running on http://localhost:${PORT}")
);
