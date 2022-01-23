import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectModule } from '../project/project.module'
import { UserModule } from '../user/user.module'
import { IssueController } from './issue.controller'
import { Issue } from './issue.entity'
import { IssueService } from './issue.service'

@Module({
  imports: [TypeOrmModule.forFeature([Issue]), ProjectModule, UserModule],
  providers: [IssueService],
  controllers: [IssueController],
  exports: [IssueService],
})
export class IssueModule {}
