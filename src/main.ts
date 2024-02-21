import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';
import { ValidationPipe } from './user/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
