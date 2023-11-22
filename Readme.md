# Team Training

## หัวข้อที่เรียน
ต้องเรียนทุกคน Dev ,Test Support และ UI สำหรับทำงานร่วมกันอย่างเขาใจ
- Linux พื้นฐาน
- Node.js เบื้องต้น
- Web App คนเซ็บพื้นฐาน Storage, cookie, JWT, Web Server, SPA ฯลฯ OK
- การทำเอกสาร ด้วย JSoc, Markdown OK(ได้ลองเขียน markdown)
- Web API ใช้ Express ทำเอกสารด้วย Swagger 
- Docker

## Note 
- [Basic Linux](./basic_linux.md)
- [Basic Node](./node/Readme.md)
- [Basic Express(TypeScript)](./express-ts/Readme.md)

## ศึกษาจากวีดีโอ
- [เข้าใจการทำงาน Web API](https://youtu.be/c49Y5VKKW34)
- [เข้าใจการทำงานของ JWT Authentication](https://youtu.be/Sw-k9j2NeO8) 
- [เข้าใจพื้นฐานการทำงานของ Cookie และ Storage](https://youtu.be/amm45rEjono)

## ตั้งค่า development environment
สำหรับทุกคนควรติดตั้ง Postman, VS Code พร้อม extension ที่จำเป็น, git, docker, node
- [ตั้งค่า Git](https://github.com/schooltechx/youtube/blob/main/fullstack-dev/github/Setup.md)
- [WSL และ Docker(คนใช้ Mac ติดตั้งแค่ docker)](https://www.youtube.com/watch?v=8g_GwM60MaU)
- [ติดตั้ง NVM](https://github.com/nvm-sh/nvm)

## การทำเอกสาร
มีตัวอย่างการทำเอกสารใน [package.json](./express-ts/package.json)
- TSDoc จะเขียน comment ในโค้ด TypeScript แล้วใช้เครื่องมือชือ typedoc ในการแปลงให้เป็นเอกสาร HTML เพื่อใช้ในการอ้างอิง
- OpenAPI Spec ทางทีมใช้ tosa ในการสร้าง spec จาก decorator ใน controller แล้วค่อยนำไปแปลงเป็นหน้าเวปอีกที
- Markdown ใช้กับการสร้างเอกสารทั่วๆ เหมาสำหรับเอกสารที่มีโครงสร้างแน่นนอนเช่น Software Specification, test Specification จะใช้ pandoc ในการแปลงเป็น MS Word  หัดเขียน Markdown แนะนำให้อ่าน ["วิธีการใช้ Markdown ง่ายๆ ไม่มีความรู้เรื่อง Programming ก็ทำได้"](https://dev.classmethod.jp/articles/how-to-use-markdown-simply/)
- Storybook ใช้เพื่อทำเอกสาร UI Component ที่พร้อมใช้งานแล้ว

## Testing
- vitest ใช้ในการทำ Unit test
- Playwrite ใช้ในการทำ UI Test
- [Robot fraework](./RobotFramework/)  ใช้ในการทำ UI Test

## Github 
- การตั้งค่าให้ตั้งค่าตามเอกสาร ["การตั้งค่า Github"](https://github.com/schooltechx/youtube/blob/main/fullstack-dev/github/Setup.md) ให้ ลองทำแบบเดียวกันใน Linux และ เอาไฟล์เอกสารนี้ไปเป็นตัวตั้งต้นจดโน้ตสำหรับเรียน เก็บไว้ใน Resitory ของตัวเอง เพิ่มเนื้อหาตามความเหมาะสม จะได้หัดเขียน Markdown ด้วย
- จะใช้ [Github issue/project](https://github.com/features/issues) ในการบริหารงานในทีม

## macOS
สำหรับคนใช้ macOS อาจจะต้องมีการปรับเพื่อให้ทำงานได้รวดเร็วยิ่งขึ้น
- [รัน VS code จาก command line](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line) เหมือนของ Windows เช่น code. Command + Shift + P (หรือ F1) หาคำสั่ง "Shell Command: Install code in PATH"
- แสดงไฟล์ซ่อนใน Finder ใช้ Command + Shift + .