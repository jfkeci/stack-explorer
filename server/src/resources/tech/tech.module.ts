import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechEntity } from './entity/tech.entity';
import { TechService } from './service/tech.service';
import { TechController } from './controller/tech.controller';
import { TechUtilsService } from './service/tech-utils.service';
import { TechRelationsService } from './service/tech-relations.service';
import { TechRelationsController } from './controller/tech-relations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TechEntity])],
  providers: [TechService, TechUtilsService, TechRelationsService],
  controllers: [TechController, TechRelationsController],
  exports: [TechService],
})
export class TechModule {}
