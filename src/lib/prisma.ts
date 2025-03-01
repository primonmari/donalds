// SMP TENHO UMA CONEXÃO ABERTA COM O BD, SEMPRE QUE SALVA O ARQUIVO O SERVIDOR REINICIA, AI CRIA NOVA CONEXÃO E ESTOURA O BD
// SE ESTIVER EM DESENVOLVIMENTO CRIO UMA VERSÃO CACHEADA DO PRISMA

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;

}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

// Chamo o Banco de Dados
export const db = prisma;
