import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as mariadb from 'mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // const port: number = process.env.DB_PORT;
    // const pool = mariadb.createPool({
    //   host: process.env.DB_HOST,
    //   port: Number(process.env.DB_PORT),
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    // });
    // host: '127.0.0.1',
    // port: 3306,
    // user: 'samuel',
    // password: 'temitayo8364',
    // database: 'task',
    // });
    const connectionString = 'mysql://samuel:temitayo8364@127.0.0.1:3306/task';
    const adapter = new PrismaMariaDb(connectionString);
    super({ adapter });
  }

  async onModuleInit() {
    console.log('Connecting to the database...');
    await this.$connect();
  }
}
