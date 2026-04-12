import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb({ url: process.env.DATABASE_URL });
    super({ adapter });
  }
}
