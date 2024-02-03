import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get(ConfigService);
  const appConfig = config.get('app');

  // app.setGlobalPrefix(appConfig.prefix);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(appConfig.port ?? 3200);
}

bootstrap();
