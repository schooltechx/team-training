# Keycloak Vue Express
ตัวอย่างการใช้ Keycloak(25.0.0) ร่วมกับ Vue และ Express 

## Frontend 
VUE.js ทำ Authentication จะ Redirect ไป login ที่ keyloak.local , Realms sso, client ชื่อ express-client  
- [KeyclakService.ts](./fe/src/services/KeycloakService.ts) ใช้จัดการ Authentication ทั้งหมดด้วย keycloak-js คอนฟิกอยู่ที่ [keyloak.json](./fe/public/keycloak.json)
- [httpservice.ts](./fe/src/services/HttpService.ts) สำหรับทำ HTTP request ผ่าน axios จะใส่ token ใน header ให้

## Backend
Node.js + Express จะตรวจสอบ token ทำ Authorization ใช้ jsonwebtoken ในการตรวจสอบ
ให้สำเนา [.env.sample](./be/env.sample) ไปเป็น .env แล้วแก้ค่าให้เหมาะสม ควรใช้ค่า REALM_URL เป็นหลัก ส่วน PUBLICKEY ใช้เพื่อการทดสอบเท่านั้น
- [index.ts](./be/src/index.ts) เป็นตัวอย่างการใช้งาน
- [auth.ts](./be/src/auth.ts) เป็น Express Middleware ใช้เพื่อตรวจสอบ Token 
  - initPublicKeyOnline(url) อ่าน Public Key จากเซิร์ฟเวอร์ keycloak แล้วเซ็ตในตัวแปร private ของโมดูล
  - initPublicKey(key) เซ็ต Private key ในตัวแปร private ของโมดูล 
  - verify() ใช้ public key ได้จากที่เซ็ตในตัวแปรแวดล้อม PUBLICKEY หรือขอที่ realms ที่อยู่ในตัวแปร REALM_URL ตรงๆ  keycloak เก็บ public key ที่ "Realms Settings/Keys" ตรง RS256
  - verifyOnline() จะเอา token จาก Frontend ไปตรวจสอบที่ ${REALM_URL}/protocol/openid-connect/userinfo สำหรับการทำงานทั่วไปควรหลีกเลี่ยงวิธีนี้ เพราะเสียเวลาเพิ่ม request ไปและกลับ ทุกๆการ request แต่น่าจะเหมาะกับความปลอดภัยสูงสุดสามารถตรวจสอบ token ที่โดน backlist ก่อนที่จะ refresh ใหม่
  - getDecodeToken(req: Request) ทำ decode โดยไม่ verify ทำจาก req เสมอไม่เก็บเป็นตัวแปรภายในเพื่อกัน Race Condition  ถ้าอยากส่งข้อมูลให้ middleware ถัดไปให้แนะนำให้ดู[ตัวอย่างนี้](https://copyprogramming.com/howto/expressjs-with-typescript-passing-data-between-middlewares) function นี้ใช้วิธีคล้าย Solution 3  ,Note: [res.locals](https://expressjs.com/en/api.html#res.locals) ใช้กับ templates rendered น่าจะไม่เหมาะเท่าไหร่


Note: ใช้ [node-fetch-commonjs](https://www.npmjs.com/package/node-fetch-commonjs) แทน [node-fetch](https://github.com/node-fetch/node-fetch) เพราะว่า TypeScript แปลงเป็น JS แบบ commonjs ที่ node-fetch ไม่รองรับ และไม่ใช้ [request](https://www.npmjs.com/package/request) เพราะ deplicate ไปแล้ว(หลายตัวอย่างใช้กัน)

## Setup frontend
สร้างโปรเจ็ก Vite+Vue ชื่อ fe
```bash
npm create vite@latest
cd fe
npm install
npm i keycloak-js@22.0.3 axios
npm run dev
```

## Setup Backend
```bash
cd be
npm init -y
npm i express nodemon jsonwebtoken node-fetch-commonjs dotenv
npm i -D typescript @types/node @types/express ts-node @types/jsonwebtoken
```

ิอ่านเพิ่ม
- [Keycloak - A gentle introduction to Keycloak using Vite+React, NodeJS](https://www.youtube.com/watch?v=5z6gy4WGnUs)
- [Secure Vue.js app with Keycloak](https://medium.com/keycloak/secure-vue-js-app-with-keycloak-94814181e344)
- [JWT Authorization and Authentication, Node, Express, and Vue](https://dev.to/kevin_odongo35/jwt-authorization-and-authentication-node-express-and-vue-2p8c)
- [Integrate Passport.js to Node, Express, and Vue](https://dev.to/kevin_odongo35/integrate-passport-js-to-node-express-and-vue-19ao)
- [Secure Frontend (React.js) and Backend (Node.js/Express Rest API) with Keycloak](https://medium.com/devops-dudes/secure-front-end-react-js-and-back-end-node-js-express-rest-api-with-keycloak-daf159f0a94e)
เป็นวิธีแบบเก่าไม่แน่ใจว่าทำไมต้องใช้ express-session (validate ด้วย jsonwebtoken จาก public key น่าจะพอแล้ว จะได้ stateless ด้วย)

- [Passing data between middlewares in ExpressJs using TypeScript - a](https://copyprogramming.com/howto/expressjs-with-typescript-passing-data-between-middlewares)