//Structured output
import { GoogleGenAI, Type } from "@google/genai"
const model = "gemini-flash-latest"
const contents ="ระบุสูตรขนมยอดนิยม 3 สูตร พร้อมกับส่วนผสมและปริมาณ"
const config ={
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            recipeName: {
              type: Type.STRING,
            },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["recipeName", "ingredients"],
        },
      },
    }

const ai = new GoogleGenAI({})
const response = await ai.models.generateContent({model,contents,config})
console.log(JSON.parse(response.text||'') )
