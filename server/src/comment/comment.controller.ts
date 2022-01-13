import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { Comment } from './comment.entity'
import { CommentService } from './comment.service'

@Controller('comment')
export class CommentController {
  constructor(private readonly userService: CommentService) {}

  @Get()
  findAll(): Promise<Comment[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.userService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id)
  }

  @Post()
  save(@Body() user: Comment): Promise<Comment> {
    return this.userService.save(user)
  }
}
