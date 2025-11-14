const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// VALID MODELS — final correct list
const MODELS = [
  "gemini-2.5-flash",   // newest, best
  "gemini-1.5-flash",   // fast & stable
  "gemini-1.5-pro"      // fallback
];

async function parseExpenseText(text) {
  let lastError = null;

  for (const modelName of MODELS) {
    try {
      console.log("Trying Gemini model:", modelName);

      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `
      Convert the text into JSON:
      {
        "type": "expense" | "income",
        "amount": number,
        "items": [],
        "category": "Food" | "Travel" | "Shopping" | "Bills" | "Other" | "Income"
      }
      Text: "${text}"
      `;

      const result = await model.generateContent(prompt);
      const raw = result.response.text();

      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      return {
        type: parsed.type || "expense",
        amount: parsed.amount || 0,
        items: parsed.items || [],
        category: parsed.category || "Other",
        timestamp: new Date(),
        rawText: text
      };
    } catch (err) {
      console.error(`❌ Failed with ${modelName}:`, err.message);
      lastError = err;
    }
  }

  throw new Error("Gemini parsing failed: " + lastError?.message);
}

module.exports = { parseExpenseText };
