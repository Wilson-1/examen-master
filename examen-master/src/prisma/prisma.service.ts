import { Injectable, OnModuleInit, INestApplication, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// SOLUCIÓN AL ERROR DE IMPORTACIÓN:
// Salimos de 'src' y de 'prisma' (service) para ir a la raíz y entrar a la carpeta generada
// Ajusta los '../' según la profundidad de tu archivo service.
import { PrismaClient } from '../../prisma/generated/prisma/client'; 

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  private static readonly ERROR_SHUTDOWN = 'Error durante el proceso de cierre';

  constructor() {
    // --- LÓGICA OBLIGATORIA PRISMA 7 ---
    
    // Nota: Aunque uses prisma.config.ts para la CLI, la APP de NestJS
    // necesita leer la variable de entorno aquí para conectarse en tiempo real.
    const connectionString = process.env.DATABASE_URL; 

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg({ pool });

    // Pasamos el adaptador al padre
    super({ adapter });
  }

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