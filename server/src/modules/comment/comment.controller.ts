import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { JwtAuth } from 'src/decorators/jwt-auth'
import { CommentCreateDto } from 'src/dtos'
import { Comment } from './comment.entity'
import { CommentService } from './comment.service'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  @JwtAuth()
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(id)
  }

  @Delete(':id')
  @JwtAuth()
  remove(@Param('id') id: string): Promise<void> {
    return this.commentService.remove(id)
  }

  @Post()
  @JwtAuth()
  save(@Body() comment: CommentCreateDto): Promise<Comment> {
    return this.commentService.save(
      comment.comment,
      comment.issueId,
      comment.authorId,
    )
  }
}
