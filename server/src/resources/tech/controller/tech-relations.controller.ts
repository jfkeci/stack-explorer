import { ApiOperation } from '@nestjs/swagger';
import { TechChildParams } from '../dto/tech-child.params';
import { TechParentParams } from '../dto/tech-parent.params';
import { Controller, Delete, Param, Post } from '@nestjs/common';
import { TechRelationsService } from '../service/tech-relations.service';

@Controller('tech/:techId/relations')
export class TechRelationsController {
  constructor(private readonly techRelationsService: TechRelationsService) {}

  @Post('/children/:childId')
  @ApiOperation({ summary: 'Append a child to a technology' })
  appendChild(@Param() params: TechChildParams) {
    return this.techRelationsService.appendChild(params.techId, params.childId);
  }

  @Delete('/children/:childId')
  @ApiOperation({ summary: 'Remove a child from a technology' })
  removeChild(@Param() params: TechChildParams) {
    return this.techRelationsService.removeChild(params.techId, params.childId);
  }

  @Post('/parents/:parentId')
  @ApiOperation({ summary: 'Append a parent to a technology' })
  appendParent(@Param() params: TechParentParams) {
    return this.techRelationsService.appendParent(params.techId, params.parentId);
  }

  @Delete('/parents/:parentId')
  @ApiOperation({ summary: 'Remove a parent from a technology' })
  removeParent(@Param() params: TechParentParams) {
    return this.techRelationsService.removeParent(params.techId, params.parentId);
  }
}
