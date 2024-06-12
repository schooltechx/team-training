# Express with TypeScript



# เริ่มโปรเจ็ก
ติดตั้ง node ให้เรียบร้อย แล้วเริ่มโปรเจ็กเหมือนตอนทำ node
```
mkdir express.ts
cd express.ts
npm init -y
npm i dotenv express typedoc
npm i -d @types/express @types/node nodemon ts-node typescript
code .
```
สร้างไฟล์ [tsconfig.json](./express-ts/tsconfig.json) โดยมีเนื้อหาเดียวกับใน repo นี้

```
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
let port = 4000
let apikey="123456789"
app.use((req:Request,res:Response,next:NextFunction)=>{
  console.log("Middleware")
  if(req.headers.apikey!==apikey ){
    return res.status(401).json({error:"Unauthorized"})
  }
  next()
})

app.get('/hello',(req,res)=>{
    
    res.send("Hello 2")
})
app.get('/',(req,res)=>{
    res.send("Hello Express")
})
app.listen(port, () => console.log(`Application is running on port ${port}`))
```
จากโค้ดนี้ทำความเข้าใจ route และ Middleware ของ Express ลองรันโปรแกรมด้วย คำสั่งเหล่า เพื่อดูการทำงานของโค้ดโปรเจ็กนี้ ใช้ postman หรือ Thunder Client เพื่อส่ง apikey ใน header
(รายละเดียดจะสอนในชั้นเรียน)
```
npm run dev
npm run build
npm start
npm start:ts
```
เพิ่ม middleware มาตรฐานใน src/app.ts
```ts
app.use(express.json())
app.use(express.raw())
app.use(express.urlencoded({extended:true}))
app.use(express.static('static'))
```

สร้างไฟล์ static/index.html แล้วเพิ่มโค้ดนี้ใน src/app.ts ก่อน app.listen(..) จะเป็นการจำลอง static page ของเวป
```ts
app.get('*',(req,res,next)=>{
  res.sendFile(`${process.cwd()}/static/index.html`)
})

```
## แยกโค้ด
จัดการแยกโค้ดเป็นหลายไฟล์เพื่อที่จะได้จัดการได้ง่ายด้วย express.Router กับ import

## CRUD
- [fruit.ts](./src/lib/fruit.ts) ดูวิธีการทำ get, post, delete, put หรือ patch



## ทำเอกสารจาก markdown
ให้ติดตั้ง [pandoc](https://pandoc.org/installing.html)ลงบน Windows/macOS/Linux เพื่อใช้สร้างเอกสาร spec จาก markdown
```bash
wget https://github.com/jgm/pandoc/releases/download/3.1.7/pandoc-3.1.7-1-amd64.deb
dpkg -i pandoc*
rm pandoc*
```

## Swagger
- [Swagger Editor](https://editor.swagger.io/)
## Todo
- สอน design pattern
- หาวิธีสร้าง swagger spec ที่ดีกว่านี้
