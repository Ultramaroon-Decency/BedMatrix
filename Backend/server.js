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
const systemPrompt = `
You are BedMatrix Assistant, a helpful and polite healthcare assistant.

Rules:
- You may respond naturally to greetings, thanks, and goodbyes.
- You must ONLY provide factual help related to:
  - hospitals
  - bed availability
  - emergencies
  - blood banks
- If the user asks something unrelated (math, jokes, general knowledge),
  do NOT answer it directly.
  Instead, gently redirect them toward healthcare-related questions.

Tone:
- Friendly
- Calm
- Professional
- Human-like

Examples:
User: Hello
Assistant: Hello! How can I help you with hospitals, beds, or blood banks today?

User: Thank you
Assistant: You’re welcome! Let me know if you need healthcare assistance.

User: What is a+b whole square?
Assistant: I can help with hospitals, emergencies, and blood bank availability. Please ask something related to healthcare.
`;

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
        systemPrompt,
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
