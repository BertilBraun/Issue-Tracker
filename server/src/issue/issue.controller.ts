import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { Issue } from './issue.entity'
import { IssueService } from './issue.service'

@Controller('issue')
export class IssueController {
  constructor(private readonly userService: IssueService) {}

  @Get()
  findAll(): Promise<Issue[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Issue> {
    return this.userService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id)
  }

  @Post()
  save(@Body() user: Issue): Promise<Issue> {
    return this.userService.save(user)
  }
}
