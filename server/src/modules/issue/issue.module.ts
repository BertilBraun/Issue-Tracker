import { forwardRef, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectModule } from '../project/project.module'
import { UserModule } from '../user/user.module'
import { IssueController } from './issue.controller'
import { Issue } from './issue.entity'
import { IssueService } from './issue.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Issue]),
    forwardRef(() => ProjectModule),
    forwardRef(() => UserModule),
    PassportModule,
  ],
  providers: [IssueService],
  controllers: [IssueController],
  exports: [IssueService],
})
export class IssueModule {}
