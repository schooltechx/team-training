//ตัวอย่างคอนฟิกและอธิบายภาพ
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai"
const ai = new GoogleGenAI({})
const model = "gemini-2.5-flash"
const image = await ai.files.upload({
  file: "../img/id_2.jpg",
})
let prompt =
"Extract text from ID Card with out modify in Markdown. Show N/A if data unavaliable. Use below format.\n"+
"## ID Card"+
"- ID: The 13-digit Identification Number.\n"+
"- ชื่อตัวและสกุล: Name \n"+
"- Name: Name in English\n"+
"- Last name: Last name in English \n" +
"- เกิดวันที่: Date of birth in Thai B.E. format (Day Month Year).\n"+
"- Date of Birth: Date of birth in Gregorian format (YYYY-MM-DD).\n"+
"- ศาสนา: \n"+
"- ที่อยู่: \n"+
"- วันออกบัตร: Date of issue in Thai B.E. format (Day Month Year).\n"+
"- Date of issue: Date of issue in Gregorian format (YYYY-MM-DD).\n"+
"- เจ้าพนักงานออกบัตร: itle/Rank of the official who issued the card (e.g., Police Lieutenant).\n"+
"- วันบัตรหมดอายุ: Date of expire in Thai B.E. format (Day Month Year).\n"+
"- Date of Expire: Date of issue in Gregorian format (YYYY-MM-DD).\n"

const contents = [
  createUserContent([
    prompt,
    createPartFromUri(image.uri||'', image.mimeType|| 'image/jpeg'),
  ]),
]
const res = await ai.models.generateContent({ model, contents})
console.log(res.text)
