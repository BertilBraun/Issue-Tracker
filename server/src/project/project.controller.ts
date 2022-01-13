import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { Project } from './project.entity'
import { ProjectService } from './project.service'

@Controller('project')
export class ProjectController {
  constructor(private readonly userService: ProjectService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Project> {
    return this.userService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id)
  }

  @Post()
  save(@Body() user: Project): Promise<Project> {
    return this.userService.save(user)
  }
}
