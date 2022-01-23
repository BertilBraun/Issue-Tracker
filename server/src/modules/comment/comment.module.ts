import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IssueModule } from '../issue/issue.module'
import { UserModule } from '../user/user.module'
import { CommentController } from './comment.controller'
import { Comment } from './comment.entity'
import { CommentService } from './comment.service'

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule, IssueModule],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
