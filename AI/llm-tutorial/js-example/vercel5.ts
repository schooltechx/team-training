// https://ai-sdk.dev/cookbook/node/web-search-agent
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
const model = google('gemini-2.5-flash', {useSearchGrounding: true})
const prompt = 'ใครคือนายกรัฐมนตรีของไทยในปัจจุบัน'
const res = await generateText({model,prompt});
console.log('text:',res.text);
//console.log('response:',res); // check res.providerMetadata?.google

