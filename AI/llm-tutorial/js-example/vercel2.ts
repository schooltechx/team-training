import { google } from "@ai-sdk/google"
import { generateText,CoreMessage } from "ai"
import {readFileSync} from "fs"
const model = google("gemini-2.5-flash")
const providerOptions = {
  google: {
    thinkingConfig: {
      thinkingBudget: 0,
    },
  },
}
const messages:CoreMessage[] = [
  {
    role: 'user',
    content: [
      {
        type: 'text',
        text: 'ภาพนี้คืออะไรตอบสั้นๆไม่เกิน 10 คำ',
      },
      {
        type: 'file',
        data: readFileSync('../img/dog.jpeg'),
        mimeType: 'image/jpeg',
      },
    ],
  },
]
const { text } = await generateText({model,providerOptions,messages})
console.log(text)
