import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ✅ Health check (optional but useful)
app.get("/", (req, res) => {
  res.send("🧠 BedMatrix backend is running");
});

// 🤖 Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No message provided." });
    }

    const completion = await groq.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [
    {
      role: "system",
      content:
        "You are BedMatrix Assistant, a helpful healthcare assistant. Answer clearly and simply. If asked about hospitals or blood banks, give general guidance, not fake data.",
    },
    {
      role: "user",
      content: message,
    },
  ],
  temperature: 0.6,
});

      

    const reply = completion.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error("GROQ ERROR:", error.message);
    res.status(500).json({
      reply: "AI service error. Please try again.",
    });
  }
});

// 🚀 Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🧠 BedMatrix backend running at http://localhost:${PORT}`);
});
