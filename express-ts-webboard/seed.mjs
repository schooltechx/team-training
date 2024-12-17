import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({log:["query"]})

async function main() {
  //await prisma.user.deleteMany()
  // const user = await prisma.user.create({
  //   data: {
  //     name: 'Bob',
  //     age:20, 
  //     email: 'bob5@prisma.io'
  //   },
  // })
  const username="oom",password="oom",email="oom@xxx.com",role="admin,editor"
  const auser = await prisma.user.findFirst({
    where: { username },
    select: {username:true,email:true,role:true}})
  if(!auser){
    await prisma.user.create({data:{username,password,email,role}})
  }
  const usersWithPosts = await prisma.user.findMany({
    select: {username:true,email:true,password:true,role:true,
      writtenPosts: true,
      favoritePosts:true,
      userPreference:true,
    }
  })
  console.dir(usersWithPosts, { depth: null })
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