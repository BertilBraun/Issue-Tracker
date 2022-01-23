import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IssueService } from 'src/modules/issue/issue.service'
import { UserService } from 'src/modules/user/user.service'
import { CommentController } from './comment.controller'
import { Comment } from './comment.entity'
import { CommentService } from './comment.service'

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserService, IssueService],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
