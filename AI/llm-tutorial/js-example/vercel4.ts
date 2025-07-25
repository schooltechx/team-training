//Structured output
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
const model = google('gemini-2.5-flash');
const prompt = 'ส่วนผสมและวิธีทำขนมบัวลอย'
const schema=z.object({
    recipe: z.object({
      name: z.string(),
      ingredients: z.array(z.string()),
      steps: z.array(z.string()),
    }),
  })
const response= await generateObject({model,schema,prompt});
console.log(JSON.stringify(response.object, null, 2));