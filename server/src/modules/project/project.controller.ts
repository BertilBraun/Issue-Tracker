import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { JwtAuth } from 'src/decorators/jwt-auth'
import { AddMemberDto, ProjectCreateDto, ProjectUpdateDto } from 'src/dtos'
import { Project } from './project.entity'
import { ProjectService } from './project.service'

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @JwtAuth()
  findAll(): Promise<Project[]> {
    return this.projectService.findAll()
  }

  @Get(':id')
  @JwtAuth()
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectService.findOne(id)
  }

  @Delete(':id')
  @JwtAuth()
  remove(@Param('id') id: string): Promise<void> {
    return this.projectService.remove(id)
  }

  @Post()
  @JwtAuth()
  save(@Body() project: ProjectCreateDto): Promise<Project> {
    return this.projectService.save(
      project.name,
      project.ownerId,
      project.description,
    )
  }

  @Post(':id')
  @JwtAuth()
  update(
    @Param('id') id: string,
    @Body() project: ProjectUpdateDto,
  ): Promise<Project> {
    return this.projectService.update(id, project.name, project.description)
  }

  @Post(':id/add')
  @JwtAuth()
  addMember(
    @Param('id') id: string,
    @Body() member: AddMemberDto,
  ): Promise<Project> {
    return this.projectService.addMember(id, member.userId)
  }
}
