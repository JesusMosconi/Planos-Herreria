import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
const globalDb=globalThis as unknown as { prisma?: PrismaClient };
export function createPrismaClient(connectionString=process.env.DATABASE_URL):PrismaClient { if(!connectionString)throw new Error("DATABASE_URL no está configurada."); return new PrismaClient({adapter:new PrismaNeon({connectionString})}); }
export function getPrisma():PrismaClient { const client=globalDb.prisma??createPrismaClient(); if(process.env.NODE_ENV!=="production")globalDb.prisma=client; return client; }
