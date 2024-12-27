# Keycloak

เป็น Identity Server ใช้ทำ Single Sign On ติดตั้งด้วย [compose.yaml](./compose.yaml)
```
cd keycloak
mkdir data_keycloak
chmod 777 data_keycloak
docker compose up -d
```

- ไปที่หน้าเวป http://localhost:3022 ใช้ยูสเซอร์ admin รหัสผ่าน admin 
- สร้าง realms sso ทดสอบด้วยลิงค์นี้ http://localhost:3022/realms/sso
- สร้าง client ตั้งค่าดังนี้ Client type: OpenID Connect, Client ID:express-client,
![alt text](img/create-client.png)

## express-client
- ตั้งค่าของ express-client เป็น URL ที่ยอมให้ Redirect มาหลังทำการ login, และ เปิด CORS สำหรับโดเมนของ Frontend , localhost:3000(FE Vue.js), keycloak.org(แอปทดสอบของ keycloak), localhost:3001(Client อย่างง่าย)
![alt text](img/setup-client.png)

- สร้าง Role สำหรับ client นี้ไปที่ Clients/express-client/Roles
![alt text](img/client-role.png)


- Optional: ปกติ access token มีค่าเยอะมาก ทำให้ header มีขนาดใหญ่ มีฟีเจอร์หนึ่งที่ทำให้ token มีขนาดเล็กลงไปมาก Client/express-client/Advanced/Always use lightweight access token: On
![access token ขนาดเล็ก](img/lightweight-access-token.png)

ข้อควรระวัง ถ้าเลือกใช้ออปชั่นนี้แทบจะไม่มีค่าไปแสดงใน token เลย ถ้าต้องการ username ไปแสดงตรง Client Scopes/profile/Mappers/username ใน ให้เลือก Add to lightweight access token 

# Role mapping
- Role กำหนดได้สองที่คือใน Realms หรือ Client แนะนำให้ใช้ของ cleint จะได้ไม่ปนกับของ Realms Role ที่มีอยู่เดิม จะใช้ mapper เพื่อนำค่า role ไปแสดงในตำแหน่งที่ต้องการใน token 
  - เลือก Client Scopes/roles/Mappers แล้วกดปุ่ม Add mapper เลือก By configuration
เลือก User Client Role
  - Name: Root Roles(ชื่ออะไรก็ได้)
  - Client ID: express-client
  - Token Clame Name: role
  - Add to lightweight access token: On 
  ![alt text](img/root-roles.png)

- สร้างยูสเซอร์ oom สำหรับ Realms sso 
![สร้างยูสเซอร์](img/create-user.png)

- กำหนดรหัสผ่าน 
ทดสอบการ login ได้ด้วยลิงค์นี้ http://localhost:3022/realms/sso/account
![กำหนดรหัสผ่าน](img/set-password.png)

- กำหนด Role ให้ยูสเซอร์ไปที่ Users/oom/Role mapping/Assign role/Filter by client ค้นหา dev แล้วเลือก Assign
![กำหนด Role](img/assign-role.png)
- ทำอีกครั้งสำหรับ admin จะได้ดังภาพ ควรสร้างอีกยูสเซอร์ที่มี role เป็น dev อย่างเดียวไว้ทดสอบด้วย
![กำหนด admin dev](img/assign-roles.png)

## Login test
- ทดสอบไปที่ https://www.keycloak.org/app/ ใช้ยูสเซอร์ oom เพื่อ login เข้าระบบ

![keycloak test app](img/keycloak_app.png)


- ทดสอบ login ผ่าน api เพื่อเอา access_token
```bash
curl -H 'Content-Type: application/x-www-form-urlencoded' \
  -d "client_id=admin-cli" \
  -d "username=oom" \
  -d "password=oom" \
  -d "grant_type=password" \
  "http://localhost:3022/realms/sso/protocol/openid-connect/token" 
```
- ใช้ REST Client ในไฟล์ [api.http](./api.http) access token จะหมดอายุค่อนข้างเร็ว สามารถกำหนดเวลาได้เองที่  Clients>admin-cli>Advanced>Access Token Lifespan

## Service Account
การเรียกใช้ API ระหว่างเซิร์ฟเวอร์ (machine to machine) จะไม่ใช้ยูสเซอร์ที่ login ได้ในระบบ จะใช้ Service Account แทน

- สำหรับ Backend เรียก API จะใช้ secret ให้สร้าง client เช่นชื่อ b2b-client, Client authentication: On, ปิด Authentication flow ให้หมดเปิดเฉพาะ Service account roles เมื่อสร้างแล้วก็อปค่า Clients/b2b-client/Credentials/Client Secret ไปใช้
จะมียูสเซอร์ service-account-b2b-client เกิดขึ้นมา ให้เพิ่ม role ที่เหมาะสมกับเพื่อใช้งานได้เหมือนยูสเซอร์ปกติ เช่นเพิ่ม manage-realm, manage-users
```
curl -H 'Content-Type: application/x-www-form-urlencoded' \
-d 'client_id=b2b-client' \
-d 'client_secret=n4LacxK00hfHCSKZCvY64IqDhAL0EkL0' \
-d 'grant_type=client_credentials' \
'http://localhost:3022/realms/sso/protocol/openid-connect/token'
```
![Client Authentication](img/client-authentication.png)