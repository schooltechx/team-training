# LLM (Javascript)

มีตัวอย่างใช้ [Vercel AI SDK](https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai) และ
[Gemini API](https://ai.google.dev/gemini-api/docs/text-generation#javascript)

- ใช้ bun เพื่อรองรับ typescript และ top level await ได้
- API key ใส่ใน param ตอนเรียกใช้งาน หรือตัวแปรแวดล้อม Vercel ใช้ GOOGLE_GENERATIVE_AI_API_KEY, ใช้ GEMINI_API_KEY

## install

```sh
mkdir project_folder
cd project_folder
bun init
# versel
bun add ai @ai-sdk/google
# gemini
bun add @google/genai
```

## Text Generation

สคริปต์เรียกใช้ตัวอย่างดูใน [package.json](./package.json) เช่น npm run vercel1

- ตัวอย่างอย่างง่าย ([vercel1.ts](./vercel1.ts),[gemini1.ts](./gemini1.ts)) ตอบเป็นครั้งๆไป
- คอนฟิกและอธิบายภาพ ([vercel2.ts](./vercel2.ts),[gemini2.ts](./gemini2.ts))
- Chat ([vercel3.ts](./vercel3.ts),[gemini3.ts](./gemini3.ts)) จะมี history ทำให้คุยต่อเนื่องได้(จำข้อความก่อนหน้าได้)
- Structured output ([vercel4.ts](./vercel4.ts),[gemini4.ts](./gemini4.ts)) ได้คำตอบเป็น JSON เหมาะกับนำไปใช้กับโปรแกรมต่อ
- Web Search Agent ([vercel5.ts](./vercel5.ts), [gemini5.ts](./gemini5.ts)) ค้นหาข้อมูลในเวปมาใช้เป็นคำตอบจะได้ข้อมูลล่าสุด
- External tools ([vercel6.ts](./vercel6.ts),[gemini5.ts](./gemini6.ts)) เพื่อที่จะได้นำข้อมูลจากภายนอกมาใช้ร่วมกับ LLM ได้ เช่นถามว่าตอนนี้ที่กรุงเทพมีอุณหภูมิเท่าไหร่ เราต้องสร้าง tools(function) ที่มีคำอธิบายว่าใช้ทำอะไรมีพารามิเตอร์อะไร ในเบื้องหลังจะเรียก LLM และ tools หลายรอบ
  - ใช้ LLM วิเคราะห์ prompt นี้ควรเรียกใช้ tools ตัวไหนและมีพารามิเตอร์อะไร
  - เรียกใช้ tools ด้วย พารามิเตอร์ จะได้ผลลัพท์กลับมา
  - เอาผลลัพท์ที่ได้จาก tools ไป รวมกับ prompt เดิมเพื่อเรียกใช้ LLM ก็จะได้ผลลัพท์ที่ต้องการ
  - Gemini API(JavaScript) ต้องเรียกแต่ละขั้นตอนเอง แต่ Gemini API(Python) และ Vercel เรียกใช้ tools โดยอัตโนมัติ

## อ่านต่อ

- vercel: [Prompt](https://ai-sdk.dev/docs/foundations/prompts)
- Vercel: [Console Chat ด้วย node.js](https://ai-sdk.dev/docs/getting-started/nodejs)
- Vercel: [Web Search Agent](https://ai-sdk.dev/cookbook/node/web-search-agent)
- Gemini: [Multi-turn conversations (Chat)](https://ai.google.dev/gemini-api/docs/text-generation#multi-turn-conversations) เพิ่มเติม
- Gemini: [generateContent()](https://ai.google.dev/api/generate-content)
- Gemini: [Embeddings](https://ai.google.dev/gemini-api/docs/embeddings)
