# ORM พื้นฐาน
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