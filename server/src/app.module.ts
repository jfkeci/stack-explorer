import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { envConfig } from './utils/config/env.config';
import { TypeOrmConfigService } from './utils/module/typeorm-config/service/typeorm-config.service';
import { TypeormConfigModule } from './utils/module/typeorm-config/typeorm-config.module';

@Module({
  imports: [
    TypeormConfigModule,
    ConfigModule.forRoot(envConfig()),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
