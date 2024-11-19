# Real World Developer

หลักสูตร Real World Developer สำหรับสร้างนักพัฒนาที่มีความรู้และเข้าใจในการสร้างซอฟต์แวร์ขนาดกลางถึงขนาดใหญ่เพื่องานงานภาครัฐ และเอกชน อย่างมีประสิทธิ์ภาพ สามารถวิเคราะห์ปัญหา ผลดีผลเสียในการออกแบบลักษณะต่างๆได้

- เวลาเรียนเป็นการประมาณ โดยยังไม่รู้ถึงศักยภาพของผู้เรียน เวลาเรียนอาจจะเร็วหรือช้าขึ้นกับทักษะ และความทุ่มเทของผู้เรียน 
- แนะนำผู้เรียนจะถูกจัดกลุ่มย่อย 5-6 คนกระจายตาม ทักษะและประสบการณ์ให้เฉลี่ยทุกกลุ่มพอๆกัน เพื่อง่ายในการบริหารจัดการ และเรียนรู้ได้ทันกัน
- ในกลุ่มต้องช่วยเหลือกัน เพื่อทำงานที่มอบหมายและ ตามเนื้อหาที่เรียนได้ทันทุกคน สามารถมาช่วยกลุ่มอื่นได้ เมื่อกลุ่มของตัวเองเรียนทันแล้ว อาจจะมีการจัดกลุ่มใหม่ตามสมควรถ้าไม่สมดุลย์กัน
- นิยาม "เข้าใจสิ่งที่เรียนรู้" ไม่ใช่แค่ฟังแล้วเข้าใจ การวัดผลความเข้าใจด้วยตัวเองคือ สามารถทำแบบฝึกหัดได้โดยไม่ต้องให้คนอื่นคอยบอก มี keyword ในใจสามารถค้นหาในเวป หรือดูบันทีกของตนเองย้อนหลัง เพื่อทำงานให้สำเร็จได้ ถ้าไม่สามารถทำได้ตามนี้ ให้กลับไปทบทวนจนสามารถทำได้

| หัวข้อ | รายละเอียด |
| -------- | :------- |
| Starter (1-2วัน) | - สำรวจทักษะของแต่ละคน<br> สำรวจ Facility ที่สถานศึกษามีให้<br> - หาเป้าหมายร่วมกันในการทำงาน<br> - ตั้งค่าเครื่องสำหรับการพัฒนา (VS Code,Node(nvm) , WSL(Windows), Docker, Github) |
| Linux พื้นฐาน (2วัน) | ssh:  ความรู้พื้นฐาน, ssh-key, Integrate VS Code<br> - การจัดการไฟล์ สิทธิ์ และโครงสร้างในระบบ<br> - คำสั่งของ root (su,sudo, apt, usermod, adduser)<br> - shell script เบื้องต้น |
| Web Application พื้นฐาน (5วัน) | - Node.js: สร้างโปรแกรมอย่างง่าย, npm, typescript, commonJS vs Module<br> - curl/Postman: ทดสอบ CRUD จาก jsonplaceholder , Pokémon API<br> - Express: สร้าง Web อย่างง่าย, Web API<br> - technology ที่เกี่ยวของ HTTP, Storage, cookie , Reverse proxy, Web API ฯลฯ<br> - ORM: ฐานข้อมูลและการใช้งาน ORM |
| Document (1วัน) | - Markdown: เรียนรู้วิธีสร้างเอกสาร, ใช้ Pandoc สร้าง DOCX จาก Template<br> - jsdoc/typedoc - สร้างเอกสารสำหรับ library ด้วย comment<br> - OpenAPI: สร้าง API Doc ด้วย JSDoc และ tsoa |
| JavaScript Framwork (2วัน) | Frontend: เข้าใจการทำงานของ SPA ทดลองใช้ Svelte, Vue <br> - Fullstack: SvelteKit/NuxtJS ให้ลองทำ CRUD web Application |
| Authentication/Authorization (2วัน) | - รหัสผ่าน, hash<br> - JSON Web Token: signed, validate<br>- Session Cookies - Express Session<br> - payload <br> - ระบบ Login: สร้างระบบ login ด้วย JWT/cookie, การจัดการ Roles <br> - Identity Server:ความสำคัญ ตัวอย่างการใช้ Keycloak |
| Virtualization vs Containerization (2 วัน) | - VM และ Container : ความเข้าใจพื้นฐาน,ข้อดีข้อเสีย <br> - docker: ความรู้และคำสั่งพื้นฐาน registry,run, ps, volume, exec, network, pull <br> - docker-compose: ลองติดตั้ง webserver, wordpress และโปรแกรมต่างๆ<br> - docker build, push - เอาโปรแกรมที่เขียน ทำเป็น Docker  |
| Testing (2วัน) | - Unit test: ใช้ vitest<br> - Load test: ใช้ k6 <br> - UI Test: ใช้ Playwrite <br>|
| CI/CD (3วัน) |  github action, build/test/deploy script |
| Realworld Web Application (?วัน) | - HTTPS: สร้าง selfsigned certificate ใส่ใน Reverse Proxy<br> - monolith: นำความรู้ที่เรียนมาสร้าง web app, ข้อดี/ข้อเสีย รูปแบบที่เหมาะกับการใช้งาน <br> - microservices: API Gateway(Traefik, APISIX) ข้อดี/ข้อเสีย, รูปแบบที่เหมาะกับการใช้งาน <br> - Message Queue: ใช้ RabbitMQ เพื่อแบ่งโหลดและการสื่อสารใน Microservice <br> - Logs: ใช้ morgan(HTTP request logger middleware) และ winston (log transport)เพื่อให้ได้ log ที่ยืดหยุ่นและเป็นมาตรฐาน - Backup: files, database(pg_dump, mysqldump), tar+gzip|
| Misc (?วัน) | - Object Storage(s3): ข้อดีในการใช้ใช้ s3(MiniO) แทนการเก็บในระบบไฟล์ ,backup to s3<br> - Elasticsearch:  การค้นหา SQL เทียบกับ elasticsearch <br> - หัวข้ออื่นๆตามความเหมาะสม|
 


