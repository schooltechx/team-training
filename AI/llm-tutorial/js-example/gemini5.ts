// With Google Search
import { GoogleGenAI } from "@google/genai";
const model = "gemini-2.5-flash"
const contents="ใครคือนายกรัฐมนตรีของไทยในปัจจุบัน"
const ai = new GoogleGenAI({});
const groundingTool = {
  googleSearch: {},
};
const config = {
  tools: [groundingTool],
};
let res = await ai.models.generateContent({model,contents});
console.log("Ans1",res.text);
res = await ai.models.generateContent({model,contents,config});
console.log("Ans2",res.text);