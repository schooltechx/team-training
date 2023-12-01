# Team Training

## หัวข้อที่เรียน
ต้องเรียนทุกคน Dev ,Test Support และ UI สำหรับทำงานร่วมกันอย่างเขาใจ
- Linux พื้นฐาน
- Node.js เบื้องต้น
- Web App คนเซ็บพื้นฐาน Storage, cookie, JWT, Web Server, SPA ฯลฯ OK
- การทำเอกสาร ด้วย JSoc, Markdown OK(ได้ลองเขียน markdown)
- Web API ใช้ Express ทำเอกสารด้วย Swagger 
- Docker

## ตั้งค่า development environment
สำหรับทุกคนควรติดตั้ง Postman, VS Code พร้อม extension ที่จำเป็น, git, docker, node

- [WSL และ Docker(คนใช้ Mac ติดตั้งแค่ docker)](https://www.youtube.com/watch?v=8g_GwM60MaU)
- [ติดตั้ง NVM](https://github.com/nvm-sh/nvm)
- [ตั้งค่า Git](https://github.com/schooltechx/youtube/blob/main/fullstack-dev/github/Setup.md) ให้ลองทำบนวินโดว์และ Linux(WSL) เวลาเรียนให้ทำแบบฝึกหัดและจดเป็น markdown ใน repository ของตัวเอง

## ศึกษาจากวีดีโอ
- [เข้าใจการทำงาน Web API](https://youtu.be/c49Y5VKKW34)
- [เข้าใจการทำงานของ JWT Authentication](https://youtu.be/Sw-k9j2NeO8) 
- [เข้าใจพื้นฐานการทำงานของ Cookie และ Storage](https://youtu.be/amm45rEjono)
- [Docker in WSL2: เริ่มต้นใช้งาน Docker บน WSL2](https://www.youtube.com/watch?v=ntLLCJk9LyY)
- [Nginx Proxy Manager ตอนติดตั้งและใช้งานเบื้องต้น](https://www.youtube.com/watch?v=iWrbL-xDwlk)

## Note 
- [Basic Linux](./basic_linux.md)
- [Basic Node](./node/Readme.md)
- [Basic Express(TypeScript)](./express-ts/Readme.md)
- จะใช้ [Github issue/project](https://github.com/features/issues) ในการบริหารงานในทีม


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
- [Robot Framework: สร้าง Image เอาไว้ทดสอบระบบ web ด้วย Docker](https://www.somkiat.cc/docker-image-for-robotframework/)
- [Load Test RabbitMQ และ Memphis ด้วย K6](https://www.youtube.com/watch?v=7KKoXFLqavE&t=820s)

## Developer

- [RabbitMQ เบื้องต้น เพื่อ Infra ที่แข็งแกร่ง](https://www.youtube.com/watch?v=2vcApGyfiVs)
- [Elasticsearch ค้นคำไทยง่ายนิดเดียว](https://www.youtube.com/watch?v=WGRKCnafBC4)
- [Nginx Proxy Manager สร้าง Self-signed certificate ใช้เอง](https://www.youtube.com/watch?v=pyJF2DnPv7Y)


## macOS
สำหรับคนใช้ macOS อาจจะต้องมีการปรับเพื่อให้ทำงานได้รวดเร็วยิ่งขึ้น
- [รัน VS code จาก command line](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line) เหมือนของ Windows เช่น code. Command + Shift + P (หรือ F1) หาคำสั่ง "Shell Command: Install code in PATH"
- แสดงไฟล์ซ่อนใน Finder ใช้ Command + Shift + .