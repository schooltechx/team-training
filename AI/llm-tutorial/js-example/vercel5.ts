// https://ai-sdk.dev/cookbook/node/web-search-agent
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text, sources, providerMetadata } = await generateText({
  model: google('gemini-flash-latest'),
  tools: {
    google_search: google.tools.googleSearch({}),
  },
  prompt:
    'ใครคือนายกรัฐมนตรีของไทยในปัจจุบัน.' +
    'แสดงเเฉพาะชื่อนามสกุลและวันรับตำแหน่ง',
});

console.log(text);
// console.log(sources);
// console.log(providerMetadata);
