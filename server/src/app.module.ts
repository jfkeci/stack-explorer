import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig } from './utils/config/env.config';
import { TypeOrmConfigService } from './utils/module/typeorm-config/service/typeorm-config.service';
import { TypeormConfigModule } from './utils/module/typeorm-config/typeorm-config.module';

@Module({
  imports: [
    TypeormConfigModule,
    ConfigModule.forRoot(envConfig()),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
