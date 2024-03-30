import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

if (import.meta.env.PROD) {
  (async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
  })();
}

export const viteNodeApp = NestFactory.create(AppModule);
