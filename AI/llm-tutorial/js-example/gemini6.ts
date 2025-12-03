import { GoogleGenAI, Type } from '@google/genai';

// Configure the client
const ai = new GoogleGenAI({});

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
const getCurrentTemperature = (location:string)=>28
// Send request with function declarations
const response = await ai.models.generateContent({
  model: 'gemini-flash-latest',
  contents: "อุณหภูมิในกรุงเทพตอนนี้เท่าไหร่?",
  config: {
    tools: [{
      functionDeclarations: [weatherFunctionDeclaration]
    }],
  },
});

// Check for function calls in the response
if (response.functionCalls && response.functionCalls.length > 0) {
  const functionCall = response.functionCalls[0]; // Assuming one function call
  console.log(`Function to call: ${functionCall.name}`);
  console.log(`Arguments: ${JSON.stringify(functionCall.args)}`);
  if(functionCall.name === 'get_current_temperature'){
    const temp = getCurrentTemperature(JSON.stringify(functionCall.args?.location as string) )
    console.log(`อุณหภูมิคือ: ${temp} องศาเซลเซียส `)
    // นำอุณหภูมิที่ได้ไปใส่ใน prompt เพื่อสร้างคำตอบอีกรอบ
  }    

} else {
  console.log("No function call found in the response.");
  console.log(response.text);
}