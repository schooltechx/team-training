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
## การเรียกใช้งานแบบง่าย (Simple Call)
การเรียกใช้งาน Gemini API ที่ง่ายที่สุดคือการส่งข้อความไปยังโมเดลและรับการตอบกลับทันที โดยไม่จำเป็นต้องมีการตั้งค่าพิเศษใด ๆ 

- ตัวอย่าง: [vercel1.ts](./vercel1.ts)
- ตัวอย่าง: [gemini1.ts](./gemini1.ts)

อธิบาย: โค้ดนี้จะส่งคำถามเกี่ยวกับวิธีการทำงานของ AI ไปยังโมเดล gemini-2.5-flash และแสดงผลลัพธ์ที่ได้จากการตอบกลับของโมเดล 🤖.
```ts
import { GoogleGenAI } from "@google/genai"
const ai = new GoogleGenAI({})
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "AI ทำงานอย่างไรตอบอย่างสั้นหนึ่งบรรทัด",
})
console.log(response.text)
```

##  การประมวลผลรูปภาพ (Image Processing) 

คุณสามารถส่งรูปภาพพร้อมกับข้อความเพื่อขอให้ Gemini ช่วยอธิบายหรือตอบคำถามเกี่ยวกับรูปภาพนั้น ๆ ได้
- ตัวอย่าง: [vercel2.ts](./vercel2.ts)
- ตัวอย่าง: [gemini2.ts](./gemini2.ts) 

อธิบาย: โค้ดนี้จะอัปโหลดรูปภาพ dog.jpeg และส่งไปให้โมเดลพร้อมกับคำถาม "ภาพนี้คือตัวอะไร" นอกจากนี้ยังมีการกำหนด systemInstruction เพื่อให้โมเดลตอบกลับในลักษณะของครูที่อธิบายเรื่องง่าย ๆ 🖼️.
```ts
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
    createPartFromUri(image.uri||'', image.mimeType|| 'image/jpeg'),
  ]),
]
const config = {
  systemInstruction: "You are teacher who explain things in simple way",
  thinkingConfig: {
    thinkingBudget: 0, 
    temperature: 0.8,
  },
}
const res = await ai.models.generateContent({ model, contents, config })
console.log(res.text)
```


## การสนทนาแบบมีประวัติ (Chat with History)
Gemini API สามารถรักษาประวัติการสนทนาเพื่อให้โมเดลสามารถเข้าใจบริบทและตอบสนองได้อย่างต่อเนื่อง

[vercel3.ts](./vercel3.ts)

ตัวอย่าง: [gemini3.ts](./gemini3.ts)

อธิบาย: ตัวอย่างนี้สาธิตการสร้างแชทที่มีประวัติการสนทนาเริ่มต้น จากนั้นจึงส่งข้อความต่อเนื่องไปอีกสองครั้ง โมเดลจะจดจำชื่อ "อุ้ม" จากข้อความแรกและตอบกลับได้อย่างถูกต้องในข้อความที่สอง 🧠.

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
Gemini API สามารถสร้างผลลัพธ์ในรูปแบบ JSON ที่มีโครงสร้างตามที่เรากำหนดไว้ได้ ทำให้ง่ายต่อการนำข้อมูลไปใช้ในแอปพลิเคชันต่าง ๆ
- ตัวอย่าง:  [vercel4.ts](./vercel4.ts)
- ตัวอย่าง: [gemini4.ts](./gemini4.ts)
อธิบาย: โค้ดนี้จะขอให้โมเดลสร้างสูตรขนม 3 สูตร โดยกำหนดให้ผลลัพธ์ที่ได้อยู่ในรูปแบบ JSON ที่มี schema ตามที่ระบุไว้ เพื่อให้ได้ข้อมูลที่มีโครงสร้างชัดเจน เช่น recipeName และ ingredients 🍰.
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
## การใช้เครื่องมือภายนอก (External Tools)

Gemini API สามารถทำงานร่วมกับเครื่องมือภายนอกเพื่อดึงข้อมูลที่ทันสมัยหรือเฉพาะเจาะจงได้

5.1 Google Search
สามารถใช้เครื่องมือ Google Search เพื่อค้นหาข้อมูลล่าสุดจากอินเทอร์เน็ตได้โดยตรง

- ตัวอย่าง: [vercel5.ts](./vercel5.ts)
- ตัวอย่าง: [gemini5.ts](./gemini5.ts)

อธิบาย: โค้ดนี้จะแสดงความแตกต่างของการตอบคำถาม "ใครคือนายกรัฐมนตรีของไทยในปัจจุบัน" โดยครั้งแรกจะตอบตามข้อมูลที่โมเดลมีอยู่เดิม ส่วนครั้งที่สองจะใช้ Google Search เพื่อดึงข้อมูลล่าสุดมาตอบ 🔍.
```ts
import { GoogleGenAI } from "@google/genai";
const model = "gemini-2.5-flash"
const contents="ใครคือนายกรัฐมนตรีของไทยในปัจจุบัน"
const ai = new GoogleGenAI({});
const groundingTool = {
  googleSearch: {},
};
const config = {
  tools: [groundingTool],
};
let res = await ai.models.generateContent({model,contents});
console.log("Ans1",res.text);
res = await ai.models.generateContent({model,contents,config});
console.log("Ans2",res.text);
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

- ตัวอย่าง: gemini7.ts

อธิบาย: โค้ดนี้จะใช้ Model Context Protocol (MCP) เพื่อเชื่อมต่อกับ weather-mcp server ซึ่งเป็นเครื่องมือภายนอกที่ใช้สำหรับดึงข้อมูลสภาพอากาศ ทำให้โมเดลสามารถตอบคำถามเกี่ยวกับสภาพอากาศในกรุงเทพฯ ได้อย่างแม่นยำ ☁️.
```ts
import { GoogleGenAI, FunctionCallingConfigMode , mcpToTool} from '@google/genai';
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
const model="gemini-2.5-flash"
const contents = `สภาพอากาศในกรุงเทพเมื่อ ${new Date().toLocaleDateString()}?`
const client = new Client({name: "example-client",version: "1.0.0"});
const config = {tools: [mcpToTool(client)], 
  // automaticFunctionCalling: {// Uncomment for manual call the tool
  //   disable: true,
  // },
}
// Create server parameters for stdio connection
const serverParams = new StdioClientTransport({
  command: "npx", // Executable
  args: ["-y", "@philschmid/weather-mcp"] // MCP Server
});
// Configure the client
const ai = new GoogleGenAI({});
// Initialize the connection between client and server
await client.connect(serverParams);
// Send request to the model with MCP tools
const res = await ai.models.generateContent({model,contents,config});
console.log(res.text)
// Close the connection
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
