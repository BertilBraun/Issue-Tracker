import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IssueController } from './issue.controller'
import { Issue } from './issue.entity'
import { IssueService } from './issue.service'

@Module({
  imports: [TypeOrmModule.forFeature([Issue])],
  providers: [IssueService],
  controllers: [IssueController],
})
export class IssueModule {}
