import { Module, OnModuleInit } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bullmq';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    ConfigModule,
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST'),
          port: Number(config.get('REDIS_PORT')),
          password: config.get('REDIS_PASSWORD'),
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'mail',
    }),
  ],
  exports: [BullModule],
})
export class BullQueueProviderModule implements OnModuleInit {
  private readonly serverAdapter = new ExpressAdapter();

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const mailQueue = new Queue('mail', {
      connection: {
        host: this.configService.get('REDIS_HOST'),
        port: Number(this.configService.get('REDIS_PORT')),
        password: this.configService.get('REDIS_PASSWORD'),
      },
    });

    createBullBoard({
      queues: [new BullMQAdapter(mailQueue)],
      serverAdapter: this.serverAdapter,
    });

    this.serverAdapter.setBasePath('/admin/queues');
  }

  configure(app: any) {
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.use('/admin/queues', this.serverAdapter.getRouter());
  }
}