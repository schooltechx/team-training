# Team Training

เพื่อพัฒนาทักษะในการทำงานร่วมกัน มีความรู้พื้นฐานเพื่อถรับผิดชอบส่วนงานของตัวเอง โดยไม่ต้องพึงพาผู้ร่วมงานมากนัก สามารถประสานงานกับทีมงาน สามารถวิเคราะห์ข้อผิดพลาดเบื้องต้น และช่วยหาแนวทางในการแก้ได้ ในเอกสารนี้จะเน้นการพัฒนาเวปแอปพลิเคชั่น

ทีมงาน: dev,test,support, SA, UX/UI ฯลฯ รู้และเข้าใจการเขียนโปรแกรมเบื้องต้น มีความเข้าใจการทำงานพื้นฐานหัวข้อดังต่อไปนี้ Backend, Frontend, Database, Web/Mobile Application, Web API, Linux, Cloud, git, JavaScript, Markdown ฯลฯ 

นักพัฒนา(dev): สามารภออกแบบและพัฒนาซอฟต์แวร์ที่ใช้งานได้ มีความเข้าใจเรื่องความปลอดภัย ข้อดีข้อเสียของการออกแบบต่างๆ

UX/UI: ออกแบบหน้าจอแอปพลิเคชั่น โดยคำนึ่งถึงการติดต่อผู้ใช้งาน สามารถแปลจากหน้าที่ออกแบบ(เช่น Figma) ไปเป็นโค้ดของ Frontend

Test: สร้าง Test Specificatoin, ทำการทดสอบโปรแกรม ด้วยวิธีทั่วไปและเขียนเป็นสคริปต์

SA: สื่อสารและเข้าใจความต้องการของลูกค้า วิเคราะห์ออกมา เพื่อทำงานร่วมกับทีม dev, UX/UI และ test เพื่อสร้างแอปพลิเคชั่นที่ตรงตามความต้องการ

## ตั้งค่า development environment
การใช้งานบน Production จะใช้ Linux OS และโปรแกรมจะทำงานแบบ container ผู้ใช้งานวินโดว์จะติดตั้ง WSL เพื่อให้สามารถใช้ Linux คู่ขนานกันได้ โดยกินทรัพยากรน้อยกว่า VM 
ในการเรียนการสอนจะใช้สภาพแวดล้อมเดียวกับ Linux เป็นหลัก สำหรับ macOS จะถือว่าใกล้เคียงกับ Linux อาจจะมีบางอย่างแตกต่างกันบ้าง


