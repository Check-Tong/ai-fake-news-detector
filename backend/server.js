import express from "express";
import cors from "cors";
import { pipeline } from "@xenova/transformers";

const app = express();
app.use(cors());
app.use(express.json());

console.log("⏳ Loading AI model...");

const classifier = await pipeline(
  "text-classification",
  "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
);

console.log("✅ AI model loaded");

app.get("/", (req, res) => {
  res.send("🚀 AI Fake News Detector API is running");
});

app.post("/predict", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const result = await classifier(text);
    const prediction = result[0];

    const label =
      prediction.label === "NEGATIVE" ? "FAKE" : "REAL";

    res.json({
      label,
      score: prediction.score
    });
  } catch (err) {
    res.status(500).json({ error: "Prediction failed" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
