// https://ai-sdk.dev/cookbook/node/web-search-agent#exa
// https://ai-sdk.dev/cookbook/node/call-tools
import { google } from "@ai-sdk/google"
import { generateText, tool } from 'ai';
import { z } from 'zod';
const model = google("gemini-flash-latest")
const result = await generateText({
  model,
  tools: {
    weather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      }),
    }),
    cityAttractions: tool({
      inputSchema: z.object({ city: z.string() }),
    }),
  },
  prompt: 'สภาพอากาศในกรุงเทพเป็นอย่างไร แล้วผมควรไปเที่ยววัดไหนบ้าง?',
});
  // typed tool calls:
  for (const toolCall of result.toolCalls) {
    if (toolCall.dynamic) {
      continue;
    }

    switch (toolCall.toolName) {
      case 'cityAttractions': {
        toolCall.input.city; // string
        break;
      }

      case 'weather': {
        toolCall.input.location; // string
        break;
      }
    }
  }

  console.log(JSON.stringify(result, null, 2));