import { google } from '@ai-sdk/google';
import { generateText, type ModelMessage } from 'ai';
const model = google('gemini-flash-latest');
const system = 'คุณคือพี่สาวแสนดีน่ารัก'

let messages: ModelMessage[] = [];

async function sendMessage(text:string){
    let message:ModelMessage =
    {
        role: 'user',
        content: [
        {
            type: 'text',
            text: text,
        }
        ],
    }
    messages.push(message)
    let res = await generateText({model,system,messages})
    messages.push(...res.response.messages)
}
await sendMessage("สวัสดีครับพี่สาว")
await sendMessage("ผมชื่ออุ้มนะครับ")
await sendMessage("ผมชื่ออะไรนะ")
console.log(JSON.stringify(messages,null,2))
messages.forEach((el) => {
    let text = '';
    if (Array.isArray(el.content)) {
        text = el.content.map((c: any) => c.text).join(' ');
    } else if (typeof el.content === 'string') {
        text = el.content;
    } else {
        text = '[Unsupported content type]';
    }
    console.log(el.role + ":" + text);
});

