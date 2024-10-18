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
  const usersWithPosts = await prisma.user.findMany({
    include: {
      writtenPosts: true,
      role:true
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