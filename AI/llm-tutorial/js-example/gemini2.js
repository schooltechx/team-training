//ตัวอย่างคอนฟิกและอธิบายภาพ
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai"
const ai = new GoogleGenAI({})
const model = "gemini-2.5-flash"
const image = await ai.files.upload({
  file: "../img/dog.jpeg",
})

const contents = [
  createUserContent([
    "ภาพนี้คือตัวอะไร",
    createPartFromUri(image.uri, image.mimeType),
  ]),
]
const config = {
  systemInstruction: "You are teacher who explain things in simple way",
  thinkingConfig: {
    thinkingBudget: 0, // Disables thinking
    temperature: 0.8,
  },
}
const res = await ai.models.generateContent({ model, contents, config })
console.log(res.text)
