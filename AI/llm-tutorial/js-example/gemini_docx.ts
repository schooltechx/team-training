//ตัวอย่างคอนฟิกและอธิบายภาพ
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai"
const ai = new GoogleGenAI({})
const model = "gemini-2.5-flash"
const response = await ai.files.upload({
  file: "./test.docx",
})
/*
const contents = [
  createUserContent([
    "Analyse this document in JSON",
    createPartFromUri(doc.uri||'', doc.mimeType|| 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
  ]),
]
*/
const contents = [
  { fileData: { 
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
    name: response.name } 
  },"Analyse this document in JSON"
]

const config = {
  thinkingConfig: {
    thinkingBudget: 0, // Disables thinking
    temperature: 0.8,
  },
}
const res = await ai.models.generateContent({ model, contents, config })
console.log(res.text)
