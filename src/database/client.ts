import { PrismaClient } from "@prisma/client";

const client = new PrismaClient({
    log: ['query', 'error'],
})

export default client
