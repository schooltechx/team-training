# LLM (Javascript)
มีตัวอย่างใช้ [Vercel AI SDK](https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai) และ 
[Gemini API](https://ai.google.dev/gemini-api/docs/text-generation#javascript)
- ใช้ node 22.x เพื่อที่ใช้ top level await ได้
- API key ใส่ใน param ตอนเรียกใช้งานหรือตัวแปรแวดล้อม Vercel ใช้ GOOGLE_GENERATIVE_AI_API_KEY, ใช้ GEMINI_API_KEY

## install
```sh
mkdir project_folder
cd project_folder
npm init -y
# versel
npm install ai @ai-sdk/google
# gemini
npm install @google/genai
```
## Code Text Generation
สคริปต์เรียกใช้ตัวอย่างดูใน [package.json](./package.json) เช่น npm run vercel1
- ตัวอย่างอย่างง่าย - [vercel1.js](./vercel1.js)
- คอนฟิกและอธิบายภาพ - [vercel2.js](./vercel2.js)
- ตัวอย่างอย่างง่าย - [gemini1.js](./gemini1.js)
- คอนฟิกและอธิบายภาพ - [gemini2.js](./gemini2.js)
- Chat จะมี history ทำให้คุยต่อเนื่องได้ - [gemini3.js](./gemini3.js)

## อ่านต่อ
- vercel: [Prompt](https://ai-sdk.dev/docs/foundations/prompts)
- Vercel: [Console Chat ด้วย node.js](https://ai-sdk.dev/docs/getting-started/nodejs)
- Gemini: [Multi-turn conversations (Chat)](https://ai.google.dev/gemini-api/docs/text-generation#multi-turn-conversations) เพิ่มเติม
- Gemini: [generateContent()](https://ai.google.dev/api/generate-content)