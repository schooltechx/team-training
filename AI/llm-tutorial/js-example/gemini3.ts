// ตัวอย่างการ Chat แบบมีประวัติการสนทนา
import { GoogleGenAI } from "@google/genai"
const model = "gemini-2.5-flash"
const ai = new GoogleGenAI({})
let history= [ //บังคับใส่ประวัติการสนทนาเริ่มต้น
    {
      role: "user",
      parts: [{ text: "สวัสดีครับพี่สาว" }],
    },
    {
      role: "model",
      parts: [{ text: "สวัสดีจ้า" }],
    },
  ]
const chat = ai.chats.create({model,history})
const response1 = await chat.sendMessage({
  message: "ผมชื่ออุ้มนะครับ",
})
console.log("Chat response 1:", response1.text)
const response2 = await chat.sendMessage({
  message: "ผมชื่ออะไรนะ",
})
console.log("Chat response 2:", response2.text)

// chat.getHistory().forEach((el)=> console.log( JSON.stringify(el)))
console.log('Chat history:',JSON.stringify(chat.getHistory(), null, 2))