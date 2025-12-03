# Keycloak
หน้านี้สอนการใช้งาน Keycloak เบื้องต้น จะใช้เป็น
Identity Server เพื่อทำ Single Sign On ในการพัฒนาซอฟต์แวร์
ติดตั้งด้วย [compose.yaml](./compose.yaml)
มีการปรับปรุ่งเอกสารให้รองรับรุ่น 26.x.x ซึ่ง UI อาจจะแตกต่างกับรุ่นต่ำลงมาบ้าง (2x.x.x)

## Note
[26 Release Note](https://www.keycloak.org/2024/10/keycloak-2600-released) 
- UI บางส่วนแตกต่าง
- security-admin-console และ admin-cli จะใช้ lightweight access tokens เป็นค่าตั้งต้น
## เริ่มใช้งาน
- ไปที่หน้าเวป http://localhost:3022 ใช้ยูสเซอร์ admin รหัสผ่าน admin ตามที่ตั้งไว้ใน [compose.yaml](./compose.yaml)
- สร้าง realms sso ทดสอบด้วยลิงค์นี้ http://localhost:3022/realms/sso
- สร้าง client ตั้งค่าดังนี้ Client type: **OpenID Connect**, Client ID: **express-client**

![alt text](img/create-client.png)

## express-client
- ตั้งค่า Valid redirect URIs กับ Web origins ของ express-client จะเป็นการ  ที่ยอมให้ Redirect มาหลังทำการ login, และ เปิด CORS สำหรับ Frontend  
- keycloak.org(แอปทดสอบของ keycloak)
- localhost:3000 Frontend Vue.js(fe)
- localhost:3001 อาจจะใช้พอร์ตอื่นตามเหมาะสมสำหรับโปรแกรมอื่นในการทดสอบ
![alt text](img/setup-client.png)

- สร้าง Role สำหรับ client ไปที่ Clients/express-client/Roles
![alt text](img/client-role.png)

- ที่แทป Advanced เปิดใช้ Always Use lightweight access token แล้วกด Save โดยปกติ access token ของ keycloak มีข้อมูลเยอะมาก ทำให้ header มีขนาดใหญ่ เมื่อเปิดฟีเจอร์นี้ใช้ทำให้ token มีขนาดเล็กลง จะแสดงข้อมูลเท่าที่กำหนด 

![access token ขนาดเล็ก](img/lightweight-access-token.png)

ข้อควรระวัง หลังจากเปิดใช้จะไม่มีค่าไปแสดงใน token ให้เลือกเฉพาะค่าที่ต้องให้อยู่ใน Token ทำได้สองแบบ
- ถ้าต้องการให้แสดงทุก client ไปที่ Client Scopes/email/Mappers แล้วเลือกค่าที่ต้องการแสดง
- ถ้าต้องการให้แสดงแค่ client นั้นๆ ไปที่ Clients/express-client/Client scopes/express-client-dedicated/Add Mapper/From predifined mappers 

เลือก Always use lightweight เป็น On

## Login test
- สร้างยูสเซอร์ oom สำหรับ Realms sso 
![สร้างยูสเซอร์](img/create-user.png)
- กำหนดรหัสผ่าน ที่แทป Credentials
- ทดสอบการ login ได้ด้วยลิงค์นี้ http://localhost:3022/realms/sso/account
![กำหนดรหัสผ่าน](img/set-password.png)

- เปิด Browser คนละ Session ทดสอบไปที่ https://www.keycloak.org/app/ ใช้ยูสเซอร์ oom เพื่อ login เข้าระบบ

![keycloak test app](img/keycloak_app.png)

ถ้าขั้นตอนนี้ผ่านก็แสดงว่าใช้งานได้แล้ว จุดที่มักผิดคือไม่ได้ตั้งค่า Valid redirect URIs กับ Web origins อาจจะพิมพ์ผิดหรือใช้ 127.0.0.1 แทน localhost

# Role mapping
Role-based access control (RBAC)
จะเป็นการกำหนด Role ให้แต่ละยูสเซอร์ซึ่งจะอยู่ใน Token ตอน Authorization สามารถกำหนดได้สองที่คือใน Realms หรือ Client แนะนำให้ใช้ของ client จะได้แยกในแต่ละโปรแกรมได้ ไม่ปนกับของ Realms Role ค่าเดิมจะอยู่ในโครงสร้าง 
```

{
  ...
  "resource_access": {
    "express-client": {
      "roles": [
        "dev",
        "admin"
      ]
    },
  ...
  }
}
```
ในโปรแกรมทั่วไปอยากได้รูปแบบนี้มากกว่า
```
{
  ...
  role:["admin","dev"]
}
```

 เราจะทำการ Mapping ใหม่ให้อยู่ในรูปแบบตื้นกว่าเดิม (อยู่ที่ root)
- เลือก Client/express-client/Client scopes/express-client-dedicated แล้วกดปุ่ม Add mapper เลือก By configuration
เลือก User Client Role
- Name: Root Roles(ชื่ออะไรก็ได้)
- Client ID: express-client
- Token Clame Name: role
- Add to lightweight access token: On 
![alt text](img/root-roles.png)

- กำหนด Role ให้ยูสเซอร์ไปที่ Users/oom/Role mapping/Assign role/Filter by client ค้นหา dev แล้วเลือก Assign
![กำหนด Role](img/assign-role.png)
- ทำอีกครั้งสำหรับ admin จะได้ดังภาพ ควรสร้างอีกยูสเซอร์ที่มี role เป็น dev อย่างเดียวไว้ทดสอบด้วย
![กำหนด admin dev](img/assign-roles.png)

- ทดสอบ login ผ่าน api เพื่อเอา access_token ทุก Realms จะมี admin-cli สำหรับบริการจัดการ admin-cli ในรุ่น 26.x.x  จะเป็น lightweight access tokens เสมอ แทบจะไม่เห็นค่าอะไรใน Token
Always use lightweight access token
```bash
curl -H 'Content-Type: application/x-www-form-urlencoded' \
  -d "client_id=admin-cli" \
  -d "username=oom" \
  -d "password=oom" \
  -d "grant_type=password" \
  "http://localhost:3022/realms/sso/protocol/openid-connect/token"
```
จะได้ access_token, refresh_token กลับมา
```json
{
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJGd3JHRGVnUjFFd1Nwd2Znc1lzVlhEUTlNME9OTzBhT002WWpXMzRsb2hVIn0.eyJleHAiOjE3NjQ1NzU5MzYsImlhdCI6MTc2NDU3NTYzNiwianRpIjoib25sdHJvOjQ1YzE1ZDM0LTUwMmQtMTkyMC1mMzIxLTMzZTM3MWJlNjEzOSIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAyMi9yZWFsbXMvc3NvIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tY2xpIiwic2lkIjoiM2FlNDVkOGYtNTgzNC1mNDYxLTgxNjQtMmQxZGRhY2Y0YTVkIiwic2NvcGUiOiJlbWFpbCBwcm9maWxlIn0.Y6CqlYlm1VjMlti3sweLo3N7plXfdgQh7olNLGLyDHqNmDm46O4mtJ65IXbEgQDkThE12Klm4D5iRrTkRWlg2ihh71rkDMBHjPVVE_KcmEij_MeSgCDCW6bSlKmQijwhladoZvUjmnI-hWe_r4IjNI3A3WmfTqWMhNLw6CGHgC5pkNjQ5YaRzX7yUNpPFbaQR-cLaJjb06PeFmwvaHnuNo4ddP--smBzisFPVBI5NzWZ7IRGAgX0fwaGoXnw2ymqr4R-NrACLZPlA6mKKB4efIghavAQkpmFFKRaHDzP5cbQEa5wejzlMLlN7bhrnJbpAr--M3qpVWAAkAeJiwbI8A",
    "expires_in": 300,
    "refresh_expires_in": 1800,
    "refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwYzVhMmJiNS1mYTA3LTQ3NmMtODhjMi1lM2Y4NjE0ZWU5ODcifQ.eyJleHAiOjE3NjQ1Nzc0MzYsImlhdCI6MTc2NDU3NTYzNiwianRpIjoiMTc3ZGY2ODMtMjgyOS0wNWI1LWM3YTQtODRmMjI1OGMwMTQ4IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDIyL3JlYWxtcy9zc28iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMjIvcmVhbG1zL3NzbyIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJhZG1pbi1jbGkiLCJzaWQiOiIzYWU0NWQ4Zi01ODM0LWY0NjEtODE2NC0yZDFkZGFjZjRhNWQiLCJzY29wZSI6IndlYi1vcmlnaW5zIGVtYWlsIHJvbGVzIHByb2ZpbGUgYWNyIGJhc2ljIn0.HqycIGz0EzPNw0Ddk7P0GaVn4PIgeMTGGHZGMzYcKvi0B-RkDkykRUvApH1UsAdxHHizqEYXb7ckN0mXMgq37Q",
    "token_type": "Bearer",
    "not-before-policy": 0,
    "session_state": "3ae45d8f-5834-f461-8164-2d1ddacf4a5d",
    "scope": "email profile"
}
```
ถ้าเอาไป decode ในเวป jwt.io จะได้
```
{
  "exp": 1764575936,
  "iat": 1764575636,
  "jti": "onltro:45c15d34-502d-1920-f321-33e371be6139",
  "iss": "http://localhost:3022/realms/sso",
  "typ": "Bearer",
  "azp": "admin-cli",
  "sid": "3ae45d8f-5834-f461-8164-2d1ddacf4a5d",
  "scope": "email profile"
}
```

 ถ้าใช้กับ express-client ต้องตั้งค่าก่อน
 ไปที่ Client/express-client/Settings ที่หัวข้อ ***Authentication flow*** เลือกเป็น เป็น ***Direct access grants*** แล้วกด Save เรียกคำสั่งด้านล่างแล้วไป decode ด้วย jwt.io

```bash
curl -H 'Content-Type: application/x-www-form-urlencoded' \
  -d "client_id=express-client" \
  -d "username=oom" \
  -d "password=oom" \
  -d "grant_type=password" \
  "http://localhost:3022/realms/sso/protocol/openid-connect/token"
```

ใช้ REST Client ในไฟล์ [api.http](./api.http) จะมีการทดสอบเรียก API ให้หลายแบบ
access token จะหมดอายุค่อนข้างเร็ว สามารถกำหนดเวลาได้เองที่  Clients>admin-cli>Advanced>Access Token Lifespan

## Service Account
การเรียกใช้ API ระหว่างเซิร์ฟเวอร์ (machine to machine) จะไม่ใช้ยูสเซอร์ที่ login ได้ในระบบ จะใช้ Service Account แทน

สำหรับ Backend เรียก API จะ Authentication โดยใช้ secret ให้สร้าง client เช่นชื่อ b2b-client ตั้งค่า Client authentication: On, ปิด Authentication flow ให้หมดเปิดเฉพาะ Service account roles 

![Client Authentication](img/client-authentication.png)

เมื่อสร้างเสร็จแล้วก็อปค่า Clients/b2b-client/Credentials/Client Secret ไปใช้
จะมียูสเซอร์ service-account-b2b-client เกิดขึ้นมา ให้เพิ่ม role ที่เหมาะสมกับเพื่อใช้งานได้เหมือนยูสเซอร์ปกติ เช่นเพิ่ม manage-realm, manage-users
```
curl -H 'Content-Type: application/x-www-form-urlencoded' \
-d 'client_id=b2b-client' \
-d 'client_secret=n4LacxK00hfHCSKZCvY64IqDhAL0EkL0' \
-d 'grant_type=client_credentials' \
'http://localhost:3022/realms/sso/protocol/openid-connect/token'
```

## Authentication Library
Keyclak มี Library สำหรับ JavaScript ให้คือ
- Frontend keycloak-js ตัวอย่างดู [keycloak.html](../be/static/keycloak.html), [keycloak.json](../be/static/keycloak.json)
- Keycloak Adapter ใช้สำหรับ Backend

สำหรับ Backend สามารถใช้ jsonwebtoken ในการทำได้ดูในตัวอย่าง [be](../be/)


### Example App oidc-client-ts.html
โปรแกรมนี้จะใช้ [oidc-client-ts](https://github.com/authts/oidc-client-ts) 
เป็น client-side ไลบารีรองรับ OpenID Connect (OIDC) และ โปรโตคอล OAuth2 เพื่อใช้จัดการ user session และ access token อย่าลืมตั้งค่า Redirect URIs และ Web Origin ให้ถูกต้อง
- โค้ดตัวอย่างดูใน [public/oidc-client-ts.html](./public/oidc-client-ts.html) แก้ใน OIDC Configuration ให้ถูกต้องก่อนใช้งาน รันบน Web Server ปกติหรือ LiveServer ก็ได้
- ลองทดสอบแล้วกับ [keycloak:26.4.6](https://quay.io/repository/keycloak/keycloak?tab=tags) น่าใช้แทน keycloak-js ได้เลยจะได้รองรับ Identitiy Server อื่นๆได้ (ยังไม่ได้ทดลอง)
- Keycloak จำเป็นต้องตั้งค่า id_token_hint ตอน logout ด้วย
- wrapper สำหรับ frontend framework ต่างๆ 
[vue3-oidc](https://github.com/zhazhazhu/vue3-oidc), [react-oidc-context](https://github.com/authts/react-oidc-context)

![oidc-client-ts](img/oidc-client-ts-demo.png)

### Auth.js
[Auth.js](https://authjs.dev/)
เป็นตัวที่นิยมกันมาก 
รองรับ Provider หลายตัว เช่น
[Keycloak](https://authjs.dev/getting-started/providers/keycloak) รองรับ Storage Adapter หลายตัว

รองรับ Framework อย่าง 
- Official: 
[Next.js](https://authjs.dev/reference/nextjs),
[SvelteKit(experiment)](https://authjs.dev/reference/sveltekit),
[Express(experiment)](https://authjs.dev/reference/express)
Qwik 
- Nuxt [@hebilicious/authjs-nuxt](https://nuxt.com/modules/authjs), [@sidebase/nuxt-auth](https://nuxt.com/modules/sidebase-auth) 

แต่กำลังอยู่ในระหว่างการ[ย้าย](https://authjs.dev/getting-started/migrate-to-better-auth)
ไป [Better Auth](https://www.better-auth.com/) 
อาจจะต้องมาดูกันอีกทีว่าทิศทางจะไปทางไหน

### better-auth
[better-auth](https://www.better-auth.com/docs) 
น่าจะย้ายมาใช้จะเป็นตัวจบเลยเพราะรองรับมากมายหลายแบบ 
(Authentication, Databases, Adapters, Integrations, Plugins)
ไม่ได้รองรับ Keycloak ตรงๆ แต่น่าจะใช้จากหัวข้อ [Other Social Providers](https://www.better-auth.com/docs/authentication/other-social-providers) ได้

เท่าที่อ่านเอามาแทน Keycloak ได้ด้วย [OIDC Provider](https://www.better-auth.com/docs/plugins/oidc-provider) แต่ยังอยู่ในขั้นทดลอง