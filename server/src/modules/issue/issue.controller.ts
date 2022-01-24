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
import { IssueCreateDto, IssueUpdateDto } from 'src/dtos'
import { IssueDto } from 'src/dtos/issue/issue.dto'
import { IssueService } from './issue.service'

@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Get(':id')
  @JwtAuth()
  findOne(@Param('id') id: number): Promise<IssueDto> {
    return this.issueService.findOne(id)
  }

  @Delete(':id')
  @JwtAuth()
  remove(@Param('id') id: number): Promise<void> {
    return this.issueService.remove(id)
  }

  @Post()
  @JwtAuth()
  save(@Body() issue: IssueCreateDto): Promise<IssueDto> {
    return this.issueService.save(
      issue.title,
      issue.authorId,
      issue.description,
      issue.status,
      issue.priority,
      issue.projectId,
    )
  }

  @Patch(':id')
  @JwtAuth()
  update(
    @Param('id') id: number,
    @Body() issue: IssueUpdateDto,
  ): Promise<IssueDto> {
    return this.issueService.update(
      id,
      issue.title,
      issue.description,
      issue.status,
      issue.priority,
    )
  }
}
