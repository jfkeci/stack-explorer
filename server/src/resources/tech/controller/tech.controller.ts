import { ApiOperation } from '@nestjs/swagger';
import { TechIdParam } from '../dto/tech-id.param';
import { TechService } from '../service/tech.service';
import { CreateTechDto } from '../dto/create-tech.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('tech')
export class TechController {
  constructor(private readonly techService: TechService) {}

  @Post()
  @ApiOperation({ summary: 'Create a root technology' })
  createRoot(@Body() body: CreateTechDto) {
    return this.techService.createRecord(body);
  }

  @Delete(':techId')
  @ApiOperation({ summary: 'Delete a technology' })
  deleteTech(@Param() param: TechIdParam) {
    return this.techService.deleteRecord(param.techId);
  }

  @Get(':techId')
  @ApiOperation({ summary: 'Get a technology' })
  getTechStack(@Param() param: TechIdParam) {
    return this.techService.getTechById(param.techId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all technologies' })
  getTech() {
    return this.techService.getTech();
  }
}
