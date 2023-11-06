# Node Tutorial
การใช้งานเบื้องต้นเพื่อให้เห็นว่า Node.js ทำงานอย่างไร ก่อนเรียนต้องติดตั้ง nvm ก่อน

## Topic
- node app.js
- เริ่มโปรเจ็ก Node.js
```
npm init -y
npm i qrcode
```
- loop,condition ดูใน [hello.js](./hello.js)
- ใช้งาน Library ภายนอก [qrcode](https://www.npmjs.com/package/qrcode) ตัวอย่างโค้ด [qr.js](./qr.js) 
- ข้อสังเกตุ การเรียกใช้งานเมื่อแปลงเป็น QR Code จะเรียก Call back จะตรวจว่าสำเร็จหรือไม่ ดูจากออปเจ็ก err ที่ส่งมาให้ตรวจ
- [package.json](./package.json) จะเขียน script สำหรับทำงาน ให้ทีมงานตรวจสอบหรือเขียนเพิ่มเติม
- การอ่านค่าจากคีย์บอร์ดเพื่อนำมาเปรียบเทียบดูใน [radline.js](./readline.js)
- โค้ดตัวอย่างจะเป็น commonjs ถ้าจะใช้แบบ es module ที [package.json](./package.json) จะใช้ import แทน require
``` json
{
  ...
  "type": "module",
  "scripts": { ...},
  ...
}

```

## Note
- [การใช้ Home/End ใน keyboard Mac, Fn+Arrow Key ](https://www.cnet.com/tech/computing/two-mac-keyboard-shortcuts-for-missing-home-and-end-keys/)


## Homework
วิธีการใช้ [Readline](https://geshan.com.np/blog/2022/03/nodejs-readline/) 

1. ถามอายุ รับตัวเลข ถ้าน้อยกว่า 18 ให้ตอบว่า "Kid" นอกนั้นบอกว่า "Adult"
2. เกมส์เดาตัวเลข สุ่มตัวเลข 0-100 ป้อนค่าที่เดา ถ้าถูก จบเกมส์ ถ้าผิดให้ใบ้ว่า มากว่า หรือน้อยกว่านี้ เล่นจนกว่าจะเดาถูก 
ตัวอย่างการสุ่มตัวเลขใน JavaScript 0-100
```
let guess_this = Math.floor(Math.random() * 101);
```
