# TypeORM กับ tsoa
ตัวอย่างการใช้ Express, TypeORM และ tsoa จะมี pattern repository,MVC, DTO

TypeORM และ tsoa ใช้แยกกันได้ สำหรับตัวอย่างใช้ TypeORM ขึ้น controller ให้ tsoa ใช้
- TypeORM ใช้กับฐานข้อมูลได้หลายแบบเปลี่ยนที่ [data-source.ts](./src/data-source.ts)
- tsoa สร้าง swagger spec จาก controller ที่ใส่ decorator ทำจากคำสั่ง "tsoa spec" ทำการเขียน Controller ใหม่ให้เหมาะสม แยก Middleware มาอยู่ใน route แล้วเรียกใช้ Controller อีกที
- ทำ DTO เพิ่มเอง ดูในตัวอย่างใน [Entiry/User.ts](./src/entity/User.ts)
- Route เอาที่ TypeORM สร้างตอน init โปรเจ็กออก แทนด้วยฟังก์ชั่น RegisterRoutes(app) มีวิธีการจัดการสองแบบ
  - ถ้าจัดการเองดู [myroutes.ts](./src/myroutes.ts) ก็เป็น Middleware แบบปกติ
  - tsoa ทำให้ สร้างจากคำสั่ง "tsoa spec-and-routes" จะได้ไฟล์ [routes.ts](./src/routes.ts) ถ้ามีการทำ DTO จะทำ Validate ให้ด้วย จะ throw ValidateError ให้ดูใน [index.ts](./src/index.ts) การจะใช้ [ Authenticaton middleware รูปแบบของ tsoa](https://tsoa-community.github.io/docs/authentication.html)

## Install

เอาตัวอย่างมาจาก[ในเวป typeorm](https://typeorm.io/#installation) 

```bash
# ติดตั้งแบบรวดเร็วเซ็ตค่าให้หมด
npx typeorm init --name myProject --database sqlite --express --docker
```
โมเดลที่สร้างขึ้นมากเฉพาะที่เป็น Entity ถึงจะเป็นตารางในฐานข้อมูล


## ดูเพิ่ม
- [How to add a Swagger UI to a TS ExpressJS App using Tsoa](https://medium.com/@gavinhaynes_58103/how-to-add-a-swagger-ui-to-a-ts-expressjs-app-using-tsoa-573a2235083)
- [Implement Swagger and tsoa to an existing Node application using webpack and pm2](https://ahmedbejaoui.medium.com/implement-swagger-and-tsoa-to-an-existing-node-application-using-webpack-and-pm2-12512d32a504)
- [ตัวอย่างโค้ด Express ร่วมกับ TypeOrm](https://orkhan.gitbook.io/typeorm/docs/example-with-express)
- [Validation](https://orkhan.gitbook.io/typeorm/docs/validation)

## Nest.js
มีความนิยมเกือบเท่า Express แล้ว โปรเจ็กที่เริ่มซับซ้อนมากมีการใช้ Design Pattern, ORM,  Validate, Swagger ฯลฯ ต้องทำเอง(manual)ค่อนข้างเยอะ น่าจะลองพิจารณาการย้ายมาใช้ Nest.js แทน Express อาจจะเหมาะสมกว่า ไม่ต้องเสียเวลาในการรวมเครื่องมือต่างๆเข้าด้วยกัน แต่ยังมีเรื่องการใช้ Keycloak ที่ยังไม่มั่นใจว่าจะมีปัญหาหรือเปล่า
- [Nest.js Crash Course](https://www.youtube.com/watch?v=pcX97ZrTE6M&list=PL4cUxeGkcC9g8YFseGdkyj9RH9kVs_cMr&index=1)

- [Secure NestJs Rest API with Keycloak](https://medium.com/devops-dudes/secure-nestjs-rest-api-with-keycloak-745ef32a2370)

- [NestJS JWT Authentication with Refresh Tokens Complete Guide](https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token)

- [Nest.JS Authentication](https://docs.nestjs.com/security/authentication)