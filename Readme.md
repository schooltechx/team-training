# Team Training

เนื้อหาส่วนใหญ่ ควรต้องรู้และเข้าใจ เพื่อพัฒนาทักษะในการทำงานร่วมกัน สามารถรับผิดชอบส่วนงานของตัวเองโดยไม่ต้องพึงพาผู้ร่วมงานมากนัก สามารถวิเคราะห์ข้อผิดพลาดเบื้องต้นและหาแนวทางในการแก้ได้

## ตั้งค่า development environment
สำหรับทุกคนควรติดตั้ง Postman, VS Code พร้อม extension ที่จำเป็น, git, docker, node

- [WSL และ Docker(คนใช้ Mac ติดตั้งแค่ docker)](https://www.youtube.com/watch?v=8g_GwM60MaU)
- [ติดตั้ง NVM](https://github.com/nvm-sh/nvm) ทำบน macOS หรือ WSL
- [ตั้งค่า Git](https://github.com/schooltechx/youtube/blob/main/fullstack-dev/github/Setup.md) ให้ลองทำบนวินโดว์และ Linux(WSL) เวลาเรียนให้จดเนื้อหาด้วย markdown ใน และเก็บโค้ดแบบฝึกหัดใน repository ของตัวเอง

## พื้นฐานที่เรียน
- [Linux พื้นฐาน](./basic_linux.md) จัดการไฟล์, permission, install โปรแกรม
- [Node.js เบื้องต้น](./node/Readme.md)
เขียนโปรแกรมง่ายๆด้วย Node.js 
- Web App พื้นฐาน [Storage, cookie](https://youtu.be/amm45rEjono)
, [Web API](https://youtu.be/c49Y5VKKW34), [JWT](https://youtu.be/Sw-k9j2NeO8), Web Server, SPA ฯลฯ OK
- [Basic Express(TypeScript)](./ex-ts) สร้าง Web API ทำ CRUD อย่างง่าย,TypeDoc, Markdown ถ้าแบบซับซ้อนขึ้นมาหน่อยให้ดูที่ [express-ts](./express-ts/Readme.md)
- Markdown ใช้กับการสร้างเอกสารทั่วๆ เหมาสำหรับเอกสารที่มีโครงสร้างแน่นนอนเช่น Software Specification, test Specification จะใช้ pandoc ในการแปลงเป็น MS Word  หัดเขียน Markdown แนะนำให้อ่าน ["วิธีการใช้ Markdown ง่ายๆ ไม่มีความรู้เรื่อง Programming ก็ทำได้"](https://dev.classmethod.jp/articles/how-to-use-markdown-simply/)
ตัวอย่างการใช้ดู [doc-spec ใน package.json](./express-ts/package.json)
- Storybook ใช้เพื่อทำเอกสาร UI Component ที่พร้อมใช้งานแล้ว

- [Docker](./docker/Readme.md) สอนการติดตั้งใช้งานโปรแกรมชนิดต่างๆ, Database,Wordpress,Reverse Proxy, API Gateway ฯลฯ
- ใช้ [Github issue/project](https://github.com/features/issues) ในการบริหารงานในทีม

## Git
ตั้งค่าและใช้งานทำเหมือนในหัวข้อ [ตั้งค่า Git](https://github.com/schooltechx/youtube/blob/main/fullstack-dev/github/Setup.md) 

หรือเริ่มจากโปรเจ็กที่มีอยู่แล้ว
```
cd proj1
git init
touch test.txt
touch .gitignore
git add .
git commit
# create git repo from web
git remote add origin git@github.com:username/new_repo
git push -u origin master

```

## Testing
- vitest ใช้ในการทำ Unit test
- Playwrite ใช้ในการทำ UI Test
- [Robot fraework](./RobotFramework/)  ใช้ในการทำ UI Test
- [Robot Framework: สร้าง Image เอาไว้ทดสอบระบบ web ด้วย Docker](https://www.somkiat.cc/docker-image-for-robotframework/)
- [Load Test RabbitMQ และ Memphis ด้วย K6](https://www.youtube.com/watch?v=7KKoXFLqavE&t=820s)

## Developer
- ตัวอย่างการพัฒนาด้วย [Vue, Express, Keycloak](./keycloak-vue-express-ts/Readme.md) 
- ตัวอย่างการใช้ ORM, OpenAPI Spec ทางทีมใช้ tosa ในการสร้าง spec จาก decorator ใน controller แล้วค่อยนำไปแปลงเป็นหน้าเวปอีกที ดูตัวอย่างใน [typeOrm-tsoa](./typeOrm-tsoa/)

- [พัฒนา Microservice แบบเป็นทีม](https://youtu.be/-zfABqdhmPg?si=ULJ5HjrLzAuLSGIP) รวมแต่ละ Micrservice ด้วยกันด้วย API Gateway 
- [RabbitMQ เบื้องต้น เพื่อ Infra ที่แข็งแกร่ง](https://www.youtube.com/watch?v=2vcApGyfiVs) 
- [Elasticsearch ค้นคำไทยง่ายนิดเดียว](https://www.youtube.com/watch?v=WGRKCnafBC4)
- [Nginx Proxy Manager สร้าง Self-signed certificate ใช้เอง](https://www.youtube.com/watch?v=pyJF2DnPv7Y)

## macOS
สำหรับคนใช้ macOS อาจจะต้องมีการปรับเพื่อให้ทำงานได้รวดเร็วยิ่งขึ้น
- [รัน VS code จาก command line](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line) เหมือนของ Windows เช่น code. Command + Shift + P (หรือ F1) หาคำสั่ง "Shell Command: Install code in PATH"
- แสดงไฟล์ซ่อนใน Finder ใช้ Command + Shift + .
