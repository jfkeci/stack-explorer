import { ApiOperation } from '@nestjs/swagger';
import { TechIdParam } from '../dto/tech-id.param';
import { TechService } from '../service/tech.service';
import { CreateTechDto } from '../dto/create-root.dto';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

@Controller('tech')
export class TechController {
  constructor(private readonly techService: TechService) {}

  @Post('root')
  @ApiOperation({ summary: 'Create a root technology' })
  createRoot(@Body() body: CreateTechDto) {
    return this.techService.createRecord(body);
  }

  @Delete(':techId')
  @ApiOperation({ summary: 'Delete a technology' })
  deleteTech(@Param() param: TechIdParam) {
    return this.techService.deleteRecord(param.techId);
  }
}
