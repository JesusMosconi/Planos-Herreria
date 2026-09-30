import { createPrismaClient } from "./prisma";
export function createTestPrismaClient(){ const url=process.env.TEST_DATABASE_URL; if(!url)throw new Error("TEST_DATABASE_URL no está configurada."); return createPrismaClient(url); }
