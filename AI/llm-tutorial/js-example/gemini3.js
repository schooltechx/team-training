// ตัวอย่างการ Chat แบบมีประวัติการสนทนา
import { GoogleGenAI } from "@google/genai"
const model = "gemini-2.5-flash"
const ai = new GoogleGenAI({})
let history= [ //บังคับใส่ประวัติการสนทนา
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ]
const chat = ai.chats.create({model,history})
const response1 = await chat.sendMessage({
  message: "I have 2 dogs in my house.",
})
console.log("Chat response 1:", response1.text)
const response2 = await chat.sendMessage({
  message: "How many paws are in my house?",
})
console.log("Chat response 2:", response2.text)
chat.getHistory().forEach((el)=> console.log( JSON.stringify(el)))
