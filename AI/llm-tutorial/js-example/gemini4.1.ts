//Structured output
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import id_schema from "./gemini4.1.json";
const ai = new GoogleGenAI({});
const model = "gemini-flash-latest";
const base64ImageFile = fs.readFileSync("../img/id_2.jpg", {
  encoding: "base64",
});
const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "ภาพนี้คือตัวอะไร" },
];
//https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerateContentConfig.html
const config = {
  responseMimeType: "application/json",
  responseSchema: id_schema,
};
const res = await ai.models.generateContent({ model, contents, config });
console.log(JSON.parse(res.text || ""));
