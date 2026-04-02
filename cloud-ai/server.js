import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import OpenAI from "openai";
import { buildDeepMemory } from "./deepMemory.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI);
const Memory = mongoose.model("Memory", new mongoose.Schema({
    userId: String,
    input: String,
    response: String
}));

// OpenAI o3 client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
    const { userId, message } = req.body;

    const memoryDocs = await Memory.find({ userId });

    const deepMemory = buildDeepMemory(memoryDocs);

    const prompt = `
You are a powerful cloud AI running the OpenAI o3 model.
You use AGGRESSIVE DEEP LEARNING MODE.

Here is your memory:
${deepMemory}

User says: ${message}

Respond with:
- intelligence
- memory awareness
- personality building
- goal-oriented answers
- deep context understanding

Keep your response natural and helpful.
    `;

    const completion = await openai.chat.completions.create({
        model: "o3-mini",  // Or "o3-high"
        messages: [{ role: "user", content: prompt }]
    });

    const aiText = completion.choices[0].message.content;

    await Memory.create({
        userId,
        input: message,
        response: aiText
    });

    res.json({ reply: aiText });
});

// Start
app.listen(5000, () => console.log("Cloud AI running on port 5000"));