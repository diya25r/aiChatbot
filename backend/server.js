import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: messages
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: "Error" });
  }
});

app.listen(3000, () => console.log("Server running"));