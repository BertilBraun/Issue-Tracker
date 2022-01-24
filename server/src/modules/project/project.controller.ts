import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { JwtAuth } from 'src/decorators/jwt-auth'
import { AddMemberDto, ProjectCreateDto, ProjectUpdateDto } from 'src/dtos'
import { ProjectDto } from 'src/dtos/project/project.dto'
import { ProjectService } from './project.service'

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @JwtAuth()
  findAll(): Promise<ProjectDto[]> {
    return this.projectService.findAll()
  }

  @Get(':id')
  @JwtAuth()
  findOne(@Param('id') id: number): Promise<ProjectDto> {
    return this.projectService.findOne(id)
  }

  @Delete(':id')
  @JwtAuth()
  remove(@Param('id') id: number): Promise<void> {
    return this.projectService.remove(id)
  }

  @Post()
  @JwtAuth()
  save(@Body() project: ProjectCreateDto): Promise<ProjectDto> {
    return this.projectService.save(
      project.name,
      project.ownerId,
      project.description,
    )
  }

  @Patch(':id')
  @JwtAuth()
  update(
    @Param('id') id: number,
    @Body() project: ProjectUpdateDto,
  ): Promise<ProjectDto> {
    return this.projectService.update(id, project.name, project.description)
  }

  @Post(':id/add')
  @JwtAuth()
  addMember(
    @Param('id') id: number,
    @Body() member: AddMemberDto,
  ): Promise<ProjectDto> {
    return this.projectService.addMember(id, member.userId)
  }
}
