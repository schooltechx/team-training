# Express with TypeScript
ตัวอย่างการทำโปรเจ็ก Web API บน Node.js ด้วย Express.js


# เริ่มโปรเจ็ก
ติดตั้ง node ให้เรียบร้อย แล้วเริ่มโปรเจ็กเหมือนตอนทำ node
```
mkdir express.ts
cd express.ts
npm init -y
npm i dotenv express cors
npm i -D @types/express @types/node @types/cors nodemon ts-node typescript
code .
```
สร้างไฟล์ [tsconfig.json](./tsconfig.json) โดยมีเนื้อหาเดียวกับใน repo นี้ สำเนา [env.examle](./env.example) เป็น .env
ไฟล์ package.json ส่วนที่เป็น scripts แก้ให้เป็นดังนี้
```json
  "scripts": {
    "start:ts": "ts-node src/app.ts",
    "start": "node dist/app.js",
    "build": "tsc ",
    "dev": "nodemon src/app.ts"
  },
```
สร้างไฟล์เปล่า src/app.ts แล้วใส่โค้ดดังนี้
```ts
import "dotenv/config" 
import express, { Express, Request, Response,NextFunction } from 'express'
const app: Express = express()
const port = Number(process.env.PORT) || 3000;
const apikey = process.env.APIKEY || "123456789";
const apiKeyCheck = (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware");
    if (req.headers.apikey !== apikey) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      next();
    }
  }
//app.use(apiKeyCheck);
app.get("/hello2",apiKeyCheck,(_req, res) => {
  res.send("Hello 2");
});


app.get('/',(req,res)=>{
    res.send("Hello Express")
})
app.listen(port, () => console.log(`Application is running on port ${port}`))
```

จากโค้ดนี้จะใช้ dotenv เพื่ออ่านค่าตัวแปรแวดล้อมจาก ไฟล์ .env (สร้างไฟล์นี้ที่ root ของโปรเจ็ก)
```
PORT=4000
```
ให้ศึกษาการใช้งาน Middleware และ Web API route บน Express ลองรันโปรแกรมด้วย คำสั่งเหล่า เพื่อดูการทำงานของโค้ดโปรเจ็กนี้ ใช้ postman หรือ Thunder Client (VS Code extension)เพื่อส่ง apikey ใน header 
(รายละเดียดจะสอนในชั้นเรียน)
```
npm run dev
npm run build
npm start
npm run start:ts
```
เพิ่ม middleware ต่างๆใน src/app.ts
```ts
const port = Number(process.env.PORT) || 3000;
const apikey = process.env.APIKEY || "123456789";
if(process.env.NODE_ENV!=="production"){
  app.use(cors())
}
app.use(express.json())
app.use(express.raw())
app.use(express.urlencoded({extended:true}))
```
ในตัวอย่างต่อๆไปให้ comment ส่วน Middleware ของ apikey ไว้เพื่อง่ายต่อการทดสอบทดสอบส่วนต่อๆไป

## Import
ตัวอย่างการนำโค้ดมาใช้ซ้ำ หรือแยกโค้ดไปอีกไฟล์ด้วยการ import ก้อปโฟลเดอร์ [src/lib](./src/lib/) มาใช้โดยให้โครงสร้างตรงกัน เพิ่มโค้ดนี้ใน [src/app.ts](./src/app.ts)

```ts
...
import {myapiRoute} from './lib/myapi'
import {fruitRoute} from "./lib/fruit"
...
app.use('/api/myapi',myapiRoute)
app.use('/api/fruits',fruitRoute)

```


ศึกษาการสร้างนำฟังก์ชั่นกลับมาใช้ใหม่และจัดการแยกโค้ดเป็นหลายไฟล์เพื่อที่จะได้จัดการได้ง่ายด้วย express.Router กับ import และตัวอย่างกับ Web API เบื้องต้น
โดยดู [src/lib/hello.ts](./src/lib/hello.ts) จะถูกนำมาใช้ใน [src/lib/myapi.ts](./src/lib/myapi.ts),

## ทำเอกสารจาก code (typescript)
ทำเอกสาร html จากโค้ด typescript และ comment ใช้เพื่ออ้างอิงสำหรับนักพัฒนาด้วย typedoc ค่าตอนฟิกอยู่ใน [typedocOptions](./tsconfig.json)  เพิ่มบรรทัดนี้ใน Scripts ของ package.json
```json
"docs": "typedoc",
```
รันคำสั่ง
```
npm i typedoc
npm run docs
```
เอกสารจะไปอยู่ที่ dist/docs/typedoc

