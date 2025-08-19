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