# LLM (Javascript)

มีตัวอย่างใช้ [Vercel AI SDK](https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai) และ
[Gemini API](https://ai.google.dev/gemini-api/docs/text-generation#javascript)

- ใช้ bun เพื่อรองรับ typescript, top level await และ .env 
- API key ใส่ใน param ตอนเรียกใช้งาน หรือตัวแปรแวดล้อม(หรือ .env) Vercel ใช้ GOOGLE_GENERATIVE_AI_API_KEY, ใช้ GEMINI_API_KEY
```js
// สามารถใส่ในโค้ดตรงๆแบบนี้ก็ได้
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
```

## install

```sh
mkdir project_folder
cd project_folder
# copy *.ts to this folder
bun init
# versel
bun add ai @ai-sdk/google
# gemini
bun add @google/genai
# MCP
bun add @modelcontextprotocol/sdk

```
## ข้อความ
[การประมวลผลข้อความ](https://ai.google.dev/gemini-api/docs/text-generation?hl=th)
เป็นที่ง่ายที่สุด ส่งข้อความไปยังโมเดลและตอบกลับทันที 

ตัวอย่าง: [vercel1.ts](./vercel1.ts), [gemini1.ts](./gemini1.ts)

โค้ดข้างล่างนี้จะส่งคำถามเกี่ยวกับวิธีการทำงานของ AI ไปยังโมเดล gemini-flash-latest และแสดงผลลัพธ์ที่ได้จากการตอบกลับของโมเดล 🤖.
```ts
import { GoogleGenAI } from "@google/genai"
const ai = new GoogleGenAI({})
const response = await ai.models.generateContent({
  model: "gemini-flash-latest",
  contents: "AI ทำงานอย่างไรตอบอย่างสั้นหนึ่งบรรทัด",
})
console.log(response.text)
```

##  การประมวลผลรูปภาพ (Image Processing) 

Gemini สามารถ[เข้าใจภาพได้](https://ai.google.dev/gemini-api/docs/image-understanding?hl=th) ตัวอย่างนี้จะให้มันช่วยอธิบายหรือตอบคำถามเกี่ยวกับรูปภาพนั้น ๆ ได้
- ตัวอย่าง: [vercel2.ts](./vercel2.ts), [gemini2.ts](./gemini2.ts)  
โค้ดด้านล่างนี้จะแปลง dog.jpeg เป็น base64 และส่งไปให้โมเดลพร้อมกับคำถาม "ภาพนี้คือตัวอะไร" นอกจากนี้ยังมีการกำหนด systemInstruction เพื่อให้โมเดลตอบกลับในลักษณะของครูที่อธิบายเรื่องง่าย ๆ 
สามารถปรับเพิ่มเติมใน [config](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerateContentConfig.html)
🖼️.
```ts
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
const config = {
  temperature: 0.8,
  systemInstruction:"คุณคือครูที่คอยอธิบายสิ่งต่าง ๆ ให้เด็กเข้าใจง่าย ๆ",
};
const res = await ai.models.generateContent({ model, contents, config })
console.log(res.text)
```
- ตัวอย่าง: [gemini2.1.ts](./gemini2.1.ts) อ่านภาพบัตรประชาชนแล้วดึงข้อมูลเป็น Markdown
ตัวอย่าง([id_2.jpg](../img/id_2.jpg)) เป็นภาพบัตรจากอินเตอร์เน็ตไม่ใช้ข้อมูลจริง ข้อมูลอาจจะไม่ครบถ้วนตรงกับบัตรประชาชนจริงๆ  

## การสนทนาแบบมีประวัติ (Chat with History)
โมเดล LLM จะไม่มีความจำเราจำเป็นต้องป้อน ประวัติการสนทนาเพื่อให้โมเดลสามารถเข้าใจบริบท และตอบสนองได้อย่างต่อเนื่อง
- ตัวอย่าง: [vercel3.ts](./vercel3.ts), [gemini3.ts](./gemini3.ts)
ตัวอย่างด้านล่างนี้สาธิตการสร้างแชทที่มีประวัติการสนทนาเริ่มต้น จากนั้นจึงส่งข้อความต่อเนื่องไปอีกสองครั้ง โมเดลจะจดจำชื่อ "อุ้ม" จากข้อความแรกและตอบกลับได้อย่างถูกต้องในข้อความที่สอง 🧠.

```ts
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
console.log('Chat history:',JSON.stringify(chat.getHistory(), null, 2))
```

##  การจัดการข้อมูลแบบมีโครงสร้าง (Structured Output)
[Structure Output](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output#googlegenaisdk_ctrlgen_with_resp_schema-nodejs_genai_sdk)
แสดงผลลัพธ์ในรูปแบบ JSON เราสามารถเอาไปใช้ในแอปพลิเคชันต่าง ๆ ได้ง่าย
- ตัวอย่าง:  [vercel4.ts](./vercel4.ts), [gemini4.ts](./gemini4.ts) โค้ดด้านล่างนี้จะขอให้สร้างสูตรขนม 3 สูตร โดยกำหนดให้ผลลัพธ์ที่ได้อยู่ในรูปแบบ JSON ที่มี schema ตามที่ระบุไว้ เพื่อให้ได้ข้อมูลที่มีโครงสร้างชัดเจน เช่น recipeName และ ingredients 🍰.
```ts
import { GoogleGenAI, Type } from "@google/genai"
const model = "gemini-2.5-flash"
const contents ="ระบุสูตรขนมยอดนิยม 3 สูตร พร้อมกับส่วนผสมและปริมาณ"
const config ={
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            recipeName: {
              type: Type.STRING,
            },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["recipeName", "ingredients"],
        },
      },
    }
const ai = new GoogleGenAI({})
const response = await ai.models.generateContent({model,contents,config})
console.log(JSON.parse(response.text||'') )
```
- ตัวอย่าง: [gemini4.1.ts](./gemini4.1.ts) ดึงข้อมูลออกจากบัตรประชาชนตัวอย่าง([id_2.jpg](../img/id_2.jpg)) เนื่องภาพบัตรจากอินเตอร์เน็ตไม่ใช้ข้อมูลจริง ข้อมูลอาจจะไม่ครบถ้วนตรงกับบัตรประชาชนจริงๆ  
ผลที่ได้ออกเป็น JSON ตาม schema ([gemini4.1.json](./gemini4.1.json)) ใน schema จะมีส่วนของ description เพื่อช่วยอธิบายให้ LLM เข้าใจข้อมูลได้ดียิ่งขึ้น และเปลี่ยนรูปแบบของวันที่ภาษาอังกฤษให้เหมาะกับการบันทึกลงในฐานข้อมูล

## การใช้เครื่องมือภายนอก (External Tools)

Gemini รองรับ [เครื่องมือภายนอก](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview)
หลายตัว 

- ตัวอย่างนี้จะใช้ [Google Search](https://ai.google.dev/gemini-api/docs/google-search?hl=th)
เพื่อค้นหาข้อมูลล่าสุดจากอินเทอร์เน็ตได้โดยตรง [vercel5.ts](./vercel5.ts),[gemini5.ts](./gemini5.ts) โค้ดนี้จะแสดงความแตกต่างของการตอบคำถาม "ใครคือนายกรัฐมนตรีของไทยในปัจจุบัน" โดยครั้งแรกจะตอบตามข้อมูลที่โมเดลมีอยู่เดิม ส่วนครั้งที่สองจะใช้ Google Search เพื่อดึงข้อมูลล่าสุดมาตอบ 🔍.
```ts
// With Google Search
import { GoogleGenAI } from "@google/genai";
const model = "gemini-flash-latest"
const contents="ใครคือนายกรัฐมนตรีของไทยในปัจจุบัน"
const ai = new GoogleGenAI({});
const groundingTool = {
  googleSearch: {},
};
const config = {
  tools: [groundingTool],
};
let res = await ai.models.generateContent({model,contents});
console.log("- Ans1",res.text);
res = await ai.models.generateContent({model,contents,config});
console.log("- Ans2(search)",res.text);
```

## Function Calling (การเรียกฟังก์ชัน)

สามารถกำหนดให้โมเดลเรียกฟังก์ชันที่คุณสร้างขึ้นเองเพื่อทำงานบางอย่างได้ เช่น การตรวจสอบสภาพอากาศ
- ตัวอย่าง: [vercel6.ts](./vercel6.ts)
- ตัวอย่าง: [gemini5.ts](./gemini6.ts)

อธิบาย: โค้ดนี้จะประกาศฟังก์ชัน get_current_temperature ที่สามารถรับค่า location ได้ เมื่อโมเดลได้รับคำถามเกี่ยวกับอุณหภูมิที่กรุงเทพฯ ก็จะเรียกใช้ฟังก์ชันนี้เพื่อดึงข้อมูลอุณหภูมิ (ในที่นี้คือค่า dummy 28) และนำมาสร้างคำตอบสุดท้าย 🌡️.
```ts
//external tools
// Example call LLM twice if you really need external tools
import { GoogleGenAI, Type,ContentListUnion,GenerateContentConfig } from '@google/genai';
const model = "gemini-2.5-flash"
let contents:ContentListUnion =[{
  role: 'user',
  parts:[{text:"อุณหภูมิที่กรุงเทพตอนนี้เท่าไหร่?"}]
}]
// Define the function declaration for the model
const weatherFunctionDeclaration = {
  name: 'get_current_temperature',
  description: 'Gets the current temperature for a given location.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      location: {
        type: Type.STRING,
        description: 'The city name, e.g. San Francisco',
      },
    },
    required: ['location'],
  },
};
const config:GenerateContentConfig = {
  tools: [{functionDeclarations: [weatherFunctionDeclaration]}]}
const getCurrentTemperature = (location:string)=>28
const ai = new GoogleGenAI({});
// Send request with function declarations
const response = await ai.models.generateContent({model,contents,config });

// Check for function calls in the response
if (response.functionCalls && response.candidates && 
  response.candidates.length > 0 &&
  response.candidates[0].content &&
  response.functionCalls.length > 0) {
  const functionCall = response.functionCalls[0]; // Assuming one function call
  const t =  getCurrentTemperature(functionCall.args?.location as string);
  const function_response_part = {
    name: functionCall.name,
    response: {t}
  }
  contents.push(response.candidates[0].content);
  contents.push({ role: 'user', parts: [{ functionResponse: function_response_part }] });  
  const final_response = await ai.models.generateContent({model,contents,config })
  console.log("Final Response",final_response.text);
} else {
  console.log("Response:",response.text) //without function call
}
```
## Model Context Protocol (MCP)
สามารถใช้ MCP เพื่อเชื่อมต่อกับเครื่องมือภายนอกที่ซับซ้อนมากขึ้น เช่น การดึงข้อมูลสภาพอากาศแบบเรียลไทม์

  - MCP รองรับการเรียกใช้ toolโดยอัตโนมัติบน Gemini และ Vercel(experimental) 
    - SSE (Server-Sent Events) เรียกใช้งานผ่าน HTTP ใช้งานข้ามเครื่องได้
    - stdio ใช้งานผ่าน standard input/output ในเครื่องเดียวกัน
    - Custom transport: ผ่าน SDK ของ MCP 

- ตัวอย่าง: [gemini7.ts](./gemini7.ts)

อธิบาย: โค้ดนี้จะใช้ Model Context Protocol (MCP) เพื่อเชื่อมต่อกับ weather-mcp server ซึ่งเป็นเครื่องมือภายนอกที่ใช้สำหรับดึงข้อมูลสภาพอากาศ ทำให้โมเดลสามารถตอบคำถามเกี่ยวกับสภาพอากาศในกรุงเทพฯ ได้อย่างแม่นยำ ☁️.
```ts
import { GoogleGenAI, FunctionCallingConfigMode , mcpToTool} from '@google/genai';
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
// Create server parameters for stdio connection
const serverParams = new StdioClientTransport({
  command: "npx", // Executable
  args: ["-y", "@philschmid/weather-mcp"] // MCP Server
});

const client = new Client({name: "example-client",version: "1.0.0"}
);
const ai = new GoogleGenAI({});
await client.connect(serverParams);
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: `What is the weather in Bangkok in  2025-10-01 10:00`,
  config: {
    tools: [mcpToTool(client)],  // uses the session, will automatically call the tool
    // Uncomment if you **don't** want the sdk to automatically call the tool
    // automaticFunctionCalling: {
    //   disable: true,
    // },
  },
});
console.log(response.text)
await client.close();
```
## อ่านต่อ

- vercel: [Prompt](https://ai-sdk.dev/docs/foundations/prompts)
- Vercel: [Console Chat ด้วย node.js](https://ai-sdk.dev/docs/getting-started/nodejs)
- Vercel: [Web Search Agent](https://ai-sdk.dev/cookbook/node/web-search-agent)
- Gemini: [Multi-turn conversations (Chat)](https://ai.google.dev/gemini-api/docs/text-generation#multi-turn-conversations) เพิ่มเติม
- Gemini: [generateContent()](https://ai.google.dev/api/generate-content)
- Gemini: [Function Call](https://ai.google.dev/gemini-api/docs/function-calling)
- Gemini: [Embeddings](https://ai.google.dev/gemini-api/docs/embeddings)
