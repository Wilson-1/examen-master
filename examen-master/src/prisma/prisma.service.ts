import { Injectable, OnModuleInit, INestApplication, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  private static readonly ERROR_SHUTDOWN = 'Error durante el proceso de cierre';

  async onModuleInit(): Promise<void> {
    await this.$connect();

  }

  async enableGracefulShutdown(app: INestApplication): Promise<void> {
    process.on('beforeExit', async () => {
      await this.handleApplicationShutdown(app);
    });
  }

  private async handleApplicationShutdown(app: INestApplication): Promise<void> {
    try {
      await this.$disconnect();
      await app.close();

    } catch (error: unknown) {
      this.logger.error(PrismaService.ERROR_SHUTDOWN, {
        error: error instanceof Error ? error.message : String(error)
      });
      process.exit(1);
    }
  }
}