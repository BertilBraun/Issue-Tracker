import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectService } from 'src/project/project.service'
import { IssueController } from './issue.controller'
import { Issue } from './issue.entity'
import { IssueService } from './issue.service'

@Module({
  imports: [TypeOrmModule.forFeature([Issue]), ProjectService],
  providers: [IssueService],
  controllers: [IssueController],
  exports: [IssueService],
})
export class IssueModule {}
