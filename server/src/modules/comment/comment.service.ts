import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CommentDto } from 'src/dtos/comment/comment.dto'
import { IssueService } from 'src/modules/issue/issue.service'
import { UserService } from 'src/modules/user/user.service'
import { convertComment, convertCommentAsync } from 'src/util/dto-converter'
import { Repository } from 'typeorm'
import { Comment } from './comment.entity'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private userService: UserService,
    private issueService: IssueService,
  ) {}

  async findAll(): Promise<CommentDto[]> {
    const comments = await this.commentsRepository.find()

    return comments.map(convertComment)
  }

  async findOne(id: number): Promise<CommentDto> {
    return convertCommentAsync(
      this.commentsRepository.findOne(id, {
        relations: ['issue', 'author'],
      }),
    )
  }

  async remove(id: number): Promise<void> {
    await this.commentsRepository.delete(id)
  }

  async save(
    comment: string,
    issueId: number,
    authorId: string,
  ): Promise<CommentDto> {
    const issue = await this.issueService.findOne(issueId)

    if (!issue) {
      throw new Error('Issue not found')
    }

    const author = await this.userService.findOne(authorId)

    if (!author) {
      throw new Error('User not found')
    }

    return convertCommentAsync(
      this.commentsRepository.save({
        comment,
        issue,
        author,
      }),
    )
  }
}
