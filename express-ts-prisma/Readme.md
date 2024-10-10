# ORM
ตัวอย่างการทำ ORM บน node.js ด้วย Prisma ที่เลือกใช้ Prisma เพราะเรียนรู้ได้ง่ายประสิทธิ์ภาพสูง


# เริ่มโปรเจ็ก
ติดตั้งโปรเจ็ก node แบบ typescript express prisma 

หลังจากรันคำสั่ง prisma init จะได้ .env และ prisma/schema.prisma (แก้ไขตามด้านล่างนี้)

เมื่อรันคำสั่ง "npx prisma migrate" จะเกิดโฟลเดอร์ prisma/migrations ด้านในจะมีสคริปต์ SQL เกิดขึ้นโดยอาศัยข้อมูลจาก schema.prisma

สร้างไฟล์ test_orm.ts (แก้ไขตามด้านล่างนี้) ให้ใช้ ts-node เพื่อทดสอบ โปรแกรมทดสอบเอามาจาก [Get Start](https://www.prisma.io/docs/getting-started/quickstart) ของ Prisma

```sh
mkdir express-ts-prisma
cd express-ts
npm init -y
npm i dotenv express cors @prisma/client
npm i -D @types/express @types/node @types/cors nodemon ts-node typescript prisma
code .
npx prisma init --datasource-provider sqlite #.env, prisma/shema.prisma
code prisma/schema.prisma
npx prisma migrate dev --name init # prisma/migrations/*
code test_orm.ts
npx ts-node test_orm.ts # change email for run again
npx prisma studio # manage database
```

prisma/schema.prisma (เพิ่มหรือต่อท้ายของไฟล์เดิม)
```
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```
test_orm.ts โปรแกรมทดสอบสร้างข้อมูลแล้ว console.log ออกมา
```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob2@prisma.io',
      posts: {
        create: [
          {
            title: 'Hello World',
            published: true
          },
          {
            title: 'My second post',
            content: 'This is still a draft'
          }
        ],
      },
    },
  })
  console.log(user)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```
ตัวอย่างเริ่มต้นจะใช้ ORM กับ SQLite ไฟล์ schema.prisma มีโมเดลของข้อมูลที่ถูกแปลงไปเห็น คำสั่ง SQL ที่จะไว้แก้ไขฐานข้อมูล โปรแกรมจะใช้ PrismaClient เพื่อติดต่อฐานข้อมูล 
สามารถใช้ prisma studio เพื่อจัดการข้อมูล

## เปลี่ยนฐานข้อมูล
ให้ลบฐานข้อมูลเดิมออก ลบ prisma/migrations ออก แก้ .env ให้เป็นฐานข้อมูลที่ต้องการ แล้ว Migrate ใหม่


.env
```
DATABASE_URL="file.db"
DATABASE_URL="postgres://YourUserName:YourPassword@localhost:5432/prisma"
```
