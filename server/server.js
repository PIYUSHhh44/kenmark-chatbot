require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.DATABASE_URL;
const mongo = new MongoClient(uri);

let db = null;

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({ reply: "Please enter a message" });
    }

    const entries = await db.collection("knowledge").find().toArray();
    console.log("Entries loaded:", entries.length);

    const lower = message.toLowerCase().trim();
    const userWords = lower
        .replace(/[^\w\s]/g, "") // remove punctuation
        .split(" ")
        .filter(Boolean);

    let match = null;


    for (const row of entries) {
        if (!row.Question) continue;

        const questionWords = row.Question.toLowerCase()
            .replace(/[^\w\s]/g, "") 
            .split(" ")
            .filter(Boolean);

  // check keyword overlap
        const overlap = userWords.some(word => questionWords.includes(word));

        if (overlap) {
            match = row;
            break;
        }
    }

    const baseAnswer = match?.Answer || null;
    console.log("Matched KB answer:", baseAnswer);

    if (!baseAnswer) {
      return res.json({ reply: "Sorry, I don't have that information yet." });
    }

    // ***** AI SECTION *****
    const Groq = require("groq-sdk");
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const aiResponse = await client.chat.completions.create({
      model: "groq/compound-mini",
      messages: [
        { role: "system", content: "You are an assistant for Kenmark ITan Solutions. Answer only from provided context." },
        { role: "assistant", content: baseAnswer },
        { role: "user", content: message }
      ],
      temperature: 0.2,
      max_tokens: 150,
    });

    return res.json({ reply: aiResponse.choices[0].message.content });

  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({ reply: "Internal server error" });
  }
});


async function connectDB() {
  try {
    await mongo.connect();
    db = mongo.db();
    console.log("Mongo connected");

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Startup error:", err);
  }
}

connectDB();