## ทำเอกสารจาก markdown
Markdown ข้อดีของการทำเอกสารด้วย Markdown คือแปลงได้หลายรูปแบบเช่น HTML PDF Word ฯลฯ ตัวอย่างนี้จะแปลงเป็นเอกสาร MS Word(docx) จะใช้รูปแบบเอกสารจาก [spec/DFD-reference.docx](./spec/DFD-reference.docx) ตัวอย่างนี้จะไม่เกี่ยวข้องกับโค้ดของ Node.js เป็นการทำเอกสารทั่วๆไป

ให้ติดตั้ง [pandoc](https://pandoc.org/installing.html)ลงบน Windows/macOS/Linux เพื่อใช้สร้างเอกสาร spec จาก markdown การติดตั้งบน Linux ทำดังนี้
```bash
wget https://github.com/jgm/pandoc/releases/download/3.2/pandoc-3.2-1-amd64.deb
dpkg -i pandoc*
rm pandoc*
```
เพิ่มบรรทัดนี้ใน Scripts ของ package.json
```json
"doc-spec": "cd spec && pandoc DFD_01.md DFD_02.md -f gfm --reference-doc=DFD-reference.docx --data-dir=. -o ../dist/DFD.docx",
```

สร้างเอกสาร .docx จาก .md รันคำสั่ง
```bash
npm run doc-spec

```
เอกสารจะอยู่ที่ dist/DFD.docx


## CRUD
ไฟล์ [src/lib/fruit.ts](./src/lib/fruit.ts) ตัวอย่างการทำ get, post, delete, put หรือ patch
จะสร้าง Frontend ง่ายๆเพื่อทดสอบ Web API ตัวอย่างนี้จะใช้ [SvelteKit](https://kit.svelte.dev/) 

```
npm create svelte@latest fruit-fe
cd fruit-fe
npm install
npm code .
```
แก้ package.json ของโปรเจ็ก SvelteKit ให้รันที่พอร์ต 3000
```
"dev": "vite dev --port=3000",
```

เนื่องจาก backend รันที่ localhost:4000 จะเป็นคนละโดเมนกับ Frontend ปกติจะติด CORS ตัว backend ติดตั้ง cors ไว้ สำหรับ production ไม่ควรข้ามจุดนี้ จะต้องใช้ API Gateway ในการรวม Backend และ Frontend เป็นโดเมนเดียวกัน(จะแสดงในหัวข้ออื่น)
ให้แก้โค้ด src/route/+page.svelte ให้เป็นดังนี้

```html
<script lang="ts">
import { onMount } from 'svelte';    
let fruits: {id:number,name:string,color:string}[]=[]
let selectedId=0,debug = "",fruitName="",fruitColor=""
async function load(){
    const res = await fetch("http://localhost:4000/api/fruits")
    fruits = await res.json()
}
async function create(){
    const res = await fetch("http://localhost:4000/api/fruits",{
        "method":"POST",
        "headers":{"Content-Type": "application/json"},
        "body":JSON.stringify({name:fruitName,color:fruitColor})
    })
    load()
}
async function remove(){
  debug = "Delete "+selectedId
  selectedId = 0
}
async function update(){
    debug = "Update "+selectedId
}
function selectFruit(id:number){
    let f = fruits.find((e)=>e.id===id)
    if(f){
        selectedId=id
        fruitName=f.name
        fruitColor=f.color
        debug = "Select "+selectedId    
    }else{
        debug = id+" not found "+id
    }
}
onMount(async () => {load()});
</script>
<input type="text" name="name" bind:value={fruitName} placeholder="name">
<input type="text" name="color" bind:value={fruitColor} placeholder="color">
<button on:click={create} disabled={!fruitName||!fruitColor}>Create</button> 
<button on:click={update} disabled={!fruitName||!fruitColor||selectedId===0}>Update</button>
<button on:click={remove} disabled={selectedId===0}>Delete</button>
<ul>
{#each fruits as fruit}
    <li>
        <input type="radio" name="id" on:click={()=>selectFruit(fruit.id)}>
        {fruit.name} : {fruit.color} 
    </li>
{/each}
</ul>
<div>{debug}</div>
```

### การบ้าน
- ให้แก้ไข update() remove() เพื่อทำให้โปรแกรมสมบูรณ์
- ใช้ความรู้ที่เรียนมาสร้าง Todo List โดยมีฟังชั่นการทำงานคล้ายกับ[ตัวอย่างนี้](https://svelte.dev/repl/7eb8c1dd6cac414792b0edb53521ab49?version=3.20.1)

## SPA
ตัวอย่าง Single Page Application
สำเนาโฟลเดอร์ [static](./static/) มาไว้ในโปรเจ็กนี้ แล้วเพิ่มโค้ดนี้ลงใน src/app.ts ก่อน จะเป็นการจำลอง Single Page Application(SPA)
```ts
...
app.use(express.static('static'))
...
app.get('*',(req,res,next)=>{
  res.sendFile(`${process.cwd()}/static/index.html`)
})
...
```

## MVC and Swagger 
express สามารถเขียนโค้ดแบบ MVC ได้ ในตัวอย่างนี้จะเป็นการสร้าง Controller และสร้างเอกสารของ API ด้วย [TSOA](https://tsoa-community.github.io/docs/introduction.html)

เนื่องจากเป็นตัวอย่างอย่างง่าย ทำแค่ controller จะไม่ได้ใช้ Service หรือ Model ในโค้ด 

ติดตั้ง
```bash
npm i tsoa swagger-ui-express
npm i -D @types/swagger-ui-express
```

ให้สำเนาไฟล์ตามรายการนี้มาไว้ในโปรเจ็ก
- [tsoa.json](./tsoa.json) เป็นการตั้งค่าในการทำงานของ tsoa เช่น input/output คือไฟล์อะไร คำที่แสดงในเอกสาร API
- [src/controllers/helloController.ts](./src/controllers/helloController.ts) จะใช้ decorator ช่วยอธิบายว่า API มันมีหน้าตาเป็นอย่างไร จะได้สร้างเอกสารและ route ได้ถูกต้อง
- [src/myRoutes/index.ts](./src/myRoutes/index.ts) ในมุมมอง ของ Backend ตัว route ทำหน้าที่เป็น View ไฟลนี้เป็นการสร้าง route ด้วยตัวเอง
- [package.json](./package.json) เพิ่มบรรทัดนี้ใน Scripts 
คำสั่ง swagger สร้าง OpenAPI Spec ใน static/swagger.json จาก [src/controllers/*.ts](./src/controllers/) 
คำสั่ง routes ใช้ tsoa สร้าง Express route โดยดูข้อมูลจากโค้ดของ Controller จะได้ไฟล์ [src/routes.ts](./src/routes.ts) ออกมา

```json
"swagger": "tsoa spec",
"routes": "tsoa spec-and-routes",
```
- [src/app.ts](./src/app.ts) เรียกใช้ swaggerUi และมีการนำเข้า RegisterRoutes มีให้เลือกสองแบบคือจาก route ที่สร้างเอง(./myRoutes)  และ ที่สร้างด้วย tsoa(./route) ให้สลับใช้งานด้วยการ comment โค้ด
```ts
...
import { RegisterRoutes } from "./myRoutes"
//import { RegisterRoutes } from "./routes"
import swaggerUi from "swagger-ui-express"
...
RegisterRoutes(app) // route: /hello
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
)
...
```

รันคำสั่ง
```bash
npm run swagger
npm run dev
```
ไปที่ http://localhost:4000/swagger เพื่อดูหน้าเอกสาร API

### Homework
ลองสร้าง controller และ route เพื่อให้ครบขั้นตอนการทำ CRUD แนะนำให้ลองดัดแปลงจากโค้ด [fruit.ts](./src/lib/fruit.ts) โดยเรียก Controller ที่สร้างเอง ให้อยู่ที่ http://localhost:4000/fruits ศึกษาการใช้ TSOA(PUT,POST,PATCH,DELETE) [จากตัวอย่าง](https://tsoa-community.github.io/docs/examples.html)



## ดูเพิ่มเติม
- [รู้จัก Postman มากกว่าแค่ส่ง Request](https://www.youtube.com/watch?v=DDZGZPgUcok)
- [Swagger Editor](https://editor.swagger.io/)
- [Building REST API with Express.js, TypeScript and Swagger](https://medium.com/ms-club-of-sliit/building-rest-api-with-express-js-typescript-and-swagger-387a9c731717)