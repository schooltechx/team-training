import { PrismaClient,User,Post,Category} from '@prisma/client'
console.log("DB")
const prisma = new PrismaClient()
export {prisma,User}

