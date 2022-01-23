import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IssueService } from 'src/modules/issue/issue.service'
import { UserService } from 'src/modules/user/user.service'
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

  findAll(): Promise<Comment[]> {
    return this.commentsRepository.find()
  }

  findOne(id: string): Promise<Comment> {
    return this.commentsRepository.findOne(id, {
      relations: ['issue', 'author'],
    })
  }

  async remove(id: string): Promise<void> {
    await this.commentsRepository.delete(id)
  }

  async save(
    comment: string,
    issueId: string,
    authorId: string,
  ): Promise<Comment> {
    const issue = await this.issueService.findOne(issueId)

    if (!issue) {
      throw new Error('Issue not found')
    }

    const author = await this.userService.findOne(authorId)

    if (!author) {
      throw new Error('User not found')
    }

    return this.commentsRepository.save({
      comment,
      issue,
      author,
    })
  }
}
