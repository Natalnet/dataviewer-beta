import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log(`ENV: ${process.env.DATABASE_HOST}`)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);
}
bootstrap();
