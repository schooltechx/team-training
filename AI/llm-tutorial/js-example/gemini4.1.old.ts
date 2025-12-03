//Structured output
import {GoogleGenAI, createUserContent, createPartFromUri} from "@google/genai"
import id_schema from './gemini4.1.json'
const model = "gemini-flash-latest"
const ai = new GoogleGenAI({})

const image = await ai.files.upload({
  file: "../img/id_2.jpg",
})

const contents = [
  createUserContent([
    "Extract text from ID Card. Replace undefine data with '-' ",
    createPartFromUri(image.uri||'', image.mimeType|| 'image/jpeg'),
  ]),
]

const config ={
      responseMimeType: "application/json",
      responseSchema: id_schema,
    }
const response = await ai.models.generateContent({model,contents,config})
console.log(JSON.parse(response.text||'') )
