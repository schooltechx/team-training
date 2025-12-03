import { google } from "@ai-sdk/google"
import { generateText,type ModelMessage } from "ai"
import {readFileSync} from "fs"
const model = google("gemini-flash-latest")
const providerOptions = {
  google: {
    thinkingConfig: {
      thinkingBudget: 0,
    },
  },
}
const base64ImageFile = readFileSync("../img/dog.jpeg", {
  encoding: "base64",
});

const messages:ModelMessage[] = [
  {
    role: 'user',
    content: [
      {type: 'text',text: 'ภาพนี้คืออะไรตอบสั้นๆไม่เกิน 10 คำ'},
      {type: 'image',image: `data:image/jpeg;base64,${base64ImageFile}`},
    ],
  },
]
const { text } = await generateText({model,providerOptions,messages})
console.log(text)
