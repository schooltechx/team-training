# Web board app
ตัวอย่างการทำ Authentication/Authorization และใช้งาน Prisma ORM พื้นฐาน (TODO: ยังทำไม่เสร็จ)

```
npm init -y
# ติดตั้ง typescript prisma express cors jsonwebtoken ฯลฯ
# ก็อปปี้ src/* มาใส่ในโปรเจ็ก 
cp env.example .env
# สร้าง public/private key แล้วแก้ .env
ssh-keygen -t rsa -b 4096 -m PEM -f secret
openssl rsa -in secret -pubout > secret.pub.pem
npx prisma init --datasource-provider sqlite
# edit prisma/scheme.prisma
npx prisma db push
npx node seed.mjs
npm run dev
```
ตัวอย่างการใช้งาน Prisma ORM
- [เอกสารการใช้งานเบื้องต้น](./orm.md)
- [โค้ดตัวอย่าง test_orm.ts](./test_orm.ts)
- [prisma/schema.prisma](./prisma/schema.prisma) schema ของฐานข้อมูล

# Authentication and Authorization
ใช้ Prisma ORM ร่วมกับ jsonwebtoken เพื่อทำระบบ Authentication/Authorization โค้ดตัวอย่างจะจำลอง API ของระบบ Web board อย่างง่าย มี API จัดการยูสเซอร์ (CRUD, login, role) จัดการโพส
- คำอธิบายดูใน[เอกสารนี้](./auth.md)
- [test.http](./test.http) ติดตั้ง Rest Client(vs code extension) เพื่อใช้ทดสอบระบบ
- [src/auth.ts](./src/auth.ts) โค้ดจัดการ Authentication และ Authorization
- [src/db.ts](./src/db.ts) โค้ดจัดการฐานข้อมูล
- [src/users.ts](./src/users.ts) โค้ดจัดการระบบยูสเซอร์
- [src/posts.ts](./src/posts.ts) การบ้านให้แก้ไขโค้ดนี้เพื่อ พัฒนา API สำหรับจัดการโพส


# Homework
การบ้านให้ทำระบบนี้ให้สมบูรณ์