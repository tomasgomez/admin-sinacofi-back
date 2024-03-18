import { PrismaClient } from '@prisma/client';
import { prisma } from './client';

export class PrismaClientWrapper {
  private client: PrismaClient = prisma;

  constructor() {
  }

  async connect(): Promise<void> {
  }

  async disconnect(): Promise<void> {
  }

  async checkConnection(): Promise<void>{
  }

  async getClient(): PrismaClient {

        return this.client;
    }
}
