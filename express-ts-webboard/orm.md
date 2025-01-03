# ORM
ตัวอย่างการทำ ORM บน node.js ด้วย Prisma ที่เลือกใช้ Prisma เพราะเรียนรู้ได้ง่ายประสิทธิ์ภาพสูง

# เริ่มโปรเจ็ก
ติดตั้งโปรเจ็ก node แบบ typescript prisma 

หลังจากรันคำสั่ง prisma init จะได้ .env และ prisma/schema.prisma (แก้ไขตามด้านล่างนี้)

เมื่อรันคำสั่ง "npx prisma migrate" จะเกิดโฟลเดอร์ prisma/migrations ด้านในจะมีสคริปต์ SQL เกิดขึ้นโดยอาศัยข้อมูลจาก schema.prisma

สร้างไฟล์ test_orm.ts (แก้ไขตามด้านล่างนี้) ให้ใช้ ts-node เพื่อทดสอบ โปรแกรมทดสอบเอามาจาก [Get Start](https://www.prisma.io/docs/getting-started/quickstart) ของ Prisma ควรติดตั้ง Prisma Extension ใน VS Code ด้วย

```sh
mkdir express-ts-prisma
cd express-ts
npm init -y
npm i @prisma/client dotenv express
npm i -D @types/node @types/express nodemon ts-node typescript prisma
code .
npx prisma init --datasource-provider sqlite 
# แก้ไข .env, prisma/shema.prisma
code prisma/schema.prisma
npx prisma migrate dev --name init # prisma/migrations/*
code test_orm.ts
npx ts-node test_orm.ts # change email for run again
npx prisma studio # manage database
npx prisma migrate reset # reset database and migrate again
npx ts-node test_orm # run program
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
ทดสอบโปรแกรมโดยการเขียน script ใน package.json 
```
"test_orm": "nodemon test_orm.ts",
```
โค้ดรันได้แค่ครั้งเดียวเพราะ email จะซ้ำกันไม่ได้ ให้แก้ค่า แล้ว nodemon จะรันซ้ำได้ไม่มีปัญหาหรือล้างฐานข้อมูลด้วยคำสั่ง "npx prisma migrate reset"

```ts
prisma.user.create({data: OBJECT})
prisma.user.createMany({data:[OBJECT1,OBJECT2]})
prisma.user.deleteMany()
prisma.user.findUnique({where:{email:"oom@xxx.com"}})
prisma.user.findFirst({where:{name:"Oom,age:{gt:20}"}})
prisma.user.findMany({where:{name:notIn:["oom","mam"]})
prisma.user.update({where: {email:"oom@xxx.com"},data{age:increment:1}})

```



ตัวอย่างเริ่มต้นจะใช้ ORM กับ SQLite ไฟล์ schema.prisma มีโมเดลของข้อมูลที่ถูกแปลงไปเห็น คำสั่ง SQL ที่จะไว้แก้ไขฐานข้อมูล โปรแกรมจะใช้ PrismaClient เพื่อติดต่อฐานข้อมูล 
สามารถใช้ prisma studio เพื่อจัดการข้อมูล

## เปลี่ยนฐานข้อมูล
ให้ลบฐานข้อมูลเดิมออก ลบ prisma/migrations ออก แก้ .env ให้เป็นฐานข้อมูลที่ต้องการ แล้ว Migrate ใหม่


.env
```sh
DATABASE_URL="file.db"
DATABASE_URL="postgres://YourUserName:YourPassword@localhost:5432/prisma"
```


## Relation 
- One to Many : User & writtenPosts,User & favoritePosts
- Many to Many Post & Category
- One to One : User & UserPerference

@@ จะเป็นการตั้งค่าใน model นี้ เช่น 
- @@id([age,name]) จะเป็น key ของตาราง
- @@index([email]) สร้าง Index สำหรับการค้นหา

prisma/schema.prisma 
```
...
model User {
  id             Int             @id @default(autoincrement())
  age            Int
  email          String          @unique
  name           String
  writtenPosts   Post[]          @relation("WrittenPosts")
  favoritePosts  Post[]          @relation("FavoritePosts")
  userPreference UserPerference?
  @@index([email])
}

model UserPerference {
  id           Int     @id @default(autoincrement())
  emailUpdates Boolean
  user         User    @relation(fields: [userId], references: [id])
  userId       Int     @unique
}

model Post {
  id           Int        @id @default(autoincrement())
  title        String
  content      String?
  published    Boolean    @default(false)
  author       User       @relation("WrittenPosts", fields: [authorId], references: [id])
  authorId     Int
  favoriteBy   User?      @relation("FavoritePosts", fields: [favoriteById], references: [id])
  favoriteById Int?
  category     Category[]
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}
```


# Debug
```
const prisma = new PrismaClient({log:["query"]})
```

## อ่านต่อ
[Learn Prisma In 60 Minutes](https://www.youtube.com/watch?v=RebA5J-rlwg)



Authentication
```sh
npm i jsonwebtoken
npm i --save-dev @types/jsonwebtoken
ssh-keygen -t rsa -b 4096 -m PEM -f jwt.key -N ""
openssl rsa -in jwt.key -pubout -outform PEM -out jwt.key.pub
```


