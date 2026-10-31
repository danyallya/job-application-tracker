import 'server-only';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as typeof globalThis & {
  folioPrisma?: PrismaClient;
};

export const prisma = globalForPrisma.folioPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.folioPrisma = prisma;
}
