import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { JwtAuth } from 'src/decorators/jwt-auth'
import { IssueCreateDto, IssueUpdateDto } from 'src/dtos'
import { Issue } from './issue.entity'
import { IssueService } from './issue.service'

@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Get(':id')
  @JwtAuth()
  findOne(@Param('id') id: string): Promise<Issue> {
    return this.issueService.findOne(id)
  }

  @Delete(':id')
  @JwtAuth()
  remove(@Param('id') id: string): Promise<void> {
    return this.issueService.remove(id)
  }

  @Post()
  @JwtAuth()
  save(@Body() issue: IssueCreateDto): Promise<Issue> {
    return this.issueService.save(
      issue.title,
      issue.authorId,
      issue.description,
      issue.status,
      issue.priority,
      issue.projectId,
    )
  }

  @Post(':id')
  @JwtAuth()
  update(
    @Param('id') id: string,
    @Body() issue: IssueUpdateDto,
  ): Promise<Issue> {
    return this.issueService.update(
      id,
      issue.title,
      issue.description,
      issue.status,
      issue.priority,
    )
  }
}