- [WSL และ Docker](https://www.youtube.com/watch?v=8g_GwM60MaU) สำหรับผู้ใช้งานวินโดว์
- Docker ติดตั้ง Docker Desktop บน 
[Widows](https://docs.docker.com/desktop/install/windows-install/) และ 
[macOS](https://docs.docker.com/desktop/install/mac-install/)
สำหรับผู้ใช้ Linux [ให้ติดตั้ง Docker Engine](https://docs.docker.com/desktop/install/linux-install/) จะได้เหมือนกับใน production
- [ติดตั้ง NVM](https://github.com/nvm-sh/nvm) เพื่อให้สามารถเปลี่ยนรุ่นของ Node ได้ตามต้องการ
- [ตั้งค่า Git](https://github.com/schooltechx/youtube/blob/main/fullstack-dev/github/Setup.md) 
เพื่อควบคุมรุ่นของโค้ด แนะนำเวลาเรียนให้จดเนื้อหาด้วย markdown และ โค้ดแบบฝึกหัดเก็บใน repository ของตัวเอง
- [VS Code](https://code.visualstudio.com/download) ติดตั้งส่วนขยาย [Remote SSH](https://www.youtube.com/watch?v=cOopQQIL8JU), [Thunder Client](https://www.thunderclient.com/), [Rest Client](https://medium.com/lseg-developer-community/how-to-test-rest-api-with-visual-studio-code-rest-client-extensions-9f2e061d0299), [Docker](https://www.youtube.com/watch?v=Wo7sliKuiPo)

## ความรู้พื้นฐาน
ความรู้พื้นฐานสำหรับทุกคนที่เป็นทีมงาน ทุกคนไม่จำเป็นต้องเชี่ยวชาญในการเขียนโค้ด แต่ต้องเข้าใจการทำงานของเทคโนโลยที่เกี่ยวข้อ
- [Linux พื้นฐาน](./basic_linux.md) จัดการไฟล์, permission, install โปรแกรม
- [Node.js เบื้องต้น](./node/Readme.md)
เขียนโปรแกรมง่ายๆด้วย Node.js 
- Web App พื้นฐาน [Storage, cookie](https://youtu.be/amm45rEjono)
, [Web API](https://youtu.be/c49Y5VKKW34), [JWT](https://youtu.be/Sw-k9j2NeO8), Web Server, SPA ฯลฯ OK
- [Basic Express(TypeScript)](./ex-ts) สร้าง Web API ทำ CRUD อย่างง่าย,TypeDoc, Markdown ถ้าแบบซับซ้อนขึ้นมาหน่อยให้ดูที่ [express-ts](./express-ts/Readme.md)
- Markdown ใช้กับการสร้างเอกสารทั่วๆ เช่น Software Specification, test Specification จะใช้ pandoc ในการแปลงเป็น MS Word เรียนรู้วิธีการเขียน Markdown แนะนำให้อ่าน ["วิธีการใช้ Markdown ง่ายๆ ไม่มีความรู้เรื่อง Programming ก็ทำได้"](https://dev.classmethod.jp/articles/how-to-use-markdown-simply/)
ตัวอย่างการ สคริปต์ในการสร้างเอกสาร ให้ดู doc-spec ใน [package.json](./express-ts/package.json)
- Storybook ใช้เพื่อทำเอกสาร UI Component ที่พร้อมใช้งานแล้ว
- ใช้ [Github issue/project](https://github.com/features/issues) ในการบริหารงานในทีม
- [Docker](./docker/Readme.md) สามารถใช้คำสั่งพื้นฐานเพื่อ ติดตั้ง/เปิด/เปิด โปรแกรมที่ใช้งานได้เช่น Database,Wordpress,Reverse ฯลฯ สำหรับ dev สามารถ build image จากโปรแกรมที่พัฒนาได้
- [Reverse Proxy](./reverse-proxy/Readme.md)  สามารถรองรับหลายเวปได้ในเวลาเดียวกัน โดยใช้ Public IP เดียว เป็นฟังก์ชั่นพื้นฐานที่มีใน Web Server การจัดการเรื่องความปลอดภัยมักจะทำที่จุดนี้ด้วย

## Testing
หลักๆจะเป็นของทีม test ส่วนของ dev ทำเฉพาะ Unit Test

- vitest ใช้ในการทำ Unit test
- Playwrite ใช้ในการทำ UI Test
- [Robot fraework](./RobotFramework/)  ใช้ในการทำ UI Test
- Load test ด้วย k6 ดูในวีดีโอ ["Load Test RabbitMQ และ Memphis ด้วย K6"](https://www.youtube.com/watch?v=7KKoXFLqavE&t=820s)

## Developer
- ตัวอย่างการพัฒนาด้วย [Vue, Express, Keycloak](./keycloak-vue-express-ts/Readme.md) 
- ตัวอย่างการใช้ ORM, OpenAPI Spec ทางทีมใช้ tosa ในการสร้าง spec จาก decorator ใน controller แล้วค่อยนำไปแปลงเป็นหน้าเวปอีกที ดูตัวอย่างใน [typeOrm-tsoa](./typeOrm-tsoa/)

- [พัฒนา Microservice แบบเป็นทีม](https://youtu.be/-zfABqdhmPg?si=ULJ5HjrLzAuLSGIP) รวมแต่ละ Micrservice ด้วยกันด้วย API Gateway 
- [RabbitMQ เบื้องต้น เพื่อ Infra ที่แข็งแกร่ง](https://www.youtube.com/watch?v=2vcApGyfiVs) 
- [Elasticsearch ค้นคำไทยง่ายนิดเดียว](https://www.youtube.com/watch?v=WGRKCnafBC4)
- [Nginx Proxy Manager สร้าง Self-signed certificate ใช้เอง](https://www.youtube.com/watch?v=pyJF2DnPv7Y)

## macOS
สำหรับคนใช้ macOS มีบางอย่างต่างจากระบบอื่นๆ อาจจะต้องมีการปรับเพื่อให้ทำงานได้รวดเร็วยิ่งขึ้น
- การเรียกเมนูคำสั่งจะใช้ Cmd+Shift+P ระบบอื่น(Linux/Windows) จะใช้ Ctrl+Shift+P
- [รัน VS code จาก command line](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line) เหมือนของ Windows เช่น code. Command + Shift + P (หรือ F1) หาคำสั่ง "Shell Command: Install code in PATH"
- แสดงไฟล์ซ่อนใน Finder ใช้ Command + Shift + .
