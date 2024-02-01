import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get(ConfigService);
  const prefix = config.get<string>('app.prefix');
  const port = config.get<number>('app.port');

  app.setGlobalPrefix(prefix);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(port);
}

bootstrap();
