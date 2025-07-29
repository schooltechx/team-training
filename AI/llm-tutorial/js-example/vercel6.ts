// https://ai-sdk.dev/cookbook/node/web-search-agent#exa
// https://ai-sdk.dev/cookbook/node/call-tools
import { google } from '@ai-sdk/google';
import { generateText, tool  } from 'ai';
import { z } from 'zod';
const model = google('gemini-2.5-flash')
const prompt = 'อุณหภูมิที่กรุงเทพตอนนี้เท่าไหร่?'
export const getTemperature = tool({
  description: 'Gets the current temperature for a given location.',
  parameters: z.object({
    location: z.string().describe('The city name, e.g. San Francisco'),
  }),
  execute: async ({ location:string }) => {
    return 35 // Simulated temperature, replace with actual API call
  },
});
const tools = {getTemperature}
const res = await generateText({model,prompt,tools,maxSteps: 2});
console.log('text:',res.text);
