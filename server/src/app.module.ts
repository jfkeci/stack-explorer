import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig } from './utils/config/env.config';
import { TechModule } from './resources/tech/tech.module';
import { LoggerMiddleware } from './utils/middleware/logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeormConfigModule } from './utils/module/typeorm-config/typeorm-config.module';
import { TypeOrmConfigService } from './utils/module/typeorm-config/service/typeorm-config.service';

@Module({
  imports: [
    TechModule,
    TypeormConfigModule,
    ConfigModule.forRoot(envConfig()),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
