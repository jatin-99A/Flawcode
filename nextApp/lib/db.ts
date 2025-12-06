import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'


const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = globalThis.prisma || new PrismaClient({
    adapter,
})


process.env.NODE_ENV !== 'production' && (globalThis.prisma = prisma)

export default prisma