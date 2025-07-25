import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupMiddlewares } from './config/setupMiddlewares';
import { setupCors } from './config/setupCors';
import { setupPipes } from './config/setupPipes';
import { BullQueueProviderModule } from './providers/queue/bull.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  setupMiddlewares(app);
  setupCors(app);
  setupPipes(app);
  const bullQueueProvider = app.get(BullQueueProviderModule);
  bullQueueProvider.configure(app);

  await app.listen(3333);
}
bootstrap();
