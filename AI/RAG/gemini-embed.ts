import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({});
const response = await ai.models.embedContent({
    model: 'gemini-embedding-001',
    contents: 'สวัสดีครับ',
});
console.log(response.embeddings);
