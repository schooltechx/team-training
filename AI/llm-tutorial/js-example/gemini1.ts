//ตัวอย่างอย่างง่าย
import { GoogleGenAI } from "@google/genai"
const ai = new GoogleGenAI({})
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "AI ทำงานอย่างไรตอบอย่างสั้นหนึ่งบรรทัด",
})
console.log(response.text)
