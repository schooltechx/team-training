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
  //{'role':'model',parts:[{functionCall:{...}}]}
  // console.log(JSON.stringify(response.candidates[0].content,null,2))
} else {
  console.log("Response:",response.text) //without function call
}