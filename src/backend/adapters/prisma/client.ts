import { PrismaClient } from '@prisma/client';

export class PrismaClientWrapper {
  private client: PrismaClient;

  constructor() {
    console.log("CONSTRUCTOR");
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    if (!this.client.isConnected()) {
      await this.client.$connect(); // Connect if not already connected
    }
  }

  async disconnect(): Promise<void> {
    if (this.client.isConnected()) {
      await this.client.$disconnect(); // Disconnect if connected
    }
  }

  async checkConnection(): Promise<boolean> {
    return this.client.isConnected();
  }

  async getClient(): PrismaClient {
        console.log('Connecting client...');
        await this.connect();

        console.log('Client connected');

        return this.client;
    }
}
