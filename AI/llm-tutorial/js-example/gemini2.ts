//ตัวอย่างคอนฟิกและอธิบายภาพ
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
const ai = new GoogleGenAI({})
const model = "gemini-flash-latest"
const base64ImageFile = fs.readFileSync("../img/dog.jpeg", {
  encoding: "base64",
});
const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "ภาพนี้คือตัวอะไร" },
];
//https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerateContentConfig.html
  const config = {
    temperature: 0.8,
    systemInstruction:"คุณคือครูที่คอยอธิบายสิ่งต่าง ๆ ให้เด็กเข้าใจง่าย ๆ",
  };

const res = await ai.models.generateContent({ model, contents, config })
console.log(res.text)
