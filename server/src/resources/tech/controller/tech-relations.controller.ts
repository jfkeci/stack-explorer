import { ApiOperation } from '@nestjs/swagger';
import { TechChildParams } from '../dto/tech-child.params';
import { Controller, Delete, Param, Post } from '@nestjs/common';
import { TechRelationsService } from '../service/tech-relations.service';

@Controller('tech/:techId/relations')
export class TechRelationsController {
  constructor(private readonly techRelationsService: TechRelationsService) {}

  @Post(':childId')
  @ApiOperation({ summary: 'Append a child to a technology' })
  appendChild(@Param() params: TechChildParams) {
    return this.techRelationsService.appendChild(params.techId, params.childId);
  }

  @Delete(':childId')
  @ApiOperation({ summary: 'Remove a child from a technology' })
  removeChild(@Param() params: TechChildParams) {
    return this.techRelationsService.removeChild(params.techId, params.childId);
  }
}
