// https://ai-sdk.dev/cookbook/node/mcp-tools
import { google } from '@ai-sdk/google';
import { experimental_createMCPClient, generateText,CoreMessage } from 'ai';
import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio';
const model = google('gemini-2.5-flash')
const messages:CoreMessage[] = [{role: 'user',content: 'Find products under $100'}]
try{
  const transport = new Experimental_StdioMCPTransport({
    command: 'node',
    args: ['mcp_server.js'],
  });
  const clientOne = await experimental_createMCPClient({transport});
  const tools = await clientOne.tools();
  const res = await generateText({model,tools,messages});
  console.log('text:',res.text);
  clientOne.close()
} catch (error) {
  console.error(error);
}

