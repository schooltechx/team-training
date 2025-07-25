import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
const model = google('gemini-2.5-flash');
const prompt = 'pi คืออะไร' //optional
const system = 'คุณคือพี่ชายสอนคณิตศาสตร์ให้น้องสาวของคุณ ตอบคำถามสั้นๆเข้าใจง่ายๆ'
const response = await generateText({model,prompt,system});
console.log(response.text)